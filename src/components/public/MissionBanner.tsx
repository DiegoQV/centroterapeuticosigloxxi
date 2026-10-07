"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  User,
  Phone,
  ChevronDown,
  Loader2,
  AlertCircle,
  Send,
} from "lucide-react";
import { clinicData } from "@/data/clinicData";
import { solicitarCitaAction } from "@/features/citas/actions";
import ScrollReveal from "./ScrollReveal";

export default function MissionBanner() {
  const { locationContact } = clinicData;
  const { sede, form } = locationContact;

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    zona: "Dolor lumbar y ciática",
    turno: "Mañana (8:00 - 13:00)",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.nombre.trim() || !formData.telefono.trim()) {
      setErrorMessage("Por favor completa tu nombre y número de teléfono.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await solicitarCitaAction({
        nombre: formData.nombre.trim(),
        telefono: formData.telefono.trim(),
        afeccion: formData.zona,
        sede: sede.address,
        turno: formData.turno,
        origen: "landing_sede",
      });

      if (result.success) {
        setWhatsappUrl(result.whatsappUrl || "https://wa.me/51941996388");
        setIsSubmitted(true);
      } else {
        setErrorMessage(result.error || "Ocurrió un error al registrar tu solicitud.");
      }
    } catch {
      setErrorMessage("Error de conexión. Puedes contactarnos directamente vía WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#F6F9F8] relative overflow-hidden">
      {/* Halo ambiental suave continuo */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-b from-emerald-100/35 via-teal-50/15 to-transparent blur-3xl pointer-events-none -z-0"
      />

      {/* 1. Encabezado Editorial con Animación */}
      <ScrollReveal direction="up" duration={700}>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 mb-10 lg:mb-12">
          <span className="text-xs font-bold text-emerald-900 tracking-[0.2em] uppercase mb-2 block font-sans">
            • {locationContact.tag} •
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight leading-[1.12]">
            {locationContact.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-700 font-normal font-sans mt-2.5 leading-relaxed max-w-3xl mx-auto">
            {locationContact.subtitle}
          </p>
        </div>
      </ScrollReveal>

      {/* 2. Composición Principal en Dos Columnas */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-start">
          {/* Columna Izquierda: Mapa y Datos de Sede con Animación Left */}
          <ScrollReveal direction="left" duration={750} className="order-1 lg:order-1 lg:col-span-6 w-full flex flex-col justify-start">
            <div className="relative w-full h-[380px] sm:h-[420px] lg:h-[460px] rounded-2xl sm:rounded-[24px] overflow-hidden border border-emerald-950/10 shadow-md bg-slate-100">
              <iframe
                src={sede.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Ubicación Centro Terapéutico Siglo XXI"
                className="w-full h-full map-monochrome-emerald"
              />
            </div>

            {/* Información esencial debajo del mapa */}
            <div className="mt-5 space-y-3 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div>
                  <h4 className="font-serif font-bold text-xl text-[#111111]">
                    {sede.name}
                  </h4>
                  <p className="text-sm text-gray-700 mt-0.5">
                    {sede.shortAddress}
                  </p>
                </div>
                <a
                  href={sede.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B3B32] hover:text-emerald-700 transition-colors"
                >
                  <span>Cómo llegar</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          </ScrollReveal>

          {/* Columna Derecha: Formulario con Conexión a Base de Datos */}
          <ScrollReveal direction="right" duration={750} delay={150} className="order-2 lg:order-2 lg:col-span-6 w-full flex flex-col justify-start lg:pl-4 xl:pl-6 mt-8 lg:mt-0">
            <div className="w-full max-w-xl mx-auto lg:mx-0 bg-white p-7 sm:p-9 rounded-3xl border border-emerald-950/10 shadow-lg shadow-emerald-950/5">
              {/* Cabecera del Formulario */}
              <div className="mb-7">
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#111111] tracking-tight leading-snug">
                  {form.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-normal mt-1.5 font-sans leading-relaxed">
                  {form.subtitle}
                </p>
              </div>

              {errorMessage && (
                <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-700 font-medium font-sans">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {isSubmitted ? (
                <div className="py-8 text-center flex flex-col items-center justify-center space-y-4 font-sans">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#111111]">
                    ¡Solicitud Recibida!
                  </h4>
                  <p className="text-sm text-gray-700 max-w-sm font-sans leading-relaxed">
                    Hemos registrado tu solicitud de evaluación en nuestra base de datos. Para coordinar el horario exacto ahora mismo:
                  </p>

                  <div className="w-full pt-2 flex flex-col gap-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-bold py-3.5 px-6 rounded-full shadow-md transition-all cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Confirmar de inmediato por WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline py-2 cursor-pointer font-sans"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                  {/* 1. Nombre Completo */}
                  <div className="relative group">
                    <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5 font-sans">
                      Nombre completo *
                    </label>
                    <div className="relative flex items-center">
                      <User className="w-4 h-4 text-emerald-800/60 group-focus-within:text-[#0B3B32] absolute left-0 transition-colors" />
                      <input
                        type="text"
                        required
                        disabled={isSubmitting}
                        placeholder="Ej. María Sánchez"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-gray-300 hover:border-gray-400 focus:border-[#0B3B32] text-sm sm:text-base text-[#111111] placeholder:text-gray-400 pl-7 pr-2 py-2.5 focus:outline-none transition-colors duration-200 font-sans disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* 2. Teléfono Celular / WhatsApp */}
                  <div className="relative group">
                    <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5 font-sans">
                      Teléfono celular / WhatsApp *
                    </label>
                    <div className="relative flex items-center">
                      <Phone className="w-4 h-4 text-emerald-800/60 group-focus-within:text-[#0B3B32] absolute left-0 transition-colors" />
                      <input
                        type="tel"
                        required
                        disabled={isSubmitting}
                        placeholder="Ej. 941 996 388"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full bg-transparent border-b-2 border-gray-300 hover:border-gray-400 focus:border-[#0B3B32] text-sm sm:text-base text-[#111111] placeholder:text-gray-400 pl-7 pr-2 py-2.5 focus:outline-none transition-colors duration-200 font-sans disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* 3. Zona de Molestia y Turno */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5 font-sans">
                        Zona o Afección
                      </label>
                      <div className="relative group">
                        <select
                          value={formData.zona}
                          disabled={isSubmitting}
                          onChange={(e) => setFormData({ ...formData, zona: e.target.value })}
                          className="w-full bg-transparent border-b-2 border-gray-300 hover:border-gray-400 focus:border-[#0B3B32] text-xs sm:text-sm text-[#111111] py-2.5 pr-6 focus:outline-none transition-colors duration-200 font-sans cursor-pointer appearance-none disabled:opacity-50"
                        >
                          <option value="Dolor lumbar y ciática">Dolor lumbar y ciática</option>
                          <option value="Cuello, hombros y cervicalgias">Cuello, hombros y cervicalgias</option>
                          <option value="Esguinces y articulaciones">Esguinces y articulaciones</option>
                          <option value="Lesiones deportivas">Lesiones deportivas</option>
                          <option value="Contracturas y tensión miofascial">Contracturas y tensión</option>
                          <option value="Rigidez articular y artrosis">Rigidez articular y artrosis</option>
                          <option value="Consulta y Evaluación General">Consulta General</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-emerald-800/70">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-1.5 font-sans">
                        Turno preferido
                      </label>
                      <div className="relative group">
                        <select
                          value={formData.turno}
                          disabled={isSubmitting}
                          onChange={(e) => setFormData({ ...formData, turno: e.target.value })}
                          className="w-full bg-transparent border-b-2 border-gray-300 hover:border-gray-400 focus:border-[#0B3B32] text-xs sm:text-sm text-[#111111] py-2.5 pr-6 focus:outline-none transition-colors duration-200 font-sans cursor-pointer appearance-none disabled:opacity-50"
                        >
                          <option value="Mañana (8:00 - 13:00)">Mañana (8:00 - 13:00)</option>
                          <option value="Tarde (15:00 - 20:00)">Tarde (15:00 - 20:00)</option>
                          <option value="Sábado (8:30 - 13:30)">Sábado (8:30 - 13:30)</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-emerald-800/70">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. Botón de Envío */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#0B3B32] hover:bg-[#072B24] text-white text-sm font-bold py-4 px-8 rounded-full shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-200 cursor-pointer font-sans disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Registrando...</span>
                        </>
                      ) : (
                        <span>{form.cta}</span>
                      )}
                    </button>
                  </div>

                  {/* 5. Nota de Confianza */}
                  <p className="pt-2 text-sm text-gray-700 font-medium font-sans text-center leading-relaxed">
                    {form.note}
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
