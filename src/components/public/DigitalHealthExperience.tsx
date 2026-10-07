"use client";

import { useState } from "react";
import {
  Smartphone,
  Activity,
  CheckCircle2,
  TrendingUp,
  Play,
  Layers,
} from "lucide-react";

interface Stage {
  id: string;
  step: string;
  title: string;
  tagline: string;
  description: string;
  icon: typeof Activity;
}

const STAGES: Stage[] = [
  {
    id: "evaluamos",
    step: "01",
    title: "Evaluamos",
    tagline: "Registramos tu punto de partida con precisión",
    description:
      "En tu primera sesión en Jr. Sociego valoramos tu rango de movimiento articular, descartamos signos de alarma y registramos tus objetivos cotidianos prioritarios.",
    icon: Activity,
  },
  {
    id: "plan",
    step: "02",
    title: "Diseñamos tu plan",
    tagline: "Tu proceso queda organizado según tus objetivos",
    description:
      "No aplicamos fórmulas genéricas. Estructuramos un plan en fases claras: modulación inicial del dolor, recuperación de movilidad y fortalecimiento funcional progresivo.",
    icon: Layers,
  },
  {
    id: "casa",
    step: "03",
    title: "Continúas en casa",
    tagline: "Consulta tus ejercicios y recomendaciones desde tu móvil",
    description:
      "Accedes a tu portal personal 'Mi Pauta' con tu código clínico: videos breves, repeticiones indicadas y registro de avance para que te ejercites en casa con total confianza.",
    icon: Smartphone,
  },
  {
    id: "progreso",
    step: "04",
    title: "Medimos tu progreso",
    tagline: "Observamos cómo evoluciona tu proceso",
    description:
      "Registramos tus avances y tolerancia en cada sesión para reajustar los ejercicios de forma personalizada y acompañarte hasta tu alta funcional.",
    icon: TrendingUp,
  },
];

