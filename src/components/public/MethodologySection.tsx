"use client";

import { useState } from "react";
import {
  ClipboardList,
  FileCheck,
  Activity,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function MethodologySection() {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  const phases = [
    {
      num: "01",
      title: "Evaluación Inicial",
      phase: "Diagnóstico",
      tagline: "Origen del dolor",
      desc: "Examen articular y postural minucioso para identificar la causa real del dolor, no solo el síntoma superficial.",
      milestone: "Causa raíz identificada",
      icon: ClipboardList,
      nodeX: 100,
    },
    {
      num: "02",
      title: "Plan a Medida",
      phase: "Diseño Clínico",
      tagline: "Hoja de ruta",
      desc: "Definición de metas terapéuticas claras, número estimado de sesiones y la tecnología biomédica necesaria.",
      milestone: "Cronograma transparente",
      icon: FileCheck,
      nodeX: 300,
    },
    {
      num: "03",
      title: "Tratamiento Activo",
      phase: "Resolución",
      tagline: "Núcleo resolutivo",
      desc: "Atención 1 a 1 en camilla con terapia manual ortopédica, aparatología de apoyo y movimiento sin dolor.",
      milestone: "Alivio y desinflamación",
      icon: Activity,
      isCore: true,
      nodeX: 500,
    },
    {
      num: "04",
      title: "Control de Avance",
      phase: "Medición",
      tagline: "Validación objetiva",
      desc: "Medición continua de rango y fuerza para ajustar las cargas terapéuticas según tu evolución real.",
      milestone: "Reevaluación de progreso",
      icon: TrendingUp,
      nodeX: 700,
    },
    {
      num: "05",
      title: "Alta y Autonomía",
      phase: "Consolidación",
      tagline: "Vida sin recaídas",
      desc: "Pautas de ergonomía, educación postural y ejercicios para mantener tu bienestar y autonomía a largo plazo.",
      milestone: "Autonomía definitiva",
      icon: ShieldCheck,
      nodeX: 900,
    },
  ];

  // Coordenadas de onda biomédica ECG amplia y fluida (1000 x 60, baseline y=30)
  const ecgPath = `
    M 10 30 L 70 30
    L 78 30 L 83 24 L 88 36 L 94 12 L 100 48 L 105 28 L 112 30 L 125 30
    L 270 30
    L 278 30 L 283 23 L 288 37 L 294 9 L 300 51 L 305 28 L 312 30 L 325 30
    L 470 30
    L 478 30 L 483 21 L 488 39 L 494 5 L 500 55 L 506 27 L 514 30 L 528 30
    L 670 30
    L 678 30 L 683 23 L 688 37 L 694 9 L 700 51 L 705 28 L 712 30 L 725 30
    L 870 30
    L 878 30 L 883 24 L 888 36 L 894 12 L 900 48 L 905 28 L 912 30 L 925 30
    L 990 30
  `;

  return (
    <section id="metodologia" className="w-full py-20 lg:py-28 bg-[#F0F4F1] border-b border-zinc-200/80 overflow-hidden">
      {/* Animación CSS para el haz viajero de la onda biomédica */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes ecgTravel {
              0% { stroke-dashoffset: 1400; }
              100% { stroke-dashoffset: -200; }
            }
            .ecg-beam-pulse {
              stroke-dasharray: 220 1400;
              animation: ecgTravel 3.5s cubic-bezier(0.25, 0.8, 0.45, 1) infinite;
            }
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Encabezado Editorial Espacioso */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200/90 text-xs font-inter font-medium tracking-tight text-zinc-800 mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#38C666]" />
            <span>Sistema Terapéutico Propio</span>
          </div>
          <h2 className="font-outfit font-semibold text-[32px] sm:text-[40px] lg:text-[46px] text-[#18181b] tracking-[-0.03em] leading-[1.08] mb-3.5 text-balance">
            Las 5 fases de tu camino hacia la recuperación.
          </h2>
          <p className="font-inter text-sm sm:text-base text-[#18181b]/75 max-w-3xl mx-auto leading-relaxed lg:whitespace-nowrap">
            Un proceso clínico claro, estructurado y medible para que retomes tu vida.
          </p>
        </div>

        {/* ============================================================ */}
        {/* MONITOR BIOMÉDICO CONTINUO (ECG / MONITOR DE SIGNOS VITALES) */}
        {/* Conecta dinámicamente desde la Fase 01 hasta la Fase 05     */}
        {/* ============================================================ */}
        <div className="hidden lg:block mb-10 relative">
          
          {/* Rótulo superior del monitor */}
          <div className="flex items-center justify-between text-xs font-outfit uppercase tracking-widest text-zinc-400 mb-2.5 px-6">
            <span className="flex items-center gap-2 text-zinc-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#38C666] animate-pulse" />
              Trazado Biomédico de Recuperación
            </span>
            <span className="text-[11px] font-medium text-zinc-500">
              Evaluación Basal ➔ Alta Funcional
            </span>
          </div>

          <div className="w-full bg-white/85 backdrop-blur-xs rounded-3xl border border-zinc-200/90 shadow-2xs p-6">
            
            {/* 1. Fila de Fases con Total Holgura (Sin colisiones) */}
            <div className="grid grid-cols-5 text-center mb-4">
              {phases.map((item, idx) => {
                const isHovered = hoveredPhase === idx;
                const isCore = item.isCore;
                return (
                  <button
                    key={idx}
                    type="button"
                    onMouseEnter={() => setHoveredPhase(idx)}
                    onMouseLeave={() => setHoveredPhase(null)}
                    className="flex flex-col items-center cursor-pointer transition-all duration-200 group/label"
                  >
                    <span
                      className={`text-xs font-outfit font-bold uppercase tracking-wider transition-colors duration-200 ${
                        isHovered
                          ? "text-[#0D2818] scale-105"
                          : isCore
                          ? "text-[#38C666]"
                          : "text-zinc-600 group-hover/label:text-[#18181b]"
                      }`}
                    >
                      {item.num} · {item.phase}
                    </span>
                    <span className="text-[11px] font-inter text-zinc-400 mt-0.5">
                      {item.tagline}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 2. Pantalla de Onda ECG (Despejada: Cero Colisiones con Texto) */}
            <div className="relative w-full h-12">
              <svg
                viewBox="0 0 1000 60"
                className="w-full h-full overflow-visible"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="ecgGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <linearGradient id="ecgGradientTrack" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#38C666" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                {/* Línea Base Guía */}
                <path
                  d={ecgPath}
                  stroke="url(#ecgGradientTrack)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-75"
                />

                {/* Haz de Luz ECG Viajero */}
                <path
                  d={ecgPath}
                  stroke="#38C666"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#ecgGlowFilter)"
                  className="ecg-beam-pulse"
                />

                {/* Nodos Interactivos para cada Fase */}
                {phases.map((item, idx) => {
                  const isHovered = hoveredPhase === idx;
                  const isCore = item.isCore;
                  return (
                    <g
                      key={idx}
                      className="cursor-pointer transition-all duration-300"
                      onMouseEnter={() => setHoveredPhase(idx)}
                      onMouseLeave={() => setHoveredPhase(null)}
                    >
                      <circle
                        cx={item.nodeX}
                        cy={30}
                        r={isHovered ? 12 : isCore ? 8.5 : 6.5}
                        fill={isHovered || isCore ? "#38C666" : "#cbd5e1"}
                        fillOpacity={isHovered ? 0.35 : 0.2}
                        className={isHovered || isCore ? "animate-pulse" : ""}
                      />
                      <circle
                        cx={item.nodeX}
                        cy={30}
                        r={isHovered ? 6 : 4.5}
                        fill={isHovered ? "#0D2818" : isCore ? "#38C666" : "#18181b"}
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* CUADRÍCULA DE 5 TARJETAS AMPLIAS, CÓMODAS Y SIN RECORTES    */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-5 items-stretch">
          {phases.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredPhase === idx;
            const isCore = item.isCore;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredPhase(idx)}
                onMouseLeave={() => setHoveredPhase(null)}
                className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between group relative ${
                  isHovered
                    ? "border-[#38C666] shadow-md -translate-y-2 bg-linear-to-b from-white to-[#F0F4F1]/30"
                    : isCore
                    ? "border-[#38C666]/60 shadow-2xs hover:border-[#38C666]"
                    : "border-zinc-200/90 shadow-2xs hover:border-[#38C666]/50 hover:shadow-xs hover:-translate-y-1"
                }`}
              >
                {/* Distintivo de Fase Clave */}
                {isCore && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0D2818] text-white text-[10px] font-outfit font-bold uppercase tracking-widest px-3 py-0.5 rounded-full border border-[#38C666]/50 shadow-xs flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-[#38C666]" />
                    <span>Fase Clave</span>
                  </div>
                )}

                <div>
                  {/* Cabecera Espaciosa: Ícono de Marca + Número Outfit */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xs ${
                        isHovered || isCore
                          ? "bg-[#38C666] text-white"
                          : "bg-[#EAF5EE] border border-[#38C666]/30 text-[#0D2818] group-hover:bg-[#38C666] group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`font-outfit font-bold text-3xl transition-colors duration-300 ${
                        isHovered || isCore ? "text-[#0D2818]" : "text-zinc-300 group-hover:text-[#0D2818]"
                      }`}
                    >
                      {item.num}
                    </span>
                  </div>

                  {/* Etiqueta de Fase */}
                  <span className="font-outfit font-bold text-[11px] uppercase tracking-wider text-[#38C666] block mb-1.5">
                    Fase {item.num} · {item.phase}
                  </span>

                  {/* Título en Outfit */}
                  <h3 className="font-outfit font-semibold text-[19px] text-[#18181b] mb-2.5 leading-snug">
                    {item.title}
                  </h3>

                  {/* Descripción Fluida sin Apreturas */}
                  <p className="font-inter text-xs sm:text-[13px] text-[#18181b]/70 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Pie de Tarjeta: Entregable Clínico 100% Legible (CERO truncamiento) */}
                <div className="pt-4 border-t border-zinc-100 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38C666] shrink-0" />
                  <span className="font-inter text-[11.5px] text-[#18181b]/85 font-medium leading-tight">
                    {item.milestone}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
