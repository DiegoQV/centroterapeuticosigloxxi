"use client";

import React from "react";
import { Star, ArrowRight } from "lucide-react";
import { clinicData } from "@/data/clinicData";
import ScrollReveal from "./ScrollReveal";

interface DoctorsSectionProps {
  onOpenBooking: (service?: string) => void;
}

export default function DoctorsSection({ onOpenBooking }: DoctorsSectionProps) {
  const { doctors } = clinicData;

  return (
    <section id="doctors" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header con Animación */}
        <ScrollReveal direction="up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 max-w-5xl mx-auto">
            <div className="max-w-2xl lg:max-w-3xl">
              <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2 block font-sans">
                {doctors.tag}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight leading-[1.12]">
                {doctors.titleLine1} <br className="hidden sm:inline" />
                <span>{doctors.titleLine2}</span>
              </h2>
              <p className="mt-3 text-base md:text-lg text-gray-700 font-normal leading-relaxed font-sans">
                {doctors.subtitle}
              </p>
            </div>

            <button
              onClick={() => onOpenBooking("Consulta con Especialista")}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors self-start md:self-auto font-sans underline underline-offset-4 cursor-pointer"
            >
              <span>{doctors.linkText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        {/* 3 Fichas de Especialistas con Stagger Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto justify-center">
          {doctors.list.map((doc, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={idx * 120}
              duration={650}
              className="h-full"
            >
              <div
                onClick={() => onOpenBooking(`Consulta con ${doc.name}`)}
                className="bg-[#F8FAF9] hover:bg-white rounded-2xl border border-gray-200/80 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between h-full transform hover:-translate-y-2"
              >
                {/* Foto */}
                <div className="aspect-[4/4] overflow-hidden bg-gray-100">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      if (doc.remoteImage && e.currentTarget.src !== doc.remoteImage) {
                        e.currentTarget.src = doc.remoteImage;
                      }
                    }}
                  />
                </div>

                {/* Información */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#111111] group-hover:text-[#0B3B32] transition-colors leading-tight">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-bold text-[#111111] mt-1 font-sans">
                      {doc.role}
                    </p>
                    <p className="text-xs text-emerald-800 font-bold mt-0.5 font-sans">
                      {doc.therapyRole}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-4 pt-3 border-t border-gray-200 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-bold text-[#111111] ml-0.5 font-sans">
                      {doc.rating}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
