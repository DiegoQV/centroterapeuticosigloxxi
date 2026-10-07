"use client";

import React, { useState, useEffect } from "react";

interface RecoveryArcGaugeProps {
  initialPercentage?: number;
}

export default function RecoveryArcGauge({
  initialPercentage = 82,
}: RecoveryArcGaugeProps) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPercentage(initialPercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [initialPercentage]);

  const cx = 120;
  const cy = 110;
  const radius = 80;
  const arcLength = Math.PI * radius; // ~251.32
  const strokeDashoffset = arcLength * (1 - percentage / 100);

  const angleRad = (Math.PI * percentage) / 100;
  const tipX = cx - radius * Math.cos(angleRad);
  const tipY = cy - radius * Math.sin(angleRad);

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs font-sans">
      {/* Encabezado con Punto Discreto */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-[#0B3B32] font-black text-sm leading-none">•</span>
          <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-900">
            Índice Biomecánico
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-500">+14° ROM</span>
      </div>

      {/* Arco Goniométrico Sobrio */}
      <div className="relative flex flex-col items-center justify-center my-3">
        <svg
          viewBox="0 0 240 130"
          className="w-full max-w-[200px] overflow-visible"
        >
          {/* Pista Base Neutra */}
          <path
            d="M 40 110 A 80 80 0 0 1 200 110"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Trazo Quirúrgico Institucional */}
          <path
            d="M 40 110 A 80 80 0 0 1 200 110"
            fill="none"
            stroke="#0B3B32"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
          />

          {/* Marcador Técnico */}
          {percentage > 0 && (
            <circle
              cx={tipX}
              cy={tipY}
              r="5.5"
              fill="#FFFFFF"
              stroke="#0B3B32"
              strokeWidth="2.5"
              className="transition-all duration-700 ease-out"
            />
          )}
        </svg>

        {/* Dato Central Protagonista */}
        <div className="absolute bottom-1 text-center">
          <span className="font-sans text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight block">
            {percentage}%
          </span>
          <span className="text-[11px] font-medium text-slate-500 block -mt-0.5">
            Rango Articular Ganado
          </span>
        </div>
      </div>

      {/* Contexto Clínico Subordinado (Sin Sub-Tarjeta) */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500">Objetivo para Alta</span>
        <span className="font-medium text-slate-800">
          18% restante · Fase 3
        </span>
      </div>
    </div>
  );
}
