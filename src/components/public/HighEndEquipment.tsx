import {
  Zap,
  Waves,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Cpu,
} from "lucide-react";

export default function HighEndEquipment() {
  const equipments = [
    {
      id: "ecam-magnet",
      name: "Ecam Magnet",
      category: "Magnetoterapia de Campo Pulsátil",
      badge: "Apoyo en Dolor & Inflamación",
      role: "Modulación tisular y desinflamación en procesos crónicos y articulares",
      principle: "Campos electromagnéticos pulsátiles (CEMP) de baja frecuencia.",
      mechanism:
        "Actúa sobre la membrana celular facilitando el intercambio iónico y la microcirculación local, contribuyendo a la disminución del edema y el alivio del dolor musculoesquelético.",
      clinicalIndications: [
        "Dolor ciático y afecciones de la columna lumbar",
        "Edema intraarticular en rodilla y tobillo",
        "Apoyo en procesos de consolidación y artrosis",
        "Tendinopatías y sobrecargas articulares",
      ],
      specs: [
        { label: "Emisión", value: "Aférmica / No invasiva" },
        { label: "Aplicación", value: "Local o regional" },
        { label: "Frecuencia", value: "Dosificada según caso" },
      ],
      accentColor: "from-emerald-600 to-teal-800",
      pillColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      icon: Waves,
    },
    {
      id: "tens-7000",
      name: "TENS 7000",
      category: "Electroestimulación Analgésica",
      badge: "Electroanalgesia Controlada",
      role: "Modulación periférica del dolor musculoesquelético agudo y subagudo",
      principle: "Neuroestimulación eléctrica transcutánea mediante electrodos de superficie.",
      mechanism:
        "Estimula las fibras nerviosas sensitivas mielinizadas de gran diámetro (A-beta) para modular la transmisión de señales nociceptivas en el asta dorsal medular (mecanismo de compuerta).",
      clinicalIndications: [
        "Dolor agudo en lumbalgias y dorsalgias",
        "Rigidez cervical y dolor en trapecios",
        "Contracturas musculares dolorosas",
        "Soporte analgésico previo al ejercicio terapéutico",
      ],
      specs: [
        { label: "Canales", value: "Dual independiente" },
        { label: "Forma de Onda", value: "Bifásica simétrica" },
        { label: "Intensidad", value: "Calibración gradual" },
      ],
      accentColor: "from-blue-700 to-indigo-900",
      pillColor: "bg-blue-100 text-blue-800 border-blue-200",
      icon: Zap,
    },
    {
      id: "percursion-miofascial",
      name: "Masajes de Percusión",
      category: "Terapia Mecánica Miofascial",
      badge: "Liberación de Tejidos Blandos",
      role: "Alivio de la tensión muscular acumulada, bandas tensas y contracturas",
      principle: "Microimpactos rítmicos controlados sobre vientres musculares y fascias.",
      mechanism:
        "Genera estímulo propioceptivo y respuesta de vasodilatación refleja local, ayudando a disminuir la rigidez muscular y optimizar la elasticidad del tejido conectivo.",
      clinicalIndications: [
        "Contracturas por sobrecarga postural o laboral",
        "Tensión en trapecios, columna dorsal y glúteos",
        "Recuperación muscular post-esfuerzo deportivo",
        "Rigidez miofascial y fatiga física",
      ],
      specs: [
        { label: "Modos", value: "Frecuencia graduable" },
        { label: "Cabezales", value: "Anatómicos intercambiables" },
        { label: "Supervisión", value: "Aplicación guiada" },
      ],
      accentColor: "from-slate-800 to-teal-950",
      pillColor: "bg-teal-100 text-teal-800 border-teal-200",
      icon: Layers,
    },
  ];

  return (
    <section id="equipamiento" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tecnología Física Certificada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Equipamiento Terapéutico de Apoyo
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Los agentes físicos no son un fin en sí mismos, sino herramientas que potencian la desinflamación y analgesia para facilitar una rehabilitación activa y basada en movimiento.
          </p>
        </div>

        {/* 3 Technical Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {equipments.map((eq) => {
            const IconComponent = eq.icon;
            return (
              <div
                key={eq.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Top Banner */}
                <div>
                  <div className={`h-3 bg-gradient-to-r ${eq.accentColor}`} />
                  <div className="p-6 sm:p-7">
                    
                    {/* Badge & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${eq.pillColor}`}>
                        {eq.badge}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5 text-emerald-700" />
                      </div>
                    </div>

                    {/* Titles */}
                    <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      {eq.name}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mt-1">
                      {eq.category}
                    </p>

                    {/* Role quote */}
                    <p className="mt-3 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200/70 italic">
                      &ldquo;{eq.role}&rdquo;
                    </p>

                    {/* Physiological Mechanism */}
                    <div className="mt-4 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        Mecanismo de Acción:
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {eq.mechanism}
                      </p>
                    </div>

                    {/* Clinical Indications */}
                    <div className="mt-5 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                        Indicaciones Principales:
                      </span>
                      <ul className="space-y-1.5">
                        {eq.clinicalIndications.map((ind, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{ind}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Card Specs Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  {eq.specs.map((sp, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        {sp.label}
                      </span>
                      <span className="text-[11px] font-bold text-slate-800 truncate">
                        {sp.value}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Clinical Note Banner */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Uso Responsable con Indicación Personalizada
              </h4>
              <p className="text-xs text-slate-600">
                La aplicación de cada dispositivo se realiza previa verificación de contraindicaciones (ej. marcapasos en electroterapia) y según la tolerancia de cada paciente.
              </p>
            </div>
          </div>
          <a
            href="#triage"
            className="shrink-0 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-xl transition-colors border border-emerald-200"
          >
            Iniciar Triage &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}
