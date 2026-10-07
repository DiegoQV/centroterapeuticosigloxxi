"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  Activity,
  ShieldCheck,
  Target,
  Timer,
} from "lucide-react";

export default function EquipmentShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  const equipments = [
    {
      id: "ecam-magnet",
      title: "Ecam Magnet",
      category: "Magnetoterapia Clínica",
      badge: "Campos Magnéticos Pulsados",
      safetyBadge: "100% Indoloro y Atérmico",
      image: "/equipment-magneto.jpg",
      alt: "Sesión de magnetoterapia computarizada Ecam Magnet en Centro Terapéutico Siglo XXI",
      desc: "Campos electromagnéticos que aceleran la regeneración de tejidos y desinflaman articulaciones profundas.",
      highlights: [
        { label: "20 a 30 min", icon: Timer },
        { label: "100% Indoloro", icon: ShieldCheck },
        { label: "Articular y óseo", icon: Target },
      ],
      indications: [
        "Artrosis y desgaste articular",
        "Dolor lumbar y cervical",
        "Edemas óseos y contusiones",
        "Recuperación post-inmovilización",
      ],
      icon: Activity,
    },
    {
      id: "tem-7000",
      title: "Tem 7000 (TENS)",
      category: "Electroestimulación Dosificada",
      badge: "Analgesia Digital Transcutánea",
      safetyBadge: "Estimulación Sensitiva Regulada",
      image: "/equipment-tens.jpg",
      alt: "Sesión de electroterapia digital TENS Tem 7000 en Centro Terapéutico Siglo XXI",
      desc: "Corrientes analgésicas reguladas que bloquean las señales de dolor y relajan la musculatura en espasmo.",
      highlights: [
        { label: "15 a 25 min", icon: Timer },
        { label: "Hormigueo suave", icon: ShieldCheck },
        { label: "Fibras sensitivas", icon: Target },
      ],
      indications: [
        "Contracturas musculares agudas",
        "Dolor ciático y lumbalgia",
        "Tensión cervical y sobrecarga",
        "Molestias musculares crónicas",
      ],
      icon: Zap,
    },
    {
      id: "percusion",
      title: "Terapia de Percusión",
      category: "Liberación Miofascial Mecánica",
      badge: "Terapia de Impacto Rítmico",
      safetyBadge: "Descarga Mecánica Dosificada",
      image: "/equipment-percussion.jpg",
      alt: "Terapia de percusión miofascial en Centro Terapéutico Siglo XXI",
      desc: "Impactos rítmicos controlados que penetran el vientre muscular para desactivar bandas tensas y contracturas.",
      highlights: [
        { label: "10 a 15 min", icon: Timer },
        { label: "Presión descontracturante", icon: ShieldCheck },
        { label: "Tejido muscular profundo", icon: Target },
      ],
      indications: [
        "Sobrecargas y fatiga deportiva",
        "Contracturas en espalda y piernas",
        "Bandas tensas en trapecios",
        "Rigidez por posturas prolongadas",
      ],
      icon: Target,
    },
  ];

  const current = equipments[activeTab];

  return (
    <section id="equipamiento" className="w-full pt-20 pb-16 lg:pt-28 lg:pb-24 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Encabezado Editorial Fuerte */}
        <div className="text-center max-w-4xl mx-auto mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0F4F1] border border-zinc-200/90 text-xs font-inter font-medium tracking-tight text-zinc-800 mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#38C666]" />
            <span>Tecnología Biomédica de Apoyo</span>
          </div>
          <h2 className="font-outfit font-semibold text-[32px] sm:text-[40px] lg:text-[46px] text-[#18181b] tracking-[-0.03em] leading-[1.08] mb-3.5 text-balance">
            Equipamiento especializado al servicio de tu bienestar.
          </h2>
          <p className="font-inter text-sm sm:text-base text-[#18181b]/75 max-w-4xl mx-auto leading-relaxed">
            Tecnología no invasiva y criterio clínico para modular el dolor y devolverte la función.
          </p>
        </div>

        {/* ============================================================ */}
        {/* SELECTOR INTERACTIVO DE TECNOLOGÍAS                          */}
        {/* ============================================================ */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {equipments.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-[13.5px] font-outfit font-semibold transition-all duration-200 cursor-pointer shadow-2xs ${
                  isActive
                    ? "bg-[#18181b] text-white shadow-xs scale-[1.02]"
                    : "bg-[#F0F4F1] text-[#18181b] hover:bg-[#EAF5EE] border border-zinc-200/80"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? "bg-[#38C666]" : "bg-zinc-400"
                  }`}
                />
                <Icon className="w-4 h-4 text-[#38C666]" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* ESCAPARATE MAESTRO (SPLIT SCREEN CON FOTO + FICHA RESUMIDA)  */}
        {/* ============================================================ */}
        <div className="bg-white rounded-3xl overflow-hidden border border-zinc-200/80 shadow-sm group">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Foto Panorámica Grande con Cross-fade y Badges Tecnológicos (7 cols) */}
            <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] bg-zinc-100 overflow-hidden">
              {equipments.map((item, index) => {
                const isSelected = index === activeTab;
                return (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                      isSelected ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-[1.01]"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                );
              })}
              
              {/* Badge superior de tecnología activa */}
              <div className="absolute top-5 left-5 z-10 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-outfit font-semibold text-[#18181b] shadow-xs border border-zinc-200/80 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38C666] animate-pulse" />
                <span>{current.badge}</span>
              </div>

              {/* Badge inferior de seguridad clínica personalizada */}
              <div className="absolute bottom-5 left-5 z-10 bg-[#0D2818]/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-inter font-medium shadow-xs flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#38C666]" />
                <span>{current.safetyBadge}</span>
              </div>
            </div>

            {/* Contenido Editorial Limpio & Directo (5 cols) */}
            <div
              key={current.id}
              className="lg:col-span-5 p-8 sm:p-10 lg:p-11 flex flex-col justify-between animate-in fade-in duration-200 bg-white"
            >
              <div>
                <span className="font-outfit font-bold text-xs text-[#38C666] uppercase tracking-wider block mb-2">
                  {current.category}
                </span>

                <h3 className="font-outfit font-semibold text-2xl sm:text-3xl lg:text-[34px] text-[#18181b] mb-3 leading-tight">
                  {current.title}
                </h3>

                <p className="font-inter text-sm sm:text-[15px] text-[#18181b]/75 leading-relaxed mb-6">
                  {current.desc}
                </p>

                {/* Micro-indicadores visuales limpios (reemplaza la caja densa) */}
                <div className="flex flex-wrap items-center gap-2 mb-7">
                  {current.highlights.map((h, i) => {
                    const HIcon = h.icon;
                    return (
                      <div
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F0F4F1] border border-zinc-200/70 text-xs font-inter font-medium text-zinc-800 shadow-2xs"
                      >
                        <HIcon className="w-3.5 h-3.5 text-[#38C666]" />
                        <span>{h.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Casos de Aplicación Habituales */}
                <div className="mb-6">
                  <span className="text-[11px] font-outfit font-semibold uppercase tracking-wider text-zinc-400 block mb-2.5">
                    Indicado habitualmente para:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {current.indications.map((ind, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF9F6] text-[#0D2818] border border-zinc-200/80 text-[11.5px] font-outfit font-medium"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#38C666]" />
                        <span>{ind}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón de Consulta y Conversión */}
              <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs text-zinc-500 font-inter">
                  Indicado tras evaluación clínica previa
                </span>
                <a
                  href="#agendar"
                  className="inline-flex items-center gap-2 bg-[#18181b] hover:bg-black text-white font-inter text-xs sm:text-[13px] font-medium px-5 py-2.5 rounded-full transition-all duration-200 shadow-2xs hover:scale-[1.02] group/btn cursor-pointer"
                >
                  <span>Consultar este equipo</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#38C666] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
