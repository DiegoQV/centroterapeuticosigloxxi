"use client";

import { useState, useId } from "react";
import {
  Activity,
  Send,
  AlertCircle,
  CheckCircle,
  Stethoscope,
  Flame,
} from "lucide-react";

interface PathologyOption {
  id: string;
  name: string;
  zone: string;
  iconName: string;
  description: string;
  recommendedEquipment: string;
}

const PATHOLOGY_OPTIONS: PathologyOption[] = [
  {
    id: "cervical-hombro",
    name: "Cervical / Cuello y Hombro",
    zone: "Columna cervical, trapecios y manguito rotador",
    iconName: "cervical",
    description: "Rigidez matutina, tortícolis, dolor irradiado a brazos o dolor de cabeza tensional.",
    recommendedEquipment: "TENS 7000 + Percusión Miofascial + Reeducación Cervicotorácica",
  },
  {
    id: "lumbar-ciatica",
    name: "Lumbar / Ciática",
    zone: "Zona baja de la espalda, lumbago, compresión ciática",
    iconName: "lumbar",
    description: "Dolor punzante que baja hacia glúteo o pierna, dificultad para levantarse o estar sentado.",
    recommendedEquipment: "Ecam Magnet (Descompresión radicular) + TENS 7000 + Estabilización Core",
  },
  {
    id: "rodilla-tobillo",
    name: "Rodilla / Tobillo",
    zone: "Articulaciones de carga, esguinces y meniscos",
    iconName: "rodilla",
    description: "Inestabilidad, hinchazón por esguince, chasquido o dolor al subir/bajar escaleras.",
    recommendedEquipment: "Ecam Magnet (Bioestimulación ósea y ligamentosa) + Kinesioterapia Funcional",
  },
  {
    id: "lesion-deportiva",
    name: "Lesión Deportiva",
    zone: "Desgarros, sobrecarga muscular, tendinopatías",
    iconName: "deporte",
    description: "Molestia aguda durante o post entrenamiento, limitación de potencia o flexibilidad.",
    recommendedEquipment: "Percusión Miofascial + Readaptación Funcional Return-to-Play",
  },
  {
    id: "tension-contracturas",
    name: "Tensión Muscular / Contracturas",
    zone: "Espalda dorsal, hombros y cadenas miofasciales",
    iconName: "tension",
    description: "Nudos o bandas tensas palpables, pesadez corporal y estrés muscular somatizado.",
    recommendedEquipment: "Terapia de Percusión Profunda + Soporte Biopsicosocial / Manejo del Estrés",
  },
];

const DURATION_OPTIONS = [
  { id: "agudo", label: "Menos de 7 días", tag: "Fase Aguda" },
  { id: "subagudo", label: "1 a 4 semanas", tag: "Fase Subaguda" },
  { id: "cronico", label: "Más de 1 mes", tag: "Fase Crónica / Recurrente" },
];

