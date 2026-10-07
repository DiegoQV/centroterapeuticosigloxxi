"use client";

import React from "react";
import { ArrowRight, CheckCircle, Calendar, UserCheck } from "lucide-react";
import { clinicData } from "@/data/clinicData";
import ScrollReveal from "./ScrollReveal";

interface TakeFirstStepBannerProps {
  onOpenBooking: (service?: string) => void;
}

export default function TakeFirstStepBanner({ onOpenBooking }: TakeFirstStepBannerProps) {
  const { bannerCta } = clinicData;

  return (
    <section className="py-14 sm:py-18 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Verde Quirúrgico */}
        <div className="bg-[#0B3B32] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Columna Izquierda con Animación Left */}
            <ScrollReveal direction="left" duration={750} className="lg:col-span-7 space-y-6">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/10 font-sans">
                {bannerCta.tag}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12]">
                {bannerCta.title}
              </h2>

              <p className="text-sm sm:text-base text-emerald-100/90 font-normal max-w-lg leading-relaxed font-sans">
                {bannerCta.subtitle}
              </p>

              <div>
                <button
                  onClick={() => onOpenBooking()}
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#0B3B32] font-bold text-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all font-sans cursor-pointer"
                >
                  <span>{bannerCta.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ScrollReveal>

            {/* Columna Derecha: Tarjeta de Reserva Rápida en 3 Pasos con Animación Right */}
            <ScrollReveal direction="right" duration={750} delay={150} className="lg:col-span-5">
              <div className="bg-white text-[#111111] rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20">
                <h3 className="font-serif text-lg font-bold text-[#111111] mb-5 pb-3 border-b border-gray-100 flex items-center justify-between">
                  <span>{bannerCta.quickBooking.title}</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full font-sans">
                    3 Pasos
                  </span>
                </h3>

                <div className="space-y-3 font-sans">
                  <div
                    onClick={() => onOpenBooking()}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 cursor-pointer transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-[#0B3B32]">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-[#111111]">
                        1. {bannerCta.quickBooking.steps[0]}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        Selecciona especialista o afección
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => onOpenBooking()}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 cursor-pointer transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-[#0B3B32]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-[#111111]">
                        2. {bannerCta.quickBooking.steps[1]}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        Elige turno mañana o tarde
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => onOpenBooking()}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 cursor-pointer transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-[#0B3B32]">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-[#111111]">
                        3. {bannerCta.quickBooking.steps[2]}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        Confirmación inmediata vía WhatsApp
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
