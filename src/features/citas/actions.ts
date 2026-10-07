"use server";

import { createClient } from "@/lib/supabase/server";
import { SolicitudCitaSchema } from "./validation";
import type { SolicitudCitaInput, SolicitudCitaResult } from "./types";

export async function generateWhatsAppUrl(params: {
  nombre: string;
  telefono: string;
  afeccion: string;
  sede?: string;
  turno?: string;
  mensaje?: string;
}): Promise<string> {
  const text = encodeURIComponent(
    `¡Hola Centro Terapéutico Siglo XXI! Deseo coordinar una Cita de Evaluación:\n\n` +
      `👤 Nombre: ${params.nombre}\n` +
      `📱 Teléfono: ${params.telefono}\n` +
      `🩺 Motivo / Servicio: ${params.afeccion}\n` +
      `🏥 Sede: ${params.sede || "Sede Chachapoyas (Jr. Sociego 357, Chachapoyas 01001)"}\n` +
      `⏰ Turno preferido: ${params.turno || "Mañana"}` +
      (params.mensaje ? `\n📝 Detalle adicional: ${params.mensaje}` : "")
  );
  return `https://wa.me/51941996388?text=${text}`;
}

export async function solicitarCitaAction(
  rawInput: SolicitudCitaInput | FormData
): Promise<SolicitudCitaResult> {
  let dataToValidate: unknown;

  if (rawInput instanceof FormData) {
    dataToValidate = {
      nombre: rawInput.get("nombre"),
      telefono: rawInput.get("telefono"),
      afeccion: rawInput.get("afeccion"),
      sede: rawInput.get("sede") || undefined,
      turno: rawInput.get("turno") || undefined,
      mensaje: rawInput.get("mensaje") || undefined,
      origen: rawInput.get("origen") || "modal",
    };
  } else {
    dataToValidate = rawInput;
  }

  const validation = SolicitudCitaSchema.safeParse(dataToValidate);

  if (!validation.success) {
    const firstIssue = validation.error.issues[0]?.message ?? "Datos incompletos o no válidos";
    return {
      success: false,
      error: firstIssue,
    };
  }

  const validatedData = validation.data;
  const whatsappUrl = await generateWhatsAppUrl(validatedData);

  let insertedId: string | undefined;

  try {
    const supabase = await createClient();
    const clinicaId =
      process.env.CLINICA_ID_DEFAULT || "00000000-0000-0000-0000-000000000001";

    const { data, error } = await supabase
      .from("solicitudes_citas")
      .insert({
        clinica_id: clinicaId,
        nombre: validatedData.nombre,
        telefono: validatedData.telefono,
        afeccion: validatedData.afeccion,
        sede: validatedData.sede,
        turno: validatedData.turno,
        mensaje: validatedData.mensaje || null,
        origen: validatedData.origen,
        estado: "pendiente",
      })
      .select("id")
      .maybeSingle();

    if (error) {
      console.warn("Aviso al registrar solicitud_cita en Supabase (modo seguro fallback):", error.message);
    } else if (data) {
      insertedId = data.id;
    }
  } catch (err) {
    console.warn("Advertencia de conexión Supabase en solicitarCitaAction:", err);
  }

  return {
    success: true,
    id: insertedId || `lead_${Date.now()}`,
    whatsappUrl,
    message: "Solicitud registrada con éxito. Nuestro equipo se comunicará contigo de inmediato.",
  };
}
