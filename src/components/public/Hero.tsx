"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, User, Clock, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { clinicData } from "@/data/clinicData";

const heroSlides = [
  {
    id: 1,
    image: "/images/hero-1.png",
    alt: "Fisioterapeuta evaluando y realizando terapia manual de rodilla en Centro Terapéutico Siglo XXI",
  },
  {
    id: 2,
    image: "/images/hero-2.png",
    alt: "Fisioterapia con electroterapia y equipamiento biomédico avanzado en Centro Terapéutico Siglo XXI",
  },
  {
    id: 3,
    image: "/images/hero-3.png",
    alt: "Fisioterapeuta guiando ejercicios terapéuticos y readaptación motriz para paciente en Chachapoyas",
  },
];

interface HeroProps {
  onOpenBooking: (service?: string) => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const { hero } = clinicData;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case "User":
        return <User className="w-4 h-4 text-emerald-700" />;
      case "Clock":
        return <Clock className="w-4 h-4 text-emerald-700" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-emerald-700" />;
    }
  };

  return (
    <section
      id="home"
      className="public-hero relative min-h-[calc(100svh-69px)] w-full pt-10 pb-24 sm:pt-12 lg:pt-14 overflow-hidden flex items-center bg-[#F8FAF9]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Fondo con Carrusel de Imágenes Clínicas Auténticas */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="hero-image w-full h-full object-cover object-[78%_bottom] md:object-[72%_bottom] lg:object-center"
            />
          </div>
        ))}

        {/* Gradiente suave en la columna izquierda para legibilidad de textos */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/95 to-transparent md:from-[#F2FAF7] md:via-[#F2FAF7]/92 md:to-transparent lg:w-[68%]" />
      </div>

      {/* 2. Contenido Principal */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="hero-copy max-w-xl lg:max-w-2xl flex flex-col items-start">
          {/* Insignia Superior */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-gray-300 shadow-xs text-[10px] sm:text-[11px] font-extrabold text-[#0B3B32] tracking-wider mb-6 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>{hero.tag}</span>
          </div>

          {/* Gran Titular Editorial con estilo Garamond */}
          <h1 className="hero-title font-serif text-[42px] sm:text-[54px] md:text-[64px] lg:text-[72px] xl:text-[78px] font-extrabold text-[#0a0a0a] tracking-tight leading-[1.06] mb-6">
            {hero.titleLine1} <br />
            <span className="text-[#0B3B32]">{hero.titleLine2}</span> <br />
            {hero.titleLine3}
          </h1>

          {/* Bajada Descriptiva */}
          <p className="text-base sm:text-lg lg:text-[18px] text-gray-900 font-medium max-w-lg lg:max-w-xl leading-relaxed mb-8 font-sans">
            {hero.subtitle}
          </p>

          {/* Botones de Acción */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8 w-full sm:w-auto font-sans">
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 bg-[#0B3B32] hover:bg-[#072B24] text-white text-sm sm:text-[15px] font-bold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>{hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#services"
              className="inline-flex items-center justify-center bg-white/95 hover:bg-white text-[#111111] text-sm sm:text-[15px] font-bold px-8 py-3.5 rounded-full border-2 border-gray-300 hover:border-[#0B3B32] shadow-xs transition-all backdrop-blur-sm"
            >
              <span>{hero.ctaSecondary}</span>
            </a>
          </div>

          {/* Barra Compacta de 3 Métricas en Una Sola Línea */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 pt-4 border-t border-gray-300/80 w-full max-w-2xl font-sans">
            {hero.stats.map((st, idx) => (
              <div key={idx} className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[#0B3B32] flex-shrink-0">
                  {getStatIcon(st.icon)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-extrabold text-[#0B3B32] leading-tight truncate">
                    {st.value}
                  </div>
                  <div className="text-[10px] sm:text-[11.5px] text-gray-700 font-medium leading-tight">
                    {st.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controles de Navegación del Slider (Ubicados a la izquierda para evitar interferencia con el chatbot) */}
      <div className="absolute bottom-6 left-6 sm:left-8 lg:left-12 z-20 hidden md:flex items-center gap-2.5">
        <button
          onClick={prevSlide}
          className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-800 hover:text-[#0B3B32] flex items-center justify-center shadow-md border border-gray-200/80 backdrop-blur-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Indicadores de diapositiva */}
        <div className="flex items-center gap-1.5 px-1 bg-white/70 backdrop-blur-xs py-1.5 rounded-full border border-gray-200/60 shadow-xs">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentSlide
                  ? "w-4 bg-[#0B3B32]"
                  : "w-1.5 bg-gray-400/60 hover:bg-gray-600"
              }`}
              aria-label={`Ir a foto ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-800 hover:text-[#0B3B32] flex items-center justify-center shadow-md border border-gray-200/80 backdrop-blur-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Siguiente foto"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
