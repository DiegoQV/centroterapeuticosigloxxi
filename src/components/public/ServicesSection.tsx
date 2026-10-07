"use client";

import React from "react";
import {
  Activity,
  Dumbbell,
  HeartPulse,
  Bone,
  Brain,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import { clinicData } from "@/data/clinicData";

import ScrollReveal from "./ScrollReveal";

interface ServicesSectionProps {
  onOpenBooking: (service?: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity,
  Dumbbell,
  HeartPulse,
  Bone,
  Brain,
  UserCheck,
};

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  const { services } = clinicData;

  return (
    <section id="services" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado Centrado con animación Fade Up */}
        <ScrollReveal direction="up" duration={700}>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2 block font-sans">
              • {services.tag} •
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight leading-[1.12] mt-2">
              {services.title}
            </h2>
            <p className="mt-3 text-base md:text-lg text-gray-700 font-normal max-w-2xl mx-auto leading-relaxed font-sans">
              {services.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Cuadrícula Responsiva de 6 Afecciones con Revelación Escalonada (Staggered) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 my-10">
          {services.items.map((item, idx) => {
            const Icon = iconMap[item.icon] || Activity;
            return (
              <ScrollReveal
                key={item.id}
                direction="up"
                delay={idx * 75}
                duration={650}
                className="h-full"
              >
                <div className="group bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between overflow-hidden h-full transform hover:-translate-y-2">
                  {/* Contenedor de Imagen con zoom suave */}
                  <div className="h-44 w-full overflow-hidden relative bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        if (item.remoteImage && e.currentTarget.src !== item.remoteImage) {
                          e.currentTarget.src = item.remoteImage;
                        }
                      }}
                    />
                  </div>

                  {/* Badge circular flotante con ícono */}
                  <div className="-mt-6 relative z-10 mx-auto w-12 h-12 rounded-full bg-[#0B3B32] text-white flex items-center justify-center border-4 border-white shadow-md group-hover:bg-emerald-600 transition-colors duration-300">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  {/* Contenido textual */}
                  <div className="flex flex-col flex-grow text-center">
                    <h3 className="font-serif font-bold text-lg text-[#111111] group-hover:text-[#0B3B32] transition-colors text-center mt-3 px-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-700 font-medium text-center leading-relaxed px-3 py-2 flex-grow font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Enlace inferior de acción */}
                  <div className="pt-2 pb-5 text-center mt-auto">
                    <button
                      type="button"
                      onClick={() => onOpenBooking(item.therapyMatch || item.title)}
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#0B3B32] group-hover:text-emerald-700 uppercase tracking-wider transition-all font-sans cursor-pointer"
                    >
                      <span>Saber más</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Botón Inferior Principal con animación */}
        <ScrollReveal direction="up" delay={200}>
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => onOpenBooking("Consulta y Evaluación General")}
              className="inline-flex items-center gap-2 bg-[#0B3B32] hover:bg-[#072B24] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-xl hover:scale-[1.03] transition-all font-sans cursor-pointer"
            >
              <span>{services.linkText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