export default function DigitalHealthExperience() {
  const [activeStage, setActiveStage] = useState<string>("evaluamos");

  return (
    <section
      id="experiencia-digital"
      className="py-16 lg:py-24 bg-slate-900 text-white scroll-mt-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold mb-3">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tecnología al servicio del paciente</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Tu recuperación también tiene seguimiento digital
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal">
            En Siglo XXI el proceso no termina al salir de la camilla. Combinamos atención presencial 1 a 1 con herramientas digitales para que mantengas continuidad y autonomía.
          </p>
        </div>

        {/* 2-Column Interactive SaaS-style Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: 4 Interactive Stage Tabs */}
          <div className="lg:col-span-6 space-y-3">
            {STAGES.map((stage) => {
              const isActive = activeStage === stage.id;
              const IconComponent = stage.icon;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStage(stage.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isActive
                      ? "bg-slate-800 border-emerald-500/80 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/40"
                      : "bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`text-base font-bold ${
                          isActive ? "text-emerald-300" : "text-white"
                        }`}
                      >
                        {stage.title}
                      </h3>
                      {isActive && (
                        <span className="text-[10px] bg-emerald-900/70 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700/50 font-medium">
                          Fase activa
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-300 mt-0.5">
                      {stage.tagline}
                    </p>
                    {isActive && (
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed animate-in fade-in">
                        {stage.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic UI Mockup Preview */}
          <div className="lg:col-span-6">
            <div className="bg-slate-950 rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-2xl relative">
              
              {/* STAGE 01 MOCKUP: Evaluación Clínica */}
              {activeStage === "evaluamos" && (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">
                        Historia Clínica Digital • Paso 01
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        Valoración Biomecánica Inicial
                      </h4>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg">
                      Sede Chachapoyas
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Zona evaluada</span>
                      <span className="text-xs font-bold text-white">Columna Lumbar</span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Escala EVA inicial</span>
                      <span className="text-xs font-bold text-amber-400">6 / 10 (Moderado)</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Pruebas ortopédicas de movilidad:</span>
                      <span className="text-emerald-400 font-semibold">Completadas</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 text-[11px]">
                      <span>Descarte de banderas rojas:</span>
                      <span className="text-emerald-400 font-semibold">Seguro para terapia</span>
                    </div>
                    <div className="pt-1 text-[11px] text-slate-300 border-t border-slate-800">
                      <span className="text-slate-400">Objetivo del paciente:</span> Retomar caminata y actividad laboral sin dolor punzante.
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-[11px] text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Punto de partida registrado para medir la recuperación sesión a sesión.</span>
                  </div>
                </div>
              )}

              {/* STAGE 02 MOCKUP: Diseño del Plan Terapéutico */}
              {activeStage === "plan" && (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">
                        Prescripción Dosificada • Paso 02
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        Plan de Recuperación Funcional
                      </h4>
                    </div>
                    <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-700/50">
                      8 Sesiones Estimadas
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                          1
                        </span>
                        <div>
                          <p className="font-bold text-white">Fase Analgésica & Descompresión</p>
                          <p className="text-[10px] text-slate-400">Ecam Magnet + TENS 7000 + Terapia manual</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold">Sesiones 1-3</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[10px] font-bold">
                          2
                        </span>
                        <div>
                          <p className="font-bold text-white">Fase de Movilidad & Control Motor</p>
                          <p className="text-[10px] text-slate-400">Ejercicios activos de estabilización lumbopélvica</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">Sesiones 4-6</span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[10px] font-bold">
                          3
                        </span>
                        <div>
                          <p className="font-bold text-white">Fase de Readaptación Funcional</p>
                          <p className="text-[10px] text-slate-400">Carga gradual y prevención de recaídas</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-semibold">Sesiones 7-8</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400">
                      * Cada plan se ajusta a la capacidad y respuesta biológica individual.
                    </span>
                  </div>
                </div>
              )}

              {/* STAGE 03 MOCKUP: Continúas en casa (Smartphone UI) */}
              {activeStage === "casa" && (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">
                        Portal Móvil del Paciente • Paso 03
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        Pauta Digital en tu Teléfono
                      </h4>
                    </div>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                      Sin descargas pesadas
                    </span>
                  </div>

                  {/* Smartphone screen simulation */}
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700/80 max-w-xs mx-auto space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                      <span className="font-bold text-white">Siglo XXI • Mi Pauta</span>
                      <span className="text-emerald-400">Código activo</span>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-semibold">Ejercicio 1 de 2</span>
                        <span className="text-[10px] bg-emerald-900 text-emerald-300 px-1.5 py-0.5 rounded">2 series × 10 reps</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0">
                          <Play className="w-4 h-4 fill-current" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Báscula pélvica en decúbito</p>
                          <p className="text-[10px] text-slate-400">Micro-video demostrativo (18 seg)</p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Marcar como realizado</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-slate-400">
                    Tu terapeuta supervisa el cumplimiento para adaptar las cargas en tu próxima sesión.
                  </p>
                </div>
              )}

              {/* STAGE 04 MOCKUP: Medición de Progreso */}
              {activeStage === "progreso" && (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">
                        Trazabilidad y Métricas • Paso 04
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        Evolución Funcional Objetiva
                      </h4>
                    </div>
                    <span className="text-[10px] bg-amber-950/80 text-amber-300 border border-amber-800/80 px-2 py-0.5 rounded">
                      Ejemplo de visualización
                    </span>
                  </div>

                  {/* Visual Chart Bars */}
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Descenso del dolor (Escala EVA):</span>
                      <span className="text-emerald-400 font-bold font-mono">-66% de molestia</span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                          <span>Semana 1 (Inicio)</span>
                          <span className="text-amber-400 font-mono">EVA 6/10</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full w-[60%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                          <span>Semana 2</span>
                          <span className="text-amber-300 font-mono">EVA 4/10</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full w-[40%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                          <span>Semana 4 (Reevaluación)</span>
                          <span className="text-emerald-400 font-mono">EVA 2/10</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full w-[20%]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                    <strong className="text-slate-200 block mb-0.5">Aviso ético importante:</strong>
                    La gráfica anterior es un <em>ejemplo ilustrativo</em> del tipo de seguimiento registrado en el sistema. Los tiempos y resultados clínicos dependen de la evaluación presencial y respuesta individual de cada paciente.
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
