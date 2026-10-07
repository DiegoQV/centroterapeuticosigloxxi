"use client";

import React from "react";

interface ClinicalParameter {
  id: string;
  label: string;
  value: string;
  context: string;
  status?: "alert" | "favorable" | "neutral";
}

const CLINICAL_PARAMETERS: ClinicalParameter[] = [
  {
    id: "alarm",
    label: "Movilidad Matutina",
    value: "06:30 AM",
    context: "Pauta raquídea al despertar en supino",
    status: "neutral",
  },
  {
    id: "sleep",
    label: "Descanso Nocturno",
    value: "8.2 hrs",
    context: "Fase REM y descarga discal vertebral",
    status: "neutral",
  },
  {
    id: "posture",
    label: "Higiene Postural",
    value: "Pausa 45m",
    context: "Descarga de charnela lumbosacra en sedestación",
    status: "neutral",
  },
  {
    id: "eva",
    label: "Percepción de Dolor (EVA)",
    value: "EVA 2/10",
    context: "-5 pts vs. ingreso inicial · Alivio significativo",
    status: "alert",
  },
  {
    id: "thermo",
    label: "Termoterapia en Box",
    value: "15 min",
    context: "Compresa húmedo-caliente previa a tracción",
    status: "neutral",
  },
  {
    id: "psychology",
    label: "Eje Biopsicosocial",
    value: "94% Ánimo",
    context: "Afrontamiento activo y alta adherencia",
    status: "favorable",
  },
];

export default function HabitMicroWidgets() {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs font-sans">
      {/* Encabezado de Módulo con Punto Discreto */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-[#0B3B32] font-black text-sm leading-none">•</span>
          <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-900">
            Parámetros Clínicos Diarios
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-500">Sesión 14/20</span>
      </div>

      {/* Lista Clínica Continua (De-carded con Divisores Finos de 1px) */}
      <div className="divide-y divide-slate-100 text-xs">
        {CLINICAL_PARAMETERS.map((param) => (
          <div
            key={param.id}
            className="py-3 first:pt-3 last:pb-0 flex items-start justify-between gap-3 group"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-slate-700 block truncate">
                  {param.label}
                </span>
                {param.status === "alert" && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"
                    title="Control analgésico activo"
                  />
                )}
                {param.status === "favorable" && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"
                    title="Evolución positiva"
                  />
                )}
              </div>
              <span className="text-[11px] text-slate-500 block truncate mt-0.5 font-normal">
                {param.context}
              </span>
            </div>

            <div className="text-right shrink-0">
              <span className="font-mono font-bold text-sm text-slate-900 block">
                {param.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
