"use client";

import React, { useState } from "react";
import {
  Activity,
  Flame,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Zap,
  RotateCcw,
} from "lucide-react";

interface BodyZone {
  id: "cervical" | "hombro" | "lumbar" | "rodilla";
  name: string;
  sub: string;
  patientsCount: number;
  avgEva: number;
  equipment: string;
  therapy: string;
  pinX: number; // percentage
  pinY: number; // percentage
  color: string;
}

const BODY_ZONES: BodyZone[] = [
  {
    id: "cervical",
    name: "Columna Cervical & Cuello",
    sub: "Cervicobraquialgia & Cefaleas",
    patientsCount: 3,
    avgEva: 6.2,
    equipment: "TENS 7000 + Termoterapia",
    therapy: "Descompresión y tracción manual",
    pinX: 50,
    pinY: 22,
    color: "#059669",
  },
  {
    id: "hombro",
    name: "Complejo del Hombro",
    sub: "Manguito Rotador & Tendinopatía",
    patientsCount: 2,
    avgEva: 5.8,
    equipment: "Pistola de Percusión Miofascial",
    therapy: "Movilización articular pasiva-activa",
    pinX: 35,
    pinY: 29,
    color: "#0D9488",
  },
  {
    id: "lumbar",
    name: "Región Lumbar & Ciática",
    sub: "Hernia Discal & Lumbalgia Mecánica",
    patientsCount: 5,
    avgEva: 7.5,
    equipment: "Ecam Magnet (Magnetoterapia)",
    therapy: "Liberación miofascial + Control Core",
    pinX: 50,
    pinY: 46,
    color: "#E11D48",
  },
  {
    id: "rodilla",
    name: "Rodilla & Miembro Inferior",
    sub: "Gonartrosis & Meniscopatía",
    patientsCount: 4,
    avgEva: 6.0,
    equipment: "Magnetoterapia + Electroanalgesia",
    therapy: "Reeducación de marcha y propiocepción",
    pinX: 45,
    pinY: 74,
    color: "#2563EB",
  },
];

