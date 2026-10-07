"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PhilosophySection() {
  const pillars = [
    {
      num: "01",
      title: "Diagnóstico Funcional Riguroso",
      desc: "Análisis postural y movilidad articular para identificar la causa real antes de iniciar cualquier pauta.",
    },
    {
      num: "02",
      title: "Tecnología Biomédica de Apoyo",
      desc: "Magnetoterapia computarizada y electroterapia dosificada para calmar la inflamación y el dolor.",
    },
    {
      num: "03",
      title: "Terapia Manual & Movilidad Activa",
      desc: "Intervención física y ejercicio guiado. Evitamos el reposo pasivo prolongado que debilita el músculo.",
    },
    {
      num: "04",
      title: "Acompañamiento en Psicología del Dolor",
      desc: "Soporte clínico especializado para superar el temor al movimiento (kinesiofobia) y prevenir recaídas.",
    },
  ];

  return (
    <section id="filosofia" className="w-full py-24 lg:py-32 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Lado Izquierdo: Gran Imagen Clínica Vertical (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-zinc-200/80 aspect-[3/4] min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] bg-zinc-100">
              <img
                src="/philosophy-manual.jpg"
                alt="Sesión individual de terapia manual y movilización articular en Centro Terapéutico Siglo XXI"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

              {/* Floating Reassurance Pill Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-zinc-200/80 shadow-md flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#EAF5EE] border border-[#38C666]/35 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#0D2818]" />
                </div>
                <div>
                  <span className="font-outfit font-semibold text-xs sm:text-sm text-[#0D2818] uppercase tracking-wider block">
                    Atención 1 a 1 en Camilla
                  </span>
                  <p className="font-inter text-xs sm:text-[13px] text-[#18181b]/80 leading-snug mt-0.5">
                    Tiempo y criterio clínico dedicados exclusivamente a ti sin prisas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Contenido Editorial sin Tarjetas Enjauladas (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0F4F1] border border-zinc-200/90 text-xs font-inter font-medium tracking-tight text-zinc-800 mb-5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#38C666]" />
              <span>Modelo Clínico & Filosofía</span>
            </div>

            {/* Titular H2 Monumental */}
            <h2 className="font-outfit font-semibold text-[34px] sm:text-[44px] lg:text-[50px] text-[#18181b] tracking-[-0.03em] leading-[1.08] mb-5 text-balance">
              No solo aliviamos el dolor: rehabilitamos tu función motriz.
            </h2>

            {/* Párrafo Manifiesto Conciso */}
            <p className="font-inter text-base sm:text-[17px] text-[#18181b]/75 leading-relaxed mb-9 max-w-xl">
              Abordamos el cuerpo de manera integral. La analgesia pasajera sin reeducación motora suele culminar en recaídas. Por ello, combinamos diagnóstico riguroso, terapia manual y movimiento activo guiado.
            </p>

            {/* 4 Pilares Editoriales sin Tarjetas */}
            <div className="w-full space-y-4 mb-9 divide-y divide-zinc-200/70">
              {pillars.map((pillar) => (
                <div key={pillar.num} className="pt-4 first:pt-0 flex items-start gap-4">
                  <span className="font-outfit font-bold text-xl sm:text-2xl text-[#38C666] shrink-0 mt-0.5">
                    {pillar.num}
                  </span>
                  <div>
                    <h3 className="font-outfit font-semibold text-[16px] sm:text-[17.5px] text-[#18181b] mb-1">
                      {pillar.title}
                    </h3>
                    <p className="font-inter text-xs sm:text-[13.5px] text-[#18181b]/70 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón de Acción Principal */}
            <a
              href="#metodologia"
              className="inline-flex items-center gap-2.5 bg-[#18181b] hover:bg-black text-white font-inter text-[15px] font-medium px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] shadow-xs"
            >
              <span>Conocer las 5 fases de nuestro método</span>
              <ArrowRight className="w-4 h-4" />
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}
