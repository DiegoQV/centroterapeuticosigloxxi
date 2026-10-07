import {
  FileText,
  Stethoscope,
  Activity,
  CheckCircle2,
  CalendarCheck,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      stepNumber: "01",
      title: "Orientación Inicial & Contacto",
      role: "Canal Digital o WhatsApp",
      description:
        "Completas el formulario de orientación preliminar en nuestra web o nos escribes por WhatsApp para indicar tu zona de molestia y coordinar tu turno.",
      icon: FileText,
      badge: "Paso Inicial",
    },
    {
      stepNumber: "02",
      title: "Evaluación Presencial en Sede",
      role: "Terapeuta Físico Titulado",
      description:
        "En Jr. Sociego realizamos anamnesis detallada, examen físico funcional, descarte de banderas rojas y definimos tus metas funcionales reales.",
      icon: Stethoscope,
      badge: "Valoración Clínica",
    },
    {
      stepNumber: "03",
      title: "Plan Terapéutico Personalizado",
      role: "Sesiones Clínicas 1 a 1",
      description:
        "Aplicamos fisioterapia activa combinada con tecnología física (Ecam Magnet, TENS 7000 o percusión) y soporte psicológico según tu caso.",
      icon: Activity,
      badge: "Tratamiento Activo",
    },
    {
      stepNumber: "04",
      title: "Pauta Domiciliaria & Seguimiento",
      role: "Autonomía y Adherencia",
      description:
        "Te entregamos pautas claras de ejercicios para casa y monitoreamos tu evolución funcional hasta alcanzar el alta definitiva.",
      icon: CalendarCheck,
      badge: "Alta & Prevención",
    },
  ];

  return (
    <section id="como-funciona" className="py-16 lg:py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Circuito de Atención Clínica</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ¿Cómo Trabajamos tu Recuperación?
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Un proceso transparente, estructurado y sin falsas promesas. Desde el primer contacto hasta tu alta funcional en Chachapoyas.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-slate-50 rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-2xl font-black text-slate-300 group-hover:text-emerald-700 transition-colors">
                      {item.stepNumber}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200/60 px-2 py-0.5 rounded-full uppercase">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-700 mb-3 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <span className="text-xs font-semibold text-emerald-800 block mt-0.5">
                    {item.role}
                  </span>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center text-[11px] text-slate-500 font-medium">
                  <span>Paso {idx + 1} de 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Link Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-bold text-white">
              ¿Listo para dar el primer paso?
            </h4>
            <p className="text-xs text-slate-300">
              Completa la orientación inicial en 2 minutos para priorizar tu cita en Jr. Sociego.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/triage"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-sm"
            >
              <span>Iniciar Orientación</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
