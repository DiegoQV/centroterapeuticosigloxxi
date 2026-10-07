import {
  Brain,
  Bone,
  UserCheck,
  HeartPulse,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

export default function InterdisciplinaryApproach() {
  const teamMembers = [
    {
      role: "Lic. en Terapia Física y Rehabilitación",
      title: "Evaluación Funcional & Terapia Activa",
      badge: "Kinesiología & Agentes Físicos",
      description:
        "Responsable de la evaluación clínica postural, movilidad articular, prescripción de ejercicio terapéutico y dosificación de tecnología física (Ecam Magnet y TENS 7000).",
      tasks: [
        "Evaluación de movilidad y pruebas ortopédicas",
        "Prescripción y progresión de ejercicios",
        "Terapia manual ortopédica y descompresión",
      ],
      avatarBg: "from-emerald-600 to-teal-800",
      icon: Bone,
    },
    {
      role: "Lic. en Psicología",
      title: "Manejo del Dolor & Kinesiofobia",
      badge: "Abordaje Biopsicosocial",
      description:
        "Intervención orientada a desmitificar el dolor persistente, disminuir el miedo a moverse (kinesiofobia), gestionar el estrés y fortalecer el compromiso con el plan terapéutico.",
      tasks: [
        "Educación sobre neurociencia del dolor",
        "Estrategias frente a la kinesiofobia",
        "Acompañamiento en dolor musculoesquelético crónico",
      ],
      avatarBg: "from-indigo-600 to-blue-800",
      icon: Brain,
    },
    {
      role: "Técnico Auxiliar en Fisioterapia",
      title: "Asistencia Continua & Confort",
      badge: "Soporte Clínico en Sala",
      description:
        "Asiste en la preparación ergonómica de las cabinas, posicionamiento cómodo del paciente, higienización del equipamiento y apoyo constante durante las sesiones.",
      tasks: [
        "Protocolo de higiene, orden y bioseguridad",
        "Asistencia en el confort del paciente en camilla",
        "Apoyo operativo al terapeuta en sala",
      ],
      avatarBg: "from-slate-700 to-slate-900",
      icon: UserCheck,
    },
  ];

  return (
    <section id="enfoque" className="py-16 lg:py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-semibold mb-3">
            <HeartPulse className="w-3.5 h-3.5 text-indigo-600" />
            <span>Modelo Clínico Biopsicosocial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Equipo Interdisciplinario & Abordaje Integral
          </h2>
          <p className="mt-3 text-base text-slate-600">
            El dolor persistente no es solo una señal biomecánica; está influenciado por el estado de alerta del sistema nervioso, el estrés y los hábitos diarios. Por eso intervenimos de forma coordinada.
          </p>
        </div>

        {/* The Biopsychosocial Breakthrough Graphic Box */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Compromiso con la Calidad de Vida
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Más allá del reposo pasivo: recuperación activa
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Cuando una molestia se prolonga en el tiempo, el paciente suele reducir su actividad física por temor a empeorar, lo que genera mayor debilidad y rigidez. Nuestro enfoque busca romper ese ciclo:
              </p>
              
              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center gap-2 text-rose-300 bg-rose-950/40 border border-rose-800/40 p-2.5 rounded-xl">
                  <span className="font-bold">❌ El ciclo pasivo:</span> Reposo excesivo y alivio únicamente farmacológico transitorio sin reentrenamiento funcional.
                </div>
                <div className="flex items-center gap-2 text-emerald-300 bg-emerald-950/40 border border-emerald-800/40 p-2.5 rounded-xl">
                  <span className="font-bold">✅ Nuestro enfoque activo:</span> Movimiento progresivo dosificado, agentes físicos de apoyo y educación para retomar la confianza motora.
                </div>
              </div>
            </div>

            {/* Visual Process Diagram */}
            <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-400" />
                Intervención Coordinada en Sede
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white/10 rounded-xl border border-white/15">
                  <span className="font-bold text-emerald-300 block mb-0.5">1. Biomecánica & Agentes Físicos</span>
                  <p className="text-slate-300">
                    Alivio sintomático con Ecam Magnet y TENS 7000; restauración progresiva del rango articular y fuerza muscular.
                  </p>
                </div>

                <div className="flex justify-center">
                  <span className="text-xs text-emerald-400 font-bold">⬇️ Apoyo Complementario</span>
                </div>

                <div className="p-3 bg-white/10 rounded-xl border border-white/15">
                  <span className="font-bold text-indigo-300 block mb-0.5">2. Soporte Emocional y de Adherencia</span>
                  <p className="text-slate-300">
                    Manejo de la kinesiofobia, pautas de respiración diafragmática y acompañamiento para sostener los ejercicios en casa.
                  </p>
                </div>

                <div className="flex justify-center">
                  <span className="text-xs text-indigo-300 font-bold">⬇️ Meta Final</span>
                </div>

                <div className="p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-emerald-200">
                  <strong className="text-white">Autonomía Funcional y Retorno a Actividades:</strong> Reincorporación segura a la vida diaria, laboral o deportiva con herramientas de autocuidado.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Clinical Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => {
            const IconComponent = member.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg transition-all"
              >
                <div>
                  {/* Top Role Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${member.avatarBg} flex items-center justify-center text-white shadow-md`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-full uppercase">
                      {member.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {member.role}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                    {member.title}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {member.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Ámbitos de Acción:
                  </span>
                  <ul className="space-y-1.5">
                    {member.tasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
