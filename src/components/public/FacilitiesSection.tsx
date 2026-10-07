"use client";

import React, { useState } from "react";
import { Clock, ShieldCheck, Activity, Check, ArrowRight } from "lucide-react";
import { clinicData } from "@/data/clinicData";
import ScrollReveal from "./ScrollReveal";

interface FacilitiesSectionProps {
  onOpenBooking: (service?: string) => void;
}

export default function FacilitiesSection({ onOpenBooking }: FacilitiesSectionProps) {
  const { facilities } = clinicData;
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const tabs = facilities.tabs || [];
  const current = tabs[activeTabIdx] || tabs[0];

  const getSpecIcon = (iconName: string) => {
    switch (iconName) {
      case "Clock":
        return <Clock className="w-3.5 h-3.5 text-emerald-700" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-emerald-700" />;
    }
  };

  return (
    <section id="facilities" className="py-20 lg:py-28 bg-[#F6F9F8] relative overflow-hidden">
      {/* Luces difusas de fondo */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-emerald-200/35 via-teal-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-0"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Centrado Editorial con Animación */}
        <ScrollReveal direction="up" duration={700}>
          <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-10 md:mb-14">
            <span className="text-xs font-bold text-emerald-900 tracking-[0.2em] uppercase mb-2 block font-sans">
              {facilities.tag}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight leading-[1.12] mt-2">
              {facilities.title}
            </h2>
            <p className="mt-3 text-base md:text-lg text-gray-800 font-medium max-w-3xl mx-auto leading-relaxed font-sans">
              {facilities.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Selector de Pestañas Flotantes (Tabs) con Animación */}
        <ScrollReveal direction="up" delay={150} duration={650}>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-14 font-sans">
            {tabs.map((tab, idx) => {
              const isActive = idx === activeTabIdx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabIdx(idx)}
                  className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#0B3B32] text-white shadow-lg shadow-emerald-950/20 scale-[1.03] ring-1 ring-[#0B3B32]"
                      : "bg-white/90 hover:bg-white text-gray-800 hover:text-[#0B3B32] border border-gray-200 shadow-xs hover:shadow-md hover:border-emerald-300"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      isActive
                        ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
                        : "bg-emerald-600"
                    }`}
                  />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Detalle Asimétrico del Equipo Seleccionado */}
        {current && (
          <div
            key={current.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
          >
            {/* Bloque Izquierdo: Imagen con máscara orgánica asimétrica */}
            <ScrollReveal direction="scale" delay={250} duration={750} className="lg:col-span-6 relative">
              <div
                aria-hidden="true"
                className="absolute -top-6 -left-6 w-64 h-64 sm:w-80 sm:h-80 bg-emerald-300/25 rounded-full blur-3xl pointer-events-none -z-10"
              />

              <div
                className="relative w-full aspect-[4/3] lg:aspect-[5/4] organic-equipment-mask overflow-hidden shadow-2xl shadow-emerald-950/12 border border-emerald-900/10 group animate-motion-image bg-gray-100"
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    if (current.remoteImage && e.currentTarget.src !== current.remoteImage) {
                      e.currentTarget.src = current.remoteImage;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/25 via-transparent to-transparent pointer-events-none" />
              </div>
            </ScrollReveal>

            {/* Bloque Derecho: Ficha Técnica Editorial */}
            <ScrollReveal direction="right" delay={300} duration={750} className="lg:col-span-6 flex flex-col justify-center lg:pl-4 xl:pl-8 space-y-6 sm:space-y-7">
              {/* 1. Categoría Clínica */}
              <div className="animate-motion-fade-up">
                <span className="inline-flex items-center gap-2 text-[11px] font-extrabold text-emerald-900 tracking-[0.22em] uppercase font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  {current.category}
                </span>
              </div>

              {/* 2. Título Editorial Garamond */}
              <div className="animate-motion-fade-up stagger-1">
                <h3 className="font-serif text-3xl sm:text-[38px] lg:text-[42px] xl:text-5xl font-semibold text-[#111111] tracking-tight leading-[1.12]">
                  {current.title}
                </h3>
              </div>

              {/* 3. Explicación */}
              <div className="animate-motion-fade-up stagger-2">
                <p className="text-base sm:text-lg text-gray-800 font-normal leading-relaxed font-sans max-w-xl">
                  {current.description}
                </p>
              </div>

              {/* 4. Especificaciones Clínicas */}
              <div className="animate-motion-fade-up stagger-3">
                <div className="flex flex-wrap items-center gap-5 sm:gap-7 py-3 border-y border-emerald-950/10 font-sans">
                  {(current.specs || []).map((sp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-800"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-100/90 flex items-center justify-center flex-shrink-0 text-emerald-800 shadow-2xs">
                        {getSpecIcon(sp.icon)}
                      </span>
                      <span>{sp.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Indicaciones Clínicas */}
              <div className="animate-motion-fade-up stagger-4 pt-1">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-gray-900 block mb-3.5 font-sans">
                  {current.indicationsTitle}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                  {(current.indications || []).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#0B3B32]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Nota y Botón de Acción */}
              <div className="animate-motion-fade-up stagger-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-4 font-sans">
                <div className="flex items-center gap-2 text-xs text-gray-800 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>{current.footerNote}</span>
                </div>

                <button
                  onClick={() => onOpenBooking(`Consulta sobre ${current.name}`)}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0B3B32] hover:bg-[#072B24] text-white text-xs sm:text-sm font-bold px-8 py-4 rounded-full shadow-lg shadow-emerald-950/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  <span>{current.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>
    </section>
  );
}
