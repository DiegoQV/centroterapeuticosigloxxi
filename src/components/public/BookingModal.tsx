"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { clinicData } from "@/data/clinicData";
import { solicitarCitaAction } from "@/features/citas/actions";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAfeccion?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialAfeccion,
}: BookingModalProps) {
  const serviceItems = clinicData.services?.items || [];
  const defaultOption =
    initialAfeccion ||
    (serviceItems.length > 0 ? serviceItems[0].therapyMatch : "Consulta y Evaluación General");

  const sedesList = [
    "Sede Chachapoyas (Jr. Sociego 357, Barrio La Laguna)",
  ];

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    afeccion: defaultOption,
    sede: sedesList[0],
    turno: "Mañana (8:00 AM - 1:00 PM)",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState<string>("");

  useEffect(() => {
    if (initialAfeccion) {
      setFormData((prev) => ({ ...prev, afeccion: initialAfeccion }));
    }
  }, [initialAfeccion]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.nombre.trim() || !formData.telefono.trim()) {
      setErrorMessage("Por favor ingresa tu nombre y número de teléfono.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await solicitarCitaAction({
        nombre: formData.nombre.trim(),
        telefono: formData.telefono.trim(),
        afeccion: formData.afeccion,
        sede: formData.sede,
        turno: formData.turno,
        origen: "modal",
      });

      if (result.success) {
        setWhatsappRedirectUrl(result.whatsappUrl || "https://wa.me/51941996388");
        setIsSuccess(true);
      } else {
        setErrorMessage(result.error || "Ocurrió un error al procesar tu solicitud.");
      }
    } catch {
      setErrorMessage("Error de conexión. Puedes contactarnos directamente por WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setErrorMessage(null);
    setFormData({
      nombre: "",
      telefono: "",
      afeccion: defaultOption,
      sede: sedesList[0],
      turno: "Mañana (8:00 AM - 1:00 PM)",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Botón Cerrar */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1 font-sans">
                <Calendar className="w-3.5 h-3.5" />
                <span>Agendamiento Directo</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] tracking-tight">
                Solicitar Cita de Evaluación
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1 font-sans">
                Atención personalizada en nuestra sede de Jr. Sociego 357, Chachapoyas.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700 font-medium font-sans">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div>
                <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1">
                  Nombre y Apellido *
                </label>
                <input
                  type="text"
                  required
                  disabled={isSubmitting}
                  placeholder="Tu nombre completo"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full text-sm bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-[#111111] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  disabled={isSubmitting}
                  placeholder="Ej: 941 996 388"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full text-sm bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-[#111111] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1">
                  Servicio / Afección a tratar
                </label>
                <select
                  value={formData.afeccion}
                  disabled={isSubmitting}
                  onChange={(e) => setFormData({ ...formData, afeccion: e.target.value })}
                  className="w-full text-sm bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-[#111111] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent cursor-pointer disabled:opacity-50"
                >
                  {serviceItems.map((item) => (
                    <option key={item.id} value={`${item.title} - ${item.therapyMatch}`}>
                      {item.title} ({item.therapyMatch})
                    </option>
                  ))}
                  <option value="Evaluación con Magnetoterapia Ecam Magnet">
                    Diagnóstico con Magnetoterapia Ecam Magnet
                  </option>
                  <option value="Evaluación con Electroterapia TENS 7000">
                    Alivio del dolor con TENS 7000
                  </option>
                  <option value="Terapia de Percusión Miofascial">
                    Terapia de Percusión Miofascial
                  </option>
                  <option value="Consulta y Evaluación Biomecánica General">
                    Consulta y Evaluación Biomecánica General
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1">
                    Sede
                  </label>
                  <select
                    value={formData.sede}
                    disabled={isSubmitting}
                    onChange={(e) => setFormData({ ...formData, sede: e.target.value })}
                    className="w-full text-xs bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-[#111111] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer disabled:opacity-50"
                  >
                    {sedesList.map((s, idx) => (
                      <option key={idx} value={s}>
                        {s.split(" (")[0]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1">
                    Turno preferido
                  </label>
                  <select
                    value={formData.turno}
                    disabled={isSubmitting}
                    onChange={(e) => setFormData({ ...formData, turno: e.target.value })}
                    className="w-full text-xs bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-[#111111] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer disabled:opacity-50"
                  >
                    <option value="Mañana (8:00 AM - 1:00 PM)">Mañana (8am - 1pm)</option>
                    <option value="Tarde (2:00 PM - 8:00 PM)">Tarde (2pm - 8pm)</option>
                    <option value="Sábado (8:30 AM - 1:30 PM)">Sábado (8:30am - 1:30pm)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#0B3B32] hover:bg-[#072B24] text-white font-bold py-3.5 px-6 rounded-full shadow-md text-sm transition-all cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registrando solicitud...</span>
                    </>
                  ) : (
                    <span>Confirmar Solicitud de Cita</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4 font-sans">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111]">
              ¡Solicitud Recibida con Éxito!
            </h3>
            <p className="text-sm text-gray-700 font-medium max-w-sm mx-auto font-sans leading-relaxed">
              Hemos registrado tu solicitud en nuestra base de datos clínica. Nos comunicaremos contigo al{" "}
              <strong className="text-[#111111]">{formData.telefono}</strong> para confirmar tu horario.
            </p>

            <div className="pt-3 flex flex-col gap-2.5 font-sans">
              <a
                href={whatsappRedirectUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-3.5 px-6 rounded-full text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Confirmar de inmediato por WhatsApp</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="text-xs text-gray-500 hover:text-gray-800 py-2 cursor-pointer transition-colors"
              >
                Cerrar ventana
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