export default function TriageWidget() {
  const sliderId = useId();
  const [selectedZone, setSelectedZone] = useState<string>("lumbar-ciatica");
  const [painLevel, setPainLevel] = useState<number>(5);
  const [evolutionTime, setEvolutionTime] = useState<string>("1 a 4 semanas");

  const currentPathology = PATHOLOGY_OPTIONS.find((p) => p.id === selectedZone) || PATHOLOGY_OPTIONS[1];

  // Dynamic EVA color & category calculations
  const getEvaDetails = (score: number) => {
    if (score <= 3) {
      return {
        category: "Dolor Leve / Molestia Inicial",
        description: "Molestia intermitente que permite realizar actividades con ligero esfuerzo.",
        colorClass: "text-emerald-700",
        bgBadgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
        barColorClass: "bg-emerald-500",
        sliderColor: "#10b981", // emerald-500
        borderAccent: "border-emerald-500",
        lightBg: "bg-emerald-50/70",
      };
    }
    if (score <= 6) {
      return {
        category: "Dolor Moderado / Limitante",
        description: "Interfiere con actividades laborales o descanso; rigidez constante o pulsátil.",
        colorClass: "text-amber-700",
        bgBadgeClass: "bg-amber-100 text-amber-800 border-amber-300",
        barColorClass: "bg-amber-500",
        sliderColor: "#f59e0b", // amber-500
        borderAccent: "border-amber-500",
        lightBg: "bg-amber-50/70",
      };
    }
    return {
      category: "Dolor Severo / Incapacitante",
      description: "Dolor agudo de alta intensidad; impide el movimiento normal, reposo o conciliar el sueño.",
      colorClass: "text-rose-700",
      bgBadgeClass: "bg-rose-100 text-rose-800 border-rose-300",
      barColorClass: "bg-rose-600",
      sliderColor: "#e11d48", // rose-600
      borderAccent: "border-rose-500",
      lightBg: "bg-rose-50/70",
    };
  };

  const eva = getEvaDetails(painLevel);

  // Pre-formatted WhatsApp Message Builder
  const buildWhatsAppUrl = () => {
    const phoneNumber = "51941996388";
    const text = `Hola Centro Terapéutico Siglo XXI 👋,
He completado la Pre-Evaluación clínica en su portal web:

📍 Zona de molestia: ${currentPathology.name} (${currentPathology.zone})
⚡ Nivel de dolor (Escala EVA): ${painLevel}/10 - ${eva.category}
⏱️ Tiempo de evolución: ${evolutionTime}
🔬 Protocolo sugerido: ${currentPathology.recommendedEquipment}

Deseo agendar una Valoración Inicial presencial en Jr. Sociego, Chachapoyas. ¿Qué turnos tienen disponibles?`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="triage" className="py-16 lg:py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
            <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
            <span>Herramienta Interactiva de Triage Clínico</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pre-Evaluación Rápida de Dolor & Molestias
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Selecciona la zona afectada y calibra la intensidad del dolor según la escala médica internacional EVA (1-10). Nuestro equipo recibirá un informe formateado para priorizar tu atención en Chachapoyas.
          </p>
        </div>

        {/* Interactive Triage Container */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10 space-y-10">
            
            {/* Step 1: Pathology / Zone Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Selecciona la Zona o Tipo de Afección
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  Paso 1 de 3
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {PATHOLOGY_OPTIONS.map((item) => {
                  const isSelected = selectedZone === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedZone(item.id)}
                      className={`relative text-left p-4 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? "bg-white border-emerald-600 ring-2 ring-emerald-500/20 shadow-md shadow-emerald-700/10"
                          : "bg-white/60 hover:bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold ${
                              isSelected
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <Activity className="w-4 h-4" />
                          </span>
                          {isSelected && (
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wider block truncate">
                          {item.zone}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: EVA Pain Slider */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Escala Visual Analógica de Dolor (EVA: 1 al 10)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Desliza o haz clic sobre la escala para calificar tu nivel de dolor actual
                    </p>
                  </div>
                </div>

                {/* Dynamic Category Badge */}
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold self-start sm:self-auto ${eva.bgBadgeClass}`}
                >
                  <Flame className="w-4 h-4" />
                  <span>
                    Nivel {painLevel}/10 • {eva.category}
                  </span>
                </div>
              </div>

              {/* Slider Component */}
              <div className="space-y-4">
                <div className="relative pt-2 pb-1">
                  <input
                    id={sliderId}
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={painLevel}
                    onChange={(e) => setPainLevel(parseInt(e.target.value, 10))}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 transition-all"
                    style={{
                      accentColor: eva.sliderColor,
                    }}
                    aria-label="Escala de dolor de 1 a 10"
                  />
                </div>

                {/* Tick markers 1 to 10 */}
                <div className="grid grid-cols-10 gap-1 text-center">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => {
                    const isCurrent = val === painLevel;
                    let numColor = "text-slate-500 hover:text-slate-900";
                    if (val <= 3) numColor = isCurrent ? "bg-emerald-600 text-white shadow-xs font-bold" : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100";
                    else if (val <= 6) numColor = isCurrent ? "bg-amber-500 text-white shadow-xs font-bold" : "text-amber-700 bg-amber-50 hover:bg-amber-100";
                    else numColor = isCurrent ? "bg-rose-600 text-white shadow-xs font-bold" : "text-rose-700 bg-rose-50 hover:bg-rose-100";

                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setPainLevel(val)}
                        className={`py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg transition-all cursor-pointer font-semibold ${numColor} ${
                          isCurrent ? "scale-110 ring-2 ring-slate-900/10" : ""
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>

                {/* Scale reference labels */}
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 pt-1">
                  <span className="text-emerald-700">1 - 3: Leve / Molestia sorda</span>
                  <span className="text-amber-700">4 - 6: Moderado / Dificulta tareas</span>
                  <span className="text-rose-700">7 - 10: Severo / Incapacitante</span>
                </div>

                {/* Context description banner */}
                <div className={`mt-3 p-3 rounded-xl border ${eva.lightBg} ${eva.borderAccent} text-xs ${eva.colorClass} flex items-start gap-2.5`}>
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Interpretación Clínica:</strong> {eva.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Evolution Time */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  ¿Cuánto tiempo llevas experimentando esta molestia?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DURATION_OPTIONS.map((opt) => {
                  const isSelected = evolutionTime === opt.label;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setEvolutionTime(opt.label)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-white border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs"
                          : "bg-white/70 hover:bg-white border-slate-200 text-slate-700"
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{opt.label}</span>
                        <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">{opt.tag}</span>
                      </div>
                      {isSelected && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Triage Summary & WhatsApp Conversion Box */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Summary Clinical Details */}
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 uppercase tracking-wider">
                      Resumen Preliminar de Pre-Evaluación
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {currentPathology.name} • EVA {painLevel}/10 ({eva.category})
                  </h4>

                  <div className="text-xs sm:text-sm text-slate-300 space-y-1">
                    <p>
                      <strong className="text-emerald-400">Protocolo Fisioterapéutico Sugerido:</strong>{" "}
                      {currentPathology.recommendedEquipment}.
                    </p>
                    <p className="text-slate-400 text-xs">
                      Evaluación inicial presencial en Jr. Sociego, Chachapoyas con el equipo interdisciplinario (Terapeuta Físico + Psicóloga + Técnico Auxiliar).
                    </p>
                  </div>
                </div>

                {/* Final Dynamic Booking Button */}
                <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-sm sm:text-base font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 transition-all shadow-lg shadow-emerald-400/25 hover:scale-[1.02] cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    <span>Agendar Valoración Inicial</span>
                  </a>
                  <span className="text-[11px] text-slate-400 mt-2 text-center lg:text-right">
                    Envío instantáneo vía WhatsApp al <strong>+51 941 996 388</strong>
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
