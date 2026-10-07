"use client";

import { ShieldCheck } from "lucide-react";

export default function TrustTeamSection() {
  const members = [
    {
      name: "Lic. Terapeuta Físico",
      role: "Fisioterapia y Rehabilitación",
      badge: "Colegiado CTMP",
      footerTag: "Terapia manual y prescripción 1 a 1",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCYTlwZt50M9Zt2BsWhdCAQhsRzx-dr3xAz9yt2lsfuVQ8vI-O-gfK7_MJh81wY6YlJm8Y6OH2TQy3B0Lsq_YOMwojdrUjSQHz0c9y_u_7ugYo-1Xxs6hslV9kDyYkMWKqaqHomHbmiFpcFQcjIdzddBqWa8lgbkiDpXbjJzLM6lOB3OF0bqQah1DL4Wg9jWVBqBpEDGNPBMvVSAwS47yKPuR2IHTSiRzsDHDAp7vfgzViwSlGjUkzeFA",
      short:
        "Responsable del diagnóstico postural biomecánico, terapia manual y prescripción del ejercicio terapéutico.",
    },
    {
      name: "Lic. en Psicología",
      role: "Psicología Clínica del Dolor",
      badge: "Colegiada CDR",
      footerTag: "Manejo del dolor y kinesiofobia",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBUdy_6dM646Tmow4qCOUvieKI-AnH3x5HqNkOR1LL4lnwYb3DmKcnE_gC88UZBgNWUDC5q90R0A0WL0QRtVdbrFYaM7mKIGNHnSL0Lot9-opYw6TBFhwkbFwmNkw0oH3Ux6cGGtZaR8stlTKturMx6RO0z3aUEA_Y2U_R6d8OsqyWhEMRvB47mp7T3xlX7aeqg7SPFG_4vR-3kWlJYUWZZnKwccS6tFE9s05kcoHQ3UScIQXc23ij7rQ",
      short:
        "Acompañamiento especializado para superar la kinesiofobia (miedo a moverte) y abordar el dolor persistente.",
    },
    {
      name: "Técnico en Fisioterapia",
      role: "Asistencia y Soporte en Sala",
      badge: "Soporte Clínico",
      footerTag: "Asistencia continua y confort en camilla",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAJMNQ0JBBDfIKgRkikkrdIuMhHsjPazx86ARubGmywToEpcOS2qC6gN4p9-ECbqmn3-sLFxadUd8HDAcWRxMeBlL_f-56-aHtRvskFo2eNvnWStAD7ipD0VqPHM0PdNmGuaKMYFl_97p_L6l3ZAPmNABU_y0eZWDfNzBswPv2BwZhGw0JHi6zC-lX_sDbZDIrgL4OTko0mW7Mlog3wC0y78zrMgPWE-ePd5lEY-lXRFbhvauGqLgp9rQ",
      short:
        "Acondicionamiento ergonómico del paciente en camilla, preparación de cabinas y soporte asistencial continuo.",
    },
  ];

  return (
    <section id="equipo" className="w-full py-20 lg:py-28 bg-[#F0F4F1] border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Encabezado Editorial */}
        <div className="text-center max-w-4xl mx-auto mb-14 lg:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200/90 text-xs font-inter font-medium tracking-tight text-zinc-800 mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#38C666]" />
            <span>Cuerpo Clínico</span>
          </div>
          <h2 className="font-outfit font-semibold text-[34px] sm:text-[44px] lg:text-[50px] text-[#18181b] tracking-[-0.03em] leading-[1.08] mb-3.5 text-balance">
            Profesionales colegiados comprometidos con tu bienestar.
          </h2>
          <p className="font-inter text-base sm:text-[17px] text-[#18181b]/75 max-w-4xl mx-auto leading-relaxed">
            Criterio clínico certero y calidez humana para devolverte la confianza en tu cuerpo.
          </p>
        </div>

        {/* 3 Columnas Editoriales en Tarjetas Blancas Unificadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {members.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-3xl p-3.5 sm:p-4 border border-zinc-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Retrato Vertical de Gran Escala */}
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-5 bg-zinc-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 select-none"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-outfit font-semibold text-[#0D2818] border border-[#38C666]/30 shadow-xs">
                    {member.badge}
                  </div>
                </div>

                {/* Información Editorial */}
                <div className="px-1.5">
                  <span className="font-outfit font-bold text-xs text-[#0D2818] uppercase tracking-wider block mb-1">
                    {member.role}
                  </span>

                  <h3 className="font-outfit font-semibold text-xl sm:text-[22px] text-[#18181b] mb-2 leading-snug">
                    {member.name}
                  </h3>

                  <p className="font-inter text-xs sm:text-[13.5px] text-[#18181b]/75 leading-relaxed mb-4">
                    {member.short}
                  </p>
                </div>
              </div>

              {/* Pie de Tarjeta con Diferenciador Específico */}
              <div className="px-1.5 pt-3.5 border-t border-zinc-100 flex items-center gap-2 text-xs font-inter text-zinc-600">
                <ShieldCheck className="w-4 h-4 text-[#38C666] shrink-0" />
                <span className="font-medium">{member.footerTag}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
