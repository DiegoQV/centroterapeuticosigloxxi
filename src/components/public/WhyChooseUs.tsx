"use client";

import React, { useState, useRef } from "react";
import { ArrowRight, Play, Pause, Sparkles } from "lucide-react";
import { clinicData } from "@/data/clinicData";
import ScrollReveal from "./ScrollReveal";

interface WhyChooseUsProps {
  onOpenBooking: (service?: string) => void;
}

export default function WhyChooseUs({ onOpenBooking }: WhyChooseUsProps) {
  const { whyChoose } = clinicData;
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F8FAF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Columna Izquierda: Video Clínico de Movilidad Activa con Animación Left */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="left" duration={800}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border-4 border-white group bg-slate-900">
                {/* Video en Bucle Continuo de Movilidad y Terapia Activa */}
                <video
                  ref={videoRef}
                  src="/videos/metodologia-movilidad.mp4"
                  poster="/images/foto-animar-banda-elastica.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Gradiente sutil inferior para legibilidad y elegancia */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Distintivo Superior: Sesión Activa */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/60 text-[#0B3B32] text-xs font-sans font-semibold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Movilidad Activa en Consulta</span>
                </div>

                {/* Control de Reproducción / Pausa en esquina inferior derecha */}
                <div className="absolute bottom-4 right-4 z-10">
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    title={isPlaying ? "Pausar animación" : "Reproducir animación"}
                    aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Badge Inferior Flotante: Enfoque Terapéutico */}
                <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 text-white/90 text-[11px] font-sans">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Recuperación funcional 1 a 1 sin fármacos</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Columna Derecha: Editorial Garamond & Pilares del Método con Animación */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <ScrollReveal direction="right" duration={750} className="w-full">
              {/* Tag */}
              <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase mb-2.5 font-sans">
                {whyChoose.tag}
              </span>

              {/* Gran Titular */}
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-bold text-[#111111] tracking-tight leading-[1.12] mb-5">
                No solo aliviamos el dolor: <br />
                <span className="text-[#0B3B32]">recuperamos tu movilidad.</span>
              </h2>

              {/* Subtítulo */}
              <p className="text-base md:text-lg text-gray-800 font-medium leading-relaxed mb-6 font-sans">
                {whyChoose.description}
              </p>
            </ScrollReveal>

            {/* 4 Pilares del Método Clínico con Stagger */}
            <div className="space-y-4 mb-8 w-full font-sans">
              {whyChoose.details.map((item, idx) => (
                <ScrollReveal
                  key={idx}
                  direction="up"
                  delay={100 + idx * 80}
                  duration={600}
                >
                  <div className="border-l-2 border-emerald-600 pl-4 py-0.5 hover:border-emerald-400 transition-colors">
                    <h4 className="font-sans font-bold text-sm sm:text-base text-[#111111]">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700 font-medium mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Botón y Badge de Rigor */}
            <ScrollReveal direction="up" delay={450} className="w-full">
              <div className="flex flex-wrap items-center justify-between gap-4 w-full pt-2">
                <button
                  onClick={() => onOpenBooking("Valoración Biomecánica")}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#0B3B32] bg-[#0B3B32] text-white hover:bg-white hover:text-[#0B3B32] font-bold text-xs sm:text-sm px-7 py-3.5 transition-all shadow-sm font-sans cursor-pointer hover:shadow-lg"
                >
                  <span>{whyChoose.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-emerald-950/10 shadow-xs font-sans">
                  <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800 flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-[#0B3B32] leading-tight">
                      {whyChoose.clinicalBadge}
                    </div>
                    <div className="text-[11px] text-gray-600 font-medium">
                      Atención sin prisas en Chachapoyas
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