export default function BiomechanicalAnatomyWidget() {
  const [activeTab, setActiveTab] = useState<"overview" | "anatomy" | "insights">("anatomy");
  const [selectedZone, setSelectedZone] = useState<BodyZone>(BODY_ZONES[2]); // Lumbar por defecto

  return (
    <div className="bg-white rounded-[32px] border border-gray-100/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between h-full relative overflow-hidden font-sans">
      {/* Luces sutiles de fondo para profundidad anatómica */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-1/4 w-60 h-60 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-0"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-10 w-44 h-44 bg-teal-100/35 rounded-full blur-2xl pointer-events-none -z-0"
      />

      {/* Cabecera del Widget con Pestañas estilo Píldora (como en el diseño de referencia) */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>Escaneo Biomecánico</span>
          </span>
          <h3 className="font-sans text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight mt-0.5">
            Mapa de Focos de Dolor
          </h3>
        </div>

        {/* Pestañas de Navegación del Widget */}
        <div className="inline-flex p-1 bg-gray-100/80 rounded-full text-xs font-semibold text-gray-600">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-white text-gray-900 shadow-xs"
                : "hover:text-gray-900"
            }`}
          >
            Resumen
          </button>
          <button
            onClick={() => setActiveTab("anatomy")}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === "anatomy"
                ? "bg-white text-gray-900 shadow-xs"
                : "hover:text-gray-900"
            }`}
          >
            Anatomía
          </button>
          <button
            onClick={() => setActiveTab("insights")}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              activeTab === "insights"
                ? "bg-white text-gray-900 shadow-xs"
                : "hover:text-gray-900"
            }`}
          >
            Insights
          </button>
        </div>
      </div>

      {/* Área Central: Visualizador Anatómico con Puntos de Dolor Interactivos */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center my-3 min-h-[300px]">
        {/* Gráfico Vectorial Anatómico del Cuerpo Humano (Silueta Biomecánica Musculoesquelética) */}
        <div className="relative w-full max-w-[260px] h-[340px] flex items-center justify-center">
          <svg
            viewBox="0 0 200 360"
            className="w-full h-full drop-shadow-md select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="50%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
              <linearGradient id="spineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Cabeza */}
            <circle cx="100" cy="40" r="22" fill="url(#bodyGradient)" opacity="0.85" />
            
            {/* Cuello / Cervical */}
            <rect x="94" y="62" width="12" height="14" rx="4" fill="url(#bodyGradient)" opacity="0.9" />

            {/* Torso & Caja Torácica */}
            <path
              d="M68 80 C68 76, 132 76, 132 80 L136 150 C136 165, 64 165, 64 150 Z"
              fill="url(#bodyGradient)"
              opacity="0.8"
            />

            {/* Eje de la Columna Vertebral (Biomecánica) */}
            <line
              x1="100"
              y1="64"
              x2="100"
              y2="175"
              stroke="url(#spineGradient)"
              strokeWidth="3.5"
              strokeDasharray="4 2"
              strokeLinecap="round"
              filter="url(#glow)"
            />

            {/* Hombros y Brazos */}
            <path
              d="M68 82 C55 86, 42 105, 40 145 C38 180, 44 210, 46 220"
              stroke="url(#bodyGradient)"
              strokeWidth="11"
              strokeLinecap="round"
              opacity="0.75"
            />
            <path
              d="M132 82 C145 86, 158 105, 160 145 C162 180, 156 210, 154 220"
              stroke="url(#bodyGradient)"
              strokeWidth="11"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* Pelvis / Cadera */}
            <path
              d="M68 152 C68 150, 132 150, 132 152 L128 185 C128 195, 72 195, 72 185 Z"
              fill="url(#bodyGradient)"
              opacity="0.85"
            />

            {/* Pierna Izquierda */}
            <path
              d="M84 190 C83 230, 81 270, 81 295 L80 345"
              stroke="url(#bodyGradient)"
              strokeWidth="13"
              strokeLinecap="round"
              opacity="0.75"
            />
            {/* Pierna Derecha */}
            <path
              d="M116 190 C117 230, 119 270, 119 295 L120 345"
              stroke="url(#bodyGradient)"
              strokeWidth="13"
              strokeLinecap="round"
              opacity="0.75"
            />

            {/* Articulaciones Iluminadas */}
            <circle cx="81" cy="270" r="5" fill="#10B981" opacity="0.6" />
            <circle cx="119" cy="270" r="5" fill="#10B981" opacity="0.6" />
            <circle cx="56" cy="98" r="5" fill="#10B981" opacity="0.6" />
            <circle cx="144" cy="98" r="5" fill="#10B981" opacity="0.6" />
          </svg>

          {/* Puntos de Dolor Interactivos (Hotspots) en Posiciones Exactas */}
          {BODY_ZONES.map((zone) => {
            const isSelected = selectedZone.id === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => setSelectedZone(zone)}
                style={{
                  left: `${zone.pinX}%`,
                  top: `${zone.pinY}%`,
                  transform: "translate(-50%, -50%)",
                }}
                className={`absolute group z-20 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isSelected ? "scale-125" : "hover:scale-115"
                }`}
                aria-label={`Ver detalles de ${zone.name}`}
              >
                {/* Ondas concéntricas de pulso */}
                <span
                  className="absolute w-8 h-8 rounded-full animate-ping opacity-35"
                  style={{ backgroundColor: zone.color }}
                />
                <span
                  className="absolute w-6 h-6 rounded-full opacity-30"
                  style={{ backgroundColor: zone.color }}
                />

                {/* Botón Circular con Contador de Pacientes (Estilo de la Referencia) */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shadow-md border-2 border-white transition-all ${
                    isSelected
                      ? "text-white ring-2 ring-emerald-500/50"
                      : "text-white"
                  }`}
                  style={{ backgroundColor: zone.color }}
                >
                  +{zone.patientsCount}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tarjeta Inferior de Diagnóstico & Acción Rápida para la Zona Seleccionada */}
      <div className="relative z-10 bg-gray-50/90 rounded-2xl p-4 border border-gray-100 mt-2 transition-all">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: selectedZone.color }}
              />
              <span className="font-bold text-sm text-gray-900 leading-tight">
                {selectedZone.name}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {selectedZone.sub}
            </p>
          </div>

          {/* Badge Escala EVA de Dolor */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-800 shrink-0">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>EVA {selectedZone.avgEva}</span>
          </div>
        </div>

        {/* Terapia y Equipamiento Recomendado */}
        <div className="mt-3 pt-2.5 border-t border-gray-200/70 grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="text-gray-400 block font-medium">Tratamiento Clínico</span>
            <span className="font-semibold text-gray-800 truncate block">
              {selectedZone.therapy}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block font-medium">Aparatología en Box</span>
            <span className="font-semibold text-emerald-800 truncate block">
              {selectedZone.equipment}
            </span>
          </div>
        </div>

        {/* Botón de Acción Directa */}
        <button
          onClick={() => {
            alert(`Filtrando expedientes de: ${selectedZone.name}`);
          }}
          className="mt-3 w-full py-2 px-3 rounded-xl bg-white hover:bg-emerald-50 text-[#0B3B32] border border-gray-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <span>Ver {selectedZone.patientsCount} pacientes en tratamiento activo</span>
          <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
        </button>
      </div>
    </div>
  );
}
