"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Send,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

export default function LocationSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    condition: "ciatica",
    schedule: "manana",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="agendar" className="w-full py-20 lg:py-28 bg-[#F0F4F1] border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Encabezado Editorial Centrado */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200/90 text-xs font-inter font-medium tracking-tight text-zinc-800 mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#38C666]" />
            <span>Sede en Chachapoyas</span>
          </div>
          <h2 className="font-outfit font-semibold text-[34px] sm:text-[44px] lg:text-[50px] text-[#18181b] tracking-[-0.03em] leading-[1.08] mb-3.5 text-balance">
            Visítanos o agenda tu evaluación.
          </h2>
          <p className="font-inter text-base sm:text-[17px] text-[#18181b]/75 max-w-4xl mx-auto leading-relaxed">
            Atención programada con el tiempo y rigor clínico que mereces, sin esperas ni prisas.
          </p>
        </div>

        {/* 2 Tarjetas Hermanas Simétricas y Niveladas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Tarjeta Izquierda: Sede Física & Mapa Oficial */}
          <div id="ubicacion" className="bg-white p-7 sm:p-9 lg:p-10 rounded-3xl border border-zinc-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="mb-5">
                <h3 className="font-outfit font-semibold text-2xl sm:text-[25px] text-[#18181b] tracking-tight">
                  Nuestra Sede Física
                </h3>
                <p className="font-inter text-xs sm:text-sm text-[#18181b]/70 mt-1">
                  Espacio clínico acondicionado para tu comodidad, privacidad y recuperación.
                </p>
              </div>

              {/* Mapa Oficial Interactivo */}
              <div className="relative rounded-2xl overflow-hidden border border-zinc-200/80 shadow-2xs bg-zinc-100 h-[240px] sm:h-[260px] mb-6 group">
                <iframe
                  title="Ubicación de Centro Terapéutico Siglo XXI en Google Maps"
                  src="https://www.google.com/maps?q=-6.233919,-77.866113&hl=es&z=17&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href="https://maps.app.goo.gl/S6tB7DkgvXPMsm269"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/95 backdrop-blur-xs hover:bg-white text-[#18181b] border border-zinc-200/90 rounded-xl text-xs font-outfit font-semibold shadow-xs transition-all hover:scale-105 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#38C666]" />
                  <span>Cómo llegar en Google Maps ↗</span>
                </a>
              </div>

              {/* Información de Ubicación, Teléfono y Horario Estructurada en Cápsulas */}
              <div className="space-y-3 pt-1">
                {/* Cápsula de Dirección a Ancho Completo */}
                <div className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl bg-[#F0F4F1]/60 border border-zinc-200/70">
                  <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center text-[#0D2818] shadow-2xs shrink-0">
                    <MapPin className="w-4 h-4 text-[#38C666]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-outfit font-bold text-[10.5px] text-zinc-500 uppercase tracking-wider">
                      Dirección de la Sede
                    </p>
                    <p className="font-inter text-xs sm:text-[13.5px] text-[#18181b] font-medium truncate mt-0.5">
                      Jr. Sociego s/n, Barrio La Laguna · Chachapoyas
                    </p>
                  </div>
                </div>

                {/* Fila Dividida: WhatsApp Táctil y Horarios Tabulados */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Micro-tarjeta WhatsApp / Citas */}
                  <a
                    href="https://wa.me/51941996388?text=Hola%20Centro%20Terap%C3%A9utico%20Siglo%20XXI%2C%20deseo%20informaci%C3%B3n%20para%20una%20cita%20de%20evaluaci%C3%B3n."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-2xl bg-[#EAF5EE] hover:bg-[#d8efe0] border border-[#38C666]/30 transition-all group cursor-pointer shadow-2xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#38C666] flex items-center justify-center text-white shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-outfit font-bold text-[10.5px] text-[#0D2818] uppercase tracking-wider">
                        WhatsApp / Citas
                      </p>
                      <p className="font-inter text-xs sm:text-sm font-semibold text-[#18181b] group-hover:text-[#0D2818] transition-colors mt-0.5">
                        (+51) 941 996 388
                      </p>
                    </div>
                  </a>

                  {/* Micro-tarjeta Horarios Tabulados */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F0F4F1]/60 border border-zinc-200/70">
                    <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center text-zinc-700 shadow-2xs shrink-0">
                      <Clock className="w-4 h-4 text-zinc-600" />
                    </div>
                    <div className="min-w-0 text-xs">
                      <p className="font-outfit font-bold text-[10.5px] text-zinc-500 uppercase tracking-wider">
                        Horarios de Atención
                      </p>
                      <p className="font-inter font-medium text-[#18181b] text-xs leading-tight mt-0.5">
                        L-V: 8-13h y 15-20h
                      </p>
                      <p className="font-inter text-[11px] text-zinc-500 leading-tight">
                        Sábados: 8:30 - 13:30
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta Derecha: Formulario de Cita de Evaluación */}
          <div className="bg-white p-7 sm:p-9 lg:p-10 rounded-3xl border border-zinc-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="mb-5">
                <h3 className="font-outfit font-semibold text-2xl sm:text-[25px] text-[#18181b] tracking-tight">
                  Solicitar Cita de Evaluación
                </h3>
                <p className="font-inter text-xs sm:text-sm text-[#18181b]/70 mt-1">
                  Déjanos tus datos y coordinaremos el turno que mejor te acomode.
                </p>
              </div>

              {submitted ? (
                <div className="bg-[#EAF5EE] border border-[#38C666]/40 rounded-2xl p-7 text-center animate-in fade-in duration-200 my-auto">
                  <CheckCircle2 className="w-9 h-9 text-[#38C666] mx-auto mb-2.5" />
                  <h4 className="font-outfit font-semibold text-lg text-[#0D2818] mb-1">
                    ¡Solicitud Recibida!
                  </h4>
                  <p className="font-inter text-xs sm:text-sm text-[#18181b]/75 mb-5 max-w-sm mx-auto">
                    Te contactaremos de inmediato al número indicado para confirmar la hora.
                  </p>
                  <a
                    href="https://wa.me/51941996388?text=Hola%20Centro%20Terap%C3%A9utico%20Siglo%20XXI%2C%20acabo%20de%20enviar%20el%20formulario%20web."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#18181b] text-white text-xs sm:text-sm font-medium px-6 py-3 rounded-full shadow-xs hover:bg-black transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#38C666]" />
                    <span>Confirmar de inmediato por WhatsApp</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block font-outfit font-semibold text-xs sm:text-[13px] text-[#18181b] mb-1.5">
                      Nombre completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. María Sánchez"
                      className="w-full bg-[#F0F4F1]/60 border border-zinc-200 rounded-xl px-4 py-3 font-inter text-sm text-[#18181b] focus:bg-white focus:outline-hidden focus:border-[#18181b] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-outfit font-semibold text-xs sm:text-[13px] text-[#18181b] mb-1.5">
                      Teléfono celular / WhatsApp
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ej. 941 996 388"
                      className="w-full bg-[#F0F4F1]/60 border border-zinc-200 rounded-xl px-4 py-3 font-inter text-sm text-[#18181b] focus:bg-white focus:outline-hidden focus:border-[#18181b] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="condition" className="block font-outfit font-semibold text-xs sm:text-[13px] text-[#18181b] mb-1.5">
                        Zona de molestia
                      </label>
                      <select
                        id="condition"
                        value={formData.condition}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                        className="w-full bg-[#F0F4F1]/60 border border-zinc-200 rounded-xl px-3.5 py-3 font-inter text-sm text-[#18181b] focus:bg-white focus:outline-hidden focus:border-[#18181b] transition-all cursor-pointer"
                      >
                        <option value="ciatica">Dolor Lumbar / Ciática</option>
                        <option value="cuello">Cuello / Hombros</option>
                        <option value="esguince">Esguince / Articulaciones</option>
                        <option value="deportiva">Lesión Deportiva</option>
                        <option value="contractura">Contracturas Musculares</option>
                        <option value="otra">Otra molestia</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="schedule" className="block font-outfit font-semibold text-xs sm:text-[13px] text-[#18181b] mb-1.5">
                        Turno preferido
                      </label>
                      <select
                        id="schedule"
                        value={formData.schedule}
                        onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                        className="w-full bg-[#F0F4F1]/60 border border-zinc-200 rounded-xl px-3.5 py-3 font-inter text-sm text-[#18181b] focus:bg-white focus:outline-hidden focus:border-[#18181b] transition-all cursor-pointer"
                      >
                        <option value="manana">Mañana (8:00 - 13:00)</option>
                        <option value="tarde">Tarde (15:00 - 20:00)</option>
                        <option value="sabado">Sábado (8:30 - 13:30)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#18181b] hover:bg-black text-white font-inter text-[15px] font-medium py-3.5 px-6 rounded-full transition-all hover:scale-[1.01] shadow-xs cursor-pointer"
                    >
                      <span>Solicitar cita de evaluación</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Nota de Reaseguro al Pie */}
            <div className="pt-4 border-t border-zinc-100 mt-6 text-center">
              <p className="font-inter text-[12px] text-zinc-500">
                Atención 100% personalizada · Respuesta y confirmación por WhatsApp en minutos
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
