import { z } from "zod";

export const SolicitudCitaSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  telefono: z
    .string()
    .min(6, "Ingresa un número telefónico válido")
    .max(20, "El número telefónico no puede exceder 20 caracteres"),
  afeccion: z
    .string()
    .min(2, "Selecciona o especifica la molestia o afección a tratar")
    .max(200, "La descripción es demasiado extensa"),
  sede: z.string().default("Sede Chachapoyas (Jr. Sociego 357, Chachapoyas 01001)"),
  turno: z.string().default("Mañana (8:00 AM - 1:00 PM)"),
  mensaje: z.string().max(500, "El mensaje no puede exceder 500 caracteres").optional(),
  origen: z.enum(["modal", "landing_sede", "web"]).default("modal"),
});

export type SolicitudCitaSchemaType = z.infer<typeof SolicitudCitaSchema>;
