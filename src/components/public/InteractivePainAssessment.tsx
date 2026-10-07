"use client";

import { useState } from "react";
import {
  Activity,
  CheckCircle,
  Phone,
  ArrowRight,
  Shield,
  Sparkles,
} from "lucide-react";

interface BodyZone {
  id: string;
  name: string;
  detail: string;
  iconText: string;
}

const BODY_ZONES: BodyZone[] = [
  {
    id: "espalda",
    name: "Dolor de espalda",
    detail: "Zona lumbar, lumbago o ciática",
    iconText: "🦴",
  },
  {
    id: "cuello-hombros",
    name: "Cuello y hombros",
    detail: "Cervicales, trapecios o manguito rotador",
    iconText: "👤",
  },
  {
    id: "rodilla-tobillo",
    name: "Rodilla o tobillo",
    detail: "Esguinces, meniscos o dolor al caminar",
    iconText: "🦵",
  },
  {
    id: "lesion-deportiva",
    name: "Lesión deportiva",
    detail: "Sobrecarga, desgarros o tendinopatías",
    iconText: "🏃",
  },
  {
    id: "dolor-muscular",
    name: "Dolor muscular / tensión",
    detail: "Contracturas continuas por trabajo o estrés",
    iconText: "⚡",
  },
  {
    id: "otro",
    name: "Otro problema",
    detail: "Molestias articulares o de movimiento",
    iconText: "✨",
  },
];

export default function InteractivePainAssessment() {
  const [selectedZone, setSelectedZone] = useState<BodyZone>(BODY_ZONES[0]);
  const [painLevel, setPainLevel] = useState<number>(5);

  // Interpretación cualitativa simple sin afirmar diagnósticos médicos
  const getPainDescriptor = (level: number) => {
    if (level <= 3) {
      return {
        label: "Molestia leve",
        description: "Te permite realizar tus actividades cotidianas, pero notas incomodidad recurrente.",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
        sliderClass: "accent-emerald-600",
      };
    }
    if (level <= 6) {
      return {
        label: "Molestia moderada",
        description: "Empieza a interferir con tu descanso, trabajo o rango natural de movimiento.",
        badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
        sliderClass: "accent-amber-600",
      };
    }
    return {
      label: "Dolor intenso",
      description: "Limita notablemente tus actividades habituales o te obliga a guardar reposo forzado.",
      badgeClass: "bg-rose-100 text-rose-800 border-rose-300",
      sliderClass: "accent-rose-600",
    };
  };

  const painInfo = getPainDescriptor(painLevel);

  // Generar URL de WhatsApp incluyendo únicamente los datos seleccionados
  const generateWhatsAppUrl = () => {
    const message = `Hola, quisiera consultar por una evaluación. Actualmente tengo molestias en ${selectedZone.name.toLowerCase()} (${selectedZone.detail}) y mi nivel de dolor es ${painLevel}/10.`;
    return `https://wa.me/51941996388?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      id="evaluacion"
      className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Orientación en 30 segundos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cuéntanos qué te pasa
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Selecciona la zona que te incomoda y tu nivel aproximado de dolor para orientarte sobre los siguientes pasos.
          </p>
        </div>

        {/* Card Contenedora Principal */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl shadow-slate-200/70 border border-slate-200/90 space-y-8">
          
          {/* PASO 1: Selección de Zona */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Paso 1 de 2
              </span>
              <span className="text-xs font-semibold text-emerald-700">
                Zona seleccionada: {selectedZone.name}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
              ¿Qué te está limitando?
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {BODY_ZONES.map((zone) => {
                const isSelected = selectedZone.id === zone.id;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setSelectedZone(zone)}
                    className={`text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[96px] ${
                      isSelected
                        ? "bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs"
                        : "bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/80 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1.5">
                      <span className="text-lg">{zone.iconText}</span>
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <div>
                      <p
                        className={`text-xs sm:text-sm font-bold leading-tight ${
                          isSelected ? "text-emerald-950" : "text-slate-800"
                        }`}
                      >
                        {zone.name}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                        {zone.detail}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PASO 2: Nivel de Dolor (Slider EVA 1-10) */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Paso 2 de 2
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${painInfo.badgeClass}`}
              >
                {painInfo.label} ({painLevel}/10)
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
              ¿Cuánto dolor o molestia sientes ahora?
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Desliza para indicar la intensidad aproximada en la escala de 1 a 10:
            </p>

            {/* Slider Controls */}
            <div className="space-y-3 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/70">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>1 (Mínimo)</span>
                <span className="text-sm font-extrabold text-slate-900 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs">
                  Nivel {painLevel} de 10
                </span>
                <span>10 (Máximo)</span>
              </div>

              <input
                type="range"
                min={1}
                max={10}
                value={painLevel}
                onChange={(e) => setPainLevel(Number(e.target.value))}
                className={`w-full h-2.5 bg-slate-200 rounded-lg cursor-pointer ${painInfo.sliderClass}`}
              />

              <div className="flex justify-between text-[10px] text-slate-400 px-1">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
              </div>

              {/* Feedback descriptivo simple */}
              <div className="pt-1 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200/70">
                <span className="font-bold text-slate-900 block mb-0.5">
                  Interpretación de tu nivel:
                </span>
                <span>{painInfo.description}</span>
              </div>
            </div>
          </div>

          {/* RESULTADO Y ACCIÓN DE CONVERSIÓN */}
          <div className="pt-4 border-t border-slate-100 bg-emerald-50/50 p-5 sm:p-6 rounded-2xl border border-emerald-200/80 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Activity className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  Orientación para tu caso:
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Con lo que nos cuentas en <strong>{selectedZone.name.toLowerCase()}</strong> (intensidad {painLevel}/10), vale la pena realizar una <strong>evaluación profesional en el centro</strong> para conocer mejor qué está limitando tu movimiento y cómo podemos ayudarte.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Puedes enviarnos estos datos directamente para continuar la conversación y coordinar tu turno en Jr. Sociego:
            </p>

            {/* CTA Directo a WhatsApp */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-xl shadow-md shadow-emerald-800/20 hover:shadow-lg transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Agendar evaluación por WhatsApp</span>
              </a>

              <a
                href="/triage"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold text-slate-600 hover:text-emerald-800 transition-colors"
              >
                <span>¿Deseas completar el cuestionario clínico amplio?</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Nota orientativa ética */}
            <p className="text-[11px] text-slate-400 border-t border-emerald-200/60 pt-3 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                Esta herramienta es de carácter orientativo preliminar y no sustituye una evaluación médica ni fisioterapéutica presencial.
              </span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
