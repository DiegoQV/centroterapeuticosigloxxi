"use client";

import { ShieldCheck, Ruler, Stethoscope, BookOpen, HeartPulse, CheckCircle2 } from "lucide-react";

export default function TestimonialsSection() {
  const criteria = [
    {
      num: "01",
      icon: Ruler,
      title: "Medición Objetiva del Progreso",
      subtitle: "Goniometría y control motor medible",
      description:
        "Evaluación inicial y final mediante goniometría articular y dinamometría funcional. El alta no se basa en impresiones vagas, sino en la recuperación comprobada de los grados de movilidad articular y fuerza funcional.",
      metric: "Arcos articulares completos y simetría bilateral",
    },
    {
      num: "02",
      icon: Stethoscope,
      title: "Transparencia y Cero Sobretratamiento",
      subtitle: "Derivación oportuna sin dilaciones",
      description:
        "Si tu cuadro clínico presenta signos de alarma o requiere interconsulta con traumatología, diagnóstico por imágenes (resonancia) o intervención quirúrgica, te lo comunicamos de inmediato. No retenemos pacientes con sesiones innecesarias.",
      metric: "Rigor deontológico y derivación médica ética",
    },
    {
      num: "03",
      icon: BookOpen,
      title: "Educación para la Autogestión",
      subtitle: "Prevención activa de recaídas",
      description:
        "Cada paciente recibe pautas de higiene postural, ergonomía laboral y un programa de ejercicios activos para realizar en casa. Nuestro objetivo final es que no dependas indefinidamente de la clínica ni de analgésicos.",
      metric: "Autonomía funcional e independencia motriz",
    },
    {
      num: "04",
      icon: HeartPulse,
      title: "Abordaje del Dolor sin Fármacos",
      subtitle: "Manejo de la kinesiofobia y sensibilización",
      description:
        "El dolor persistente suele generar miedo al movimiento y rigidez defensiva. Integramos fisioterapia en camilla con educación neurobiológica del dolor para devolverte la seguridad al moverte sin depender de pastillas.",
      metric: "Desensibilización central y recuperación de confianza",
    },
  ];

  return (
    <section
      id="compromisos"
      className="w-full py-14 sm:py-20 lg:py-28 bg-white border-b border-[#161B18]/8 scroll-mt-20 relative"
    >
      {/* Ancla para compatibilidad con enlaces existentes */}
      <div id="testimonios" className="absolute -top-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Encabezado Editorial de Alto Contraste */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 sm:pb-10 border-b border-[#161B18]/10 mb-8 sm:mb-14">
          <div className="max-w-2xl text-left">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#1E6B4C] mb-3 block">
              07 — Compromisos Éticos & Criterios de Alta
            </span>
            <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-sans font-semibold tracking-[-0.03em] text-[#161B18] leading-[1.08] text-balance">
              Garantías clínicas y{" "}
              <span className="font-serif italic font-normal text-[#1E6B4C]">
                criterios de alta médica
              </span>
              .
            </h2>
          </div>

          <p className="font-sans text-xs sm:text-sm text-[#161B18]/70 max-w-sm text-left md:text-right leading-relaxed font-normal">
            En Centro Terapéutico Siglo XXI no prolongamos sesiones innecesarias. Medimos tu evolución motriz con parámetros objetivos hasta tu autonomía.
          </p>
        </div>

        {/* Muro Editorial: 4 Criterios Clínicos Fundamentales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {criteria.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="flex flex-col justify-between text-left p-5 sm:p-6 rounded-2xl bg-[#FBFBF9] border border-[#161B18]/10 hover:border-[#1E6B4C]/40 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-xs font-sans font-bold text-[#1E6B4C] tracking-wider">
                      {item.num}
                    </span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#EBF2ED] flex items-center justify-center text-[#1E6B4C] group-hover:bg-[#1E6B4C] group-hover:text-white transition-colors">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>

                  <span className="text-[10.5px] sm:text-[11px] font-sans font-semibold uppercase tracking-wider text-[#1E6B4C] block mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className="font-sans font-semibold text-[16px] sm:text-lg text-[#161B18] mb-2 sm:mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-[#161B18]/75 leading-relaxed mb-4 sm:mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Parámetro de Evaluación */}
                <div className="pt-3 sm:pt-4 border-t border-[#161B18]/8 mt-auto flex items-center gap-2 text-[11px] sm:text-[11.5px] font-sans text-[#161B18]/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E6B4C] shrink-0" />
                  <span className="font-medium">{item.metric}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Declaración Institucional de Práctica Ética */}
        <div className="mt-8 sm:mt-12 p-5 sm:p-8 rounded-[24px] bg-[#EBF2ED] border border-[#1E6B4C]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-left">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1E6B4C] shrink-0 shadow-2xs mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-sans font-semibold text-base text-[#0B2418] mb-1">
                Compromiso Asistencial & Confidencialidad Médica
              </h4>
              <p className="font-sans text-xs text-[#161B18]/75 leading-relaxed font-normal">
                Cada intervención en Jr. Sociego es ejecutada de forma individual por profesionales colegiados (CTMP & CDR). Tu historial de evolución clínica y datos de salud se gestionan bajo estricto secreto profesional conforme a la Ley General de Salud N° 26842.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 font-sans text-xs font-semibold text-[#0B2418] bg-white px-4 py-2 rounded-full border border-[#161B18]/10 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#1E6B4C]" />
            <span>Sede Chachapoyas · Barrio La Laguna</span>
          </div>
        </div>

      </div>
    </section>
  );
}
