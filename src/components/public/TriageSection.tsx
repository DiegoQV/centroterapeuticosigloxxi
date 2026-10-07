import { Stethoscope } from "lucide-react";
import { TriageEngine } from "@/features/triage";

export default function TriageSection() {
  return (
    <section
      id="triage"
      className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
            <span>Herramienta Orientativa Preliminar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Triage & Orientación Inicial
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Responde brevemente a las siguientes preguntas para identificar tu zona de molestia,
            calibrar el dolor en la escala médica EVA (1-10) y coordinar una evaluación inicial presencial en Jr. Sociego, Chachapoyas.
          </p>
        </div>

        {/* Embedded Triage Engine */}
        <div className="max-w-3xl mx-auto">
          <TriageEngine />
        </div>
      </div>
    </section>
  );
}
