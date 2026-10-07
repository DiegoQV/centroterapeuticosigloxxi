export default function ClinicalTrustBar() {
  const stats = [
    {
      value: "+10",
      suffix: "Años",
      label: "Experiencia Clínica",
      sub: "Atención en Chachapoyas",
    },
    {
      value: "100%",
      label: "Staff Colegiado",
      sub: "Registro profesional CTMP y CDR",
    },
    {
      value: "1 a 1",
      label: "Atención Individual",
      sub: "Sesiones exclusivas en camilla",
    },
    {
      value: "Biomédico",
      label: "Equipamiento de Apoyo",
      sub: "Magneto, TENS y percusión",
    },
  ];

  return (
    <section className="w-full bg-white border-y border-zinc-200/80 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 sm:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-center ${
                idx === 0
                  ? "lg:pr-8"
                  : idx === stats.length - 1
                  ? "pt-6 sm:pt-0 lg:pl-8"
                  : "pt-6 sm:pt-0 lg:px-8"
              }`}
            >
              <div className="flex items-baseline gap-1">
                <span className="font-outfit font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#18181b] tracking-[-0.03em] leading-none">
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="font-outfit font-semibold text-lg sm:text-xl text-[#38C666]">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <div className="font-outfit font-semibold text-[14.5px] sm:text-[15.5px] text-[#18181b] leading-tight mt-2">
                {stat.label}
              </div>
              <div className="font-inter text-xs text-zinc-500 mt-0.5 font-normal">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
