"use client";

import { ArrowUpRight, ShieldCheck, UserCheck, CalendarCheck, MessageCircle } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="cta-final" className="w-full py-20 lg:py-28 bg-[#0B2418] text-white relative overflow-hidden border-b border-white/10">
      {/* Resplandor Botánico Ambiental Sutil */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1E6B4C]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-[#2DC27E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Columna Izquierda (7 cols): Mensaje de Autoridad y Acción Decisiva */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#2DC27E] mb-3 block">
              Atención Presencial en Chachapoyas
            </span>

            {/* Título de Alto Impacto con Acento Tipográfico Editorial */}
            <h2 className="text-[34px] sm:text-[44px] lg:text-[50px] font-sans font-semibold tracking-[-0.03em] leading-[1.06] mb-5 text-balance text-white">
              ¿Listo para iniciar tu recuperación con un{" "}
              <span className="font-serif italic font-normal text-[#2DC27E]">
                equipo comprometido
              </span>
              ?
            </h2>

            {/* Subtítulo Conciso y Directo */}
            <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed mb-8 max-w-xl font-normal">
              Una evaluación funcional a tiempo previene la cronificación del dolor. Diseñamos tu plan terapéutico 1 a 1 en camilla, con tecnología biomédica de soporte y acompañamiento clínico cercano hasta tu alta.
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <a
                href="#agendar"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#EBF2ED] text-[#0B2418] font-sans text-sm sm:text-[14.5px] font-semibold px-7 py-3.5 rounded-full transition-all hover:scale-101 shadow-lg text-center cursor-pointer"
              >
                <span>Solicitar cita de evaluación</span>
                <ArrowUpRight className="w-4 h-4 text-[#0B2418]" />
              </a>

              <a
                href="https://wa.me/51941996388?text=Hola%20Centro%20Terap%C3%A9utico%20Siglo%20XXI%2C%20deseo%20informaci%C3%B3n%20para%20una%20cita%20de%20evaluaci%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-sans text-sm font-medium px-6 py-3.5 rounded-full transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#2DC27E]" />
                <span>WhatsApp directo: 941 996 388</span>
              </a>
            </div>

            {/* Reaseguros Clínicos en Línea Fina */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-sans text-white/70">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#2DC27E] shrink-0" />
                <span>Atención 1 a 1 en camilla</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2DC27E] shrink-0" />
                <span>Staff Colegiado CTMP & CDR</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-[#2DC27E] shrink-0" />
                <span>Turnos programados sin esperas</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha (5 cols): Fotografía Clínica en Marco Editorial */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[24px] overflow-hidden border border-white/15 shadow-2xl bg-black/40 group">
              <img
                src="/hero-slides/slide-3.jpg"
                alt="Sesión de rehabilitación motriz y fisioterapia activa en camilla"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2418]/90 via-[#0B2418]/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white text-xs font-sans">
                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-full border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2DC27E]" />
                  <span>Jr. Sociego · Barrio La Laguna</span>
                </div>
                <span className="text-[#2DC27E] font-semibold">
                  Sede Presencial
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
