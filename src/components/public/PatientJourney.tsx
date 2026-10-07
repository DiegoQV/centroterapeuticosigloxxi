import {
  Stethoscope,
  CalendarRange,
  UserCheck,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function PatientJourney() {
  const steps = [
    {
      number: "01",
      title: "Evaluamos",
      tagline: "Examen clínico 1 a 1",
      description:
        "Analizamos tu postura, movilidad articular y dolor en Jr. Sociego para identificar el origen biomecánico de tu limitación.",
      icon: Stethoscope,
    },
    {
      number: "02",
      title: "Planificamos",
      tagline: "Metas funcionales reales",
      description:
        "Diseñamos un cronograma por fases que combina ejercicio activo, agentes físicos y pautas específicas según tu actividad.",
      icon: CalendarRange,
    },
    {
      number: "03",
      title: "Acompañamos",
      tagline: "Sesiones guiadas y confort",
      description:
        "Te asistimos en cada movimiento en sala y te orientamos para perder el miedo al dolor con apoyo ergonómico continuo.",
      icon: UserCheck,
    },
    {
      number: "04",
      title: "Medimos",
      tagline: "Evolución objetiva",
      description:
        "Monitoreamos tus avances y cumplimiento domiciliario para ajustar las cargas hasta consolidar tu alta definitiva.",
      icon: TrendingUp,
    },
  ];

  return (
    <section
      id="como-trabajamos"
      className="py-16 lg:py-24 bg-white border-b border-slate-200 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3 border border-slate-200">
            <span>Proceso Clínico Transparente</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Así trabajamos contigo
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Un circuito de cuatro etapas pensado para devolverte la autonomía sin falsas promesas.
          </p>
        </div>

        {/* 4 Steps Grid with connecting elements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="group relative bg-slate-50/80 hover:bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-emerald-600 text-slate-700 group-hover:text-white border border-slate-200 group-hover:border-emerald-600 flex items-center justify-center transition-colors shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black font-mono text-slate-200 group-hover:text-emerald-200 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                    {step.tagline}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center text-[11px] font-bold text-slate-400 group-hover:text-emerald-700 transition-colors">
                  <span>Paso {idx + 1} de 4</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
