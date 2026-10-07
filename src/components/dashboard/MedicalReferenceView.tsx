"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutGrid,
  Heart,
  MessageSquare,
  FileText,
  User,
  Moon,
  Sun,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Droplet,
  Activity,
  Calendar,
  Thermometer,
  Zap,
} from "lucide-react";

interface Doctor {
  name: string;
  avatar: string;
}

const DOCTORS: Doctor[] = [
  { name: "Dr. Hazem Ragheb", avatar: "HR" },
  { name: "Dr. Rania Salem", avatar: "RS" },
  { name: "Dr. Samy El-Adl", avatar: "SE" },
];

export default function MedicalReferenceView() {
  // Toggle entre Screen 1 ("heart") y Screen 2 ("body") de la imagen de referencia
  const [activeTab, setActiveTab] = useState<"heart" | "body">("heart");
  const [selectedBodyPart, setSelectedBodyPart] = useState<number>(1); // 1 = Heart activo por defecto
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>("chest");

  return (
    <div className="min-h-[860px] bg-[#F1F4F9] text-slate-800 font-sans p-3 sm:p-5 lg:p-6 rounded-[32px] select-none">
      {/* Marco Exterior Estilo Ventana de la Referencia */}
      <div className="flex flex-col lg:flex-row gap-5 items-stretch">
        
        {/* DOCK VERTICAL IZQUIERDO (Idéntico a la imagen) */}
        <aside className="w-full lg:w-16 bg-transparent flex lg:flex-col items-center justify-between py-2 lg:py-4 shrink-0">
          <div className="flex lg:flex-col items-center gap-6">
            {/* Logo M+ en Cuadrado Suave */}
            <div className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center font-extrabold text-slate-900 text-lg border border-slate-200/60">
              M<span className="text-[#1E6BFF] text-sm -mt-1">+</span>
            </div>

            {/* Píldora Flotante con Iconos de Navegación */}
            <nav className="bg-white rounded-3xl p-1.5 shadow-sm border border-slate-200/60 flex lg:flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("body")}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  activeTab === "body"
                    ? "bg-[#1E6BFF] text-white shadow-md shadow-blue-500/30"
                    : "text-slate-400 hover:text-slate-700 hover:bg-slate-50"
                }`}
                title="Dashboard General (Vista Corporal)"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("heart")}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  activeTab === "heart"
                    ? "bg-[#1E6BFF] text-white shadow-md shadow-blue-500/30"
                    : "text-slate-400 hover:text-slate-700 hover:bg-slate-50"
                }`}
                title="My Heart (Vista Biomecánica)"
              >
                <Heart className="w-4 h-4" />
              </button>

              <Link
                href="/pacientes"
                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
                title="Mensajes / Pacientes"
              >
                <MessageSquare className="w-4 h-4" />
              </Link>

              <Link
                href="/agenda"
                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
                title="Expedientes / Agenda"
              >
                <FileText className="w-4 h-4" />
              </Link>

              <Link
                href="/admin"
                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
                title="Perfil / Administración"
              >
                <User className="w-4 h-4" />
              </Link>
            </nav>
          </div>

          {/* Toggle Inferior Modo Oscuro / Claro */}
          <div className="bg-white rounded-2xl p-1 shadow-sm border border-slate-200/60 hidden lg:flex flex-col items-center gap-1">
            <button
              type="button"
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <Moon className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-700 bg-slate-100 transition-colors cursor-pointer"
            >
              <Sun className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* CONTENEDOR PRINCIPAL */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* HEADER SUPERIOR (Búsqueda, Notificación, Avatar) */}
          <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {activeTab === "heart" ? "My Heart" : "Welcome Back, Mo!"}
            </h1>

            <div className="flex items-center gap-3">
              {/* Barra de Búsqueda Pill */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-44 sm:w-56 h-10 pl-4 pr-9 rounded-full bg-white border border-slate-200/70 text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#1E6BFF]/20 shadow-xs"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>

              {/* Campana de Notificación */}
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white border border-slate-200/70 shadow-xs flex items-center justify-center text-slate-600 relative hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2.5 right-2.5 ring-2 ring-white" />
              </button>

              {/* Avatar de Usuario */}
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0 bg-slate-200">
                <div className="w-full h-full bg-[#1E6BFF] text-white flex items-center justify-center font-bold text-xs">
                  DR
                </div>
              </div>
            </div>
          </header>

          {/* ========================================================= */}
          {/* VISTA 1: SCREEN SUPERIOR DE LA IMAGEN ("My Heart")        */}
          {/* ========================================================= */}
          {activeTab === "heart" && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              
              {/* LADO IZQUIERDO (7 columnas): Metrics 2x2 + Schedule + Body Condition */}
              <div className="xl:col-span-7 space-y-6">
                
                {/* FILA SUPERIOR: Heart Conditions (2x2) + My Schedule */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                  
                  {/* Heart Conditions (7 cols md) */}
                  <div className="md:col-span-7 space-y-3">
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-[#1E6BFF] font-black text-sm leading-none">•</span>
                      <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                        Heart Conditions
                      </h3>
                    </div>

                    {/* Rejilla 2x2 de Tarjetas */}
                    <div className="grid grid-cols-2 gap-3">
                      
                      {/* Tarjeta 1: Blood Status */}
                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between">
                        <div>
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-2">
                            <Droplet className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium block">
                            Blood Status
                          </span>
                          <span className="text-sm font-bold text-slate-900 block mt-0.5">
                            116/70
                          </span>
                        </div>

                        {/* Mini Gráfico de Barras con Indicador */}
                        <div className="mt-4 pt-2 border-t border-slate-50 flex items-end justify-between gap-1 h-9">
                          {[30, 60, 45, 80, 50, 90, 65].map((h, i) => (
                            <div
                              key={i}
                              style={{ height: `${h}%` }}
                              className={`w-1.5 rounded-full ${
                                i === 4 ? "bg-[#1E6BFF]" : "bg-slate-200"
                              }`}
                            />
                          ))}
                          <span className="text-[9px] font-mono text-slate-400 ml-1">
                            116/70
                          </span>
                        </div>
                      </div>

                      {/* Tarjeta 2: Blood Status (Solid Electric Blue en la Referencia) */}
                      <div className="bg-[#1E6BFF] text-white rounded-2xl p-4 shadow-md shadow-blue-500/20 flex flex-col justify-between">
                        <div>
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white mb-2">
                            <Heart className="w-4 h-4 fill-white" />
                          </div>
                          <span className="text-[10px] text-blue-100 font-medium block">
                            Blood Status
                          </span>
                          <span className="text-sm font-bold text-white block mt-0.5">
                            116/70
                          </span>
                        </div>

                        {/* Onda ECG y 120 bpm */}
                        <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between">
                          <svg className="w-16 h-6 stroke-white fill-none" viewBox="0 0 64 24">
                            <path
                              d="M0 12 L15 12 L20 4 L26 20 L32 8 L37 15 L42 12 L64 12"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-[10px] font-bold text-white">
                            120 bpm
                          </span>
                        </div>
                      </div>

                      {/* Tarjeta 3: Blood Count */}
                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between">
                        <div>
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-2">
                            <Activity className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium block">
                            Blood Count
                          </span>
                          <span className="text-sm font-bold text-slate-900 block mt-0.5">
                            80-90
                          </span>
                        </div>

                        {/* Onda suave */}
                        <div className="mt-4 pt-2 border-t border-slate-50 flex items-center justify-between">
                          <svg className="w-16 h-5 stroke-slate-300 fill-none" viewBox="0 0 64 20">
                            <path
                              d="M0 10 Q16 2, 32 10 T64 10"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="text-[9px] font-mono text-slate-400">
                            80/90
                          </span>
                        </div>
                      </div>

                      {/* Tarjeta 4: Blood Status */}
                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between">
                        <div>
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-2">
                            <Zap className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium block">
                            Blood Status
                          </span>
                          <span className="text-sm font-bold text-slate-900 block mt-0.5">
                            116/70
                          </span>
                        </div>

                        {/* Onda suave con 230/ml */}
                        <div className="mt-4 pt-2 border-t border-slate-50 flex items-center justify-between">
                          <svg className="w-16 h-5 stroke-slate-300 fill-none" viewBox="0 0 64 20">
                            <path
                              d="M0 12 C16 4, 32 16, 48 8 L64 10"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="text-[9px] font-mono text-slate-400">
                            230 /ml
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* My Schedule (5 cols md) */}
                  <div className="md:col-span-5 space-y-3 flex flex-col">
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-[#1E6BFF] font-black text-sm leading-none">•</span>
                      <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                        My Schedule
                      </h3>
                    </div>

                    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-100 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Cabecera de Próxima Cita */}
                        <div className="flex items-start gap-2.5 pb-3 border-b border-slate-100">
                          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                            <Calendar className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 font-medium block">
                              Next CheckUp
                            </span>
                            <span className="text-xs font-bold text-slate-900 block">
                              Fri, 24 Mar
                            </span>
                          </div>
                        </div>

                        {/* Stepper de Fecha */}
                        <div className="flex items-center justify-between my-3 px-1 text-xs">
                          <button type="button" className="text-slate-400 hover:text-slate-700 cursor-pointer">
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-semibold text-slate-700 text-[11px]">
                            20-March-23
                          </span>
                          <button type="button" className="text-slate-400 hover:text-slate-700 cursor-pointer">
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Lista de Doctores */}
                        <div className="space-y-2.5 my-2">
                          {DOCTORS.map((doc, idx) => (
                            <div key={idx} className="flex items-center gap-2.5">
                              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-[9px] flex items-center justify-center shrink-0">
                                {doc.avatar}
                              </div>
                              <span className="text-xs font-semibold text-slate-800 truncate">
                                {doc.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Botón Principal Solid Blue "Consult Now →" */}
                      <Link
                        href="/agenda"
                        className="mt-4 w-full py-2.5 px-4 rounded-xl bg-[#1E6BFF] hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        <span>Consult Now</span>
                        <span className="text-sm">→</span>
                      </Link>
                    </div>
                  </div>

                </div>

                {/* FILA INFERIOR: My Body Condition con Carrusel de Órganos 3D */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[#1E6BFF] font-black text-sm leading-none">•</span>
                      <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                        My Body Condition
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 text-slate-400">
                      <button type="button" className="hover:text-slate-700 p-1 cursor-pointer">
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="hover:text-slate-700 p-1 cursor-pointer">
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 4 Tarjetas de Órganos en 3D */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    
                    {/* 1. Brain */}
                    <div
                      onClick={() => setSelectedBodyPart(0)}
                      className={`bg-white rounded-2xl p-3.5 shadow-sm border transition-all cursor-pointer flex flex-col items-center justify-between aspect-square ${
                        selectedBodyPart === 0 ? "ring-2 ring-[#1E6BFF]" : "border-slate-100"
                      }`}
                    >
                      <div className="relative w-20 h-20">
                        <Image
                          src="/images/medical/brain-3d.jpg"
                          alt="Brain 3D"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600">
                        Neuromotor
                      </span>
                    </div>

                    {/* 2. Heart (Activo con Etiqueta y Flecha Azul) */}
                    <div
                      onClick={() => setSelectedBodyPart(1)}
                      className="bg-white rounded-2xl p-3.5 shadow-sm border-2 border-[#1E6BFF] transition-all cursor-pointer flex flex-col items-center justify-between aspect-square relative"
                    >
                      <div className="relative w-20 h-20">
                        <Image
                          src="/images/medical/heart-3d.jpg"
                          alt="Heart 3D"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="w-full flex items-center justify-between pt-1">
                        <span className="text-[11px] font-bold text-slate-900">
                          My Heart
                        </span>
                        <div className="w-4 h-4 rounded-full bg-[#1E6BFF] text-white flex items-center justify-center">
                          <ArrowUpRight className="w-2.5 h-2.5" />
                        </div>
                      </div>
                    </div>

                    {/* 3. Cell / Erythrocyte */}
                    <div
                      onClick={() => setSelectedBodyPart(2)}
                      className={`bg-white rounded-2xl p-3.5 shadow-sm border transition-all cursor-pointer flex flex-col items-center justify-between aspect-square ${
                        selectedBodyPart === 2 ? "ring-2 ring-[#1E6BFF]" : "border-slate-100"
                      }`}
                    >
                      <div className="relative w-20 h-20">
                        <Image
                          src="/images/medical/cell-3d.jpg"
                          alt="Cell 3D"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600">
                        Hemoglobina
                      </span>
                    </div>

                    {/* 4. Torso / Mannequin */}
                    <div
                      onClick={() => setSelectedBodyPart(3)}
                      className={`bg-white rounded-2xl p-3.5 shadow-sm border transition-all cursor-pointer flex flex-col items-center justify-between aspect-square ${
                        selectedBodyPart === 3 ? "ring-2 ring-[#1E6BFF]" : "border-slate-100"
                      }`}
                    >
                      <div className="relative w-20 h-20">
                        <Image
                          src="/images/medical/torso-3d.jpg"
                          alt="Torso 3D"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600">
                        Raquis & Core
                      </span>
                    </div>

                  </div>
                </div>

              </div>

              {/* LADO DERECHO (5 columnas): Plato Circular 3D con Gran Corazón + Card Flotante */}
              <div className="xl:col-span-5 flex flex-col items-center justify-center relative min-h-[460px] py-4">
                
                {/* Doble Plato Circular Concéntrico en Perspectiva 3D */}
                <div className="relative w-[340px] sm:w-[400px] h-[340px] sm:h-[400px] rounded-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex items-center justify-center border border-slate-100/80">
                  <div className="w-[280px] sm:w-[320px] h-[280px] sm:h-[320px] rounded-full bg-slate-50/70 border border-slate-100 flex items-center justify-center">
                    
                    {/* Render 3D del Corazón en Alta Resolución */}
                    <div className="relative w-[240px] sm:w-[280px] h-[240px] sm:h-[280px] -mt-4 drop-shadow-2xl">
                      <Image
                        src="/images/medical/heart-3d.jpg"
                        alt="Anatomical 3D Heart"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>

                  </div>
                </div>

                {/* Tarjeta Flotante en la Esquina Inferior Derecha (Idéntica a la Referencia) */}
                <div className="absolute bottom-6 right-2 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-white flex flex-col gap-1 w-44 z-20">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <Heart className="w-3.5 h-3.5 text-[#1E6BFF] fill-[#1E6BFF]" />
                    <span>Heart Rate</span>
                  </div>

                  <span className="font-sans font-extrabold text-xl text-slate-900 leading-none my-1">
                    120 <span className="text-xs font-normal text-slate-400">bpm</span>
                  </span>

                  {/* Onda ECG azul viva */}
                  <svg className="w-full h-7 stroke-[#1E6BFF] fill-none" viewBox="0 0 100 24">
                    <path
                      d="M0 12 L20 12 L28 4 L36 20 L44 8 L52 16 L60 12 L100 12"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* VISTA 2: SCREEN INFERIOR DE LA IMAGEN ("Welcome Back, Mo!") */}
          {/* ========================================================= */}
          {activeTab === "body" && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
              
              {/* LADO IZQUIERDO (7 columnas): 3 Metric Cards + Large Heart Rate Chart */}
              <div className="xl:col-span-7 space-y-6">
                
                {/* SECCIÓN • DashBoard */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[#1E6BFF] font-black text-sm leading-none">•</span>
                    <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                      DashBoard
                    </h3>
                  </div>

                  {/* 3 Tarjetas de Métricas de la Referencia */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    
                    {/* 1. Temperature */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-36">
                      <div className="flex items-center justify-between">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                          <Thermometer className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">1.6%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium block">
                          Temperature
                        </span>
                        <div className="flex items-baseline justify-between mt-1">
                          <span className="text-2xl font-bold text-slate-900">36.6°</span>
                          {/* Radial rays icon */}
                          <div className="w-8 h-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-[9px] text-slate-400">
                            ☀
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Blood Sugar */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-36">
                      <div className="flex items-center justify-between">
                        <div className="w-7 h-7 rounded-full bg-[#1E6BFF] flex items-center justify-center text-white">
                          <Droplet className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">2.3%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium block">
                          Blood Sugar
                        </span>
                        <div className="flex items-end justify-between mt-2">
                          <div className="flex items-end gap-1 h-8">
                            {[40, 70, 50, 90, 60].map((h, i) => (
                              <div
                                key={i}
                                style={{ height: `${h}%` }}
                                className="w-1.5 rounded-full bg-slate-200"
                              />
                            ))}
                          </div>
                          <div className="px-2 py-1 rounded-full bg-[#1E6BFF] text-white text-[10px] font-bold">
                            120 <span className="font-normal opacity-80">/180</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. Blood Pressure */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between h-36">
                      <div className="flex items-center justify-between">
                        <div className="w-7 h-7 rounded-full bg-[#1E6BFF] flex items-center justify-center text-white">
                          <Activity className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">0.4%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-medium block">
                          Blood Pressure
                        </span>
                        <div className="flex items-end justify-between mt-2">
                          <svg className="w-14 h-6 stroke-[#1E6BFF] fill-none" viewBox="0 0 56 24">
                            <path
                              d="M0 12 L14 12 L20 4 L26 20 L32 10 L38 14 L56 12"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="px-2 py-1 rounded-full bg-[#1E6BFF] text-white text-[10px] font-bold">
                            80 <span className="font-normal opacity-80">/120</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* SECCIÓN • Heart Rate (Gran Gráfico de Barras con Rango Horario) */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-[#1E6BFF] font-black text-sm leading-none">•</span>
                    <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                      Heart Rate
                    </h3>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="text-center mb-6">
                      <span className="text-4xl font-extrabold text-slate-900 block leading-none">
                        92
                      </span>
                      <span className="text-xs font-medium text-slate-400 block mt-1">
                        Avg bpm
                      </span>
                    </div>

                    {/* Gráfico de Barras de Rango de la Referencia (9:00 a 15:00) */}
                    <div className="flex items-end justify-between gap-3 h-36 px-4 pt-2 border-b border-slate-100 pb-3">
                      {[
                        { time: "9:00", min: 30, max: 75, active: true },
                        { time: "10:00", min: 45, max: 85, active: false },
                        { time: "11:00", min: 25, max: 65, active: false },
                        { time: "12:00", min: 40, max: 90, active: true },
                        { time: "13:00", min: 35, max: 70, active: false },
                        { time: "14:00", min: 50, max: 80, active: true },
                        { time: "15:00", min: 30, max: 60, active: false },
                      ].map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center h-full justify-end">
                          <div className="w-2 rounded-full h-full relative flex items-center justify-center">
                            {/* Barra de Rango Discontinua */}
                            <div
                              style={{
                                height: `${bar.max - bar.min}%`,
                                bottom: `${bar.min}%`,
                              }}
                              className={`w-full rounded-full absolute transition-all ${
                                bar.active ? "bg-[#1E6BFF]" : "bg-slate-300"
                              }`}
                            />
                          </div>
                          <span className="text-[10px] text-slate-400 mt-2 font-mono">
                            {bar.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* LADO DERECHO (5 columnas): Maniquí 3D Completo con Nodos Interactivos */}
              <div className="xl:col-span-5 flex flex-col items-center justify-center relative min-h-[500px]">
                
                {/* Fondo Circular Suave */}
                <div className="relative w-full max-w-[340px] aspect-2/3 flex items-center justify-center">
                  <Image
                    src="/images/medical/torso-3d.jpg"
                    alt="Anatomical 3D Torso"
                    fill
                    className="object-contain"
                    priority
                  />

                  {/* Nodos de Punto Azul Interactivos (Idénticos a la Referencia) */}
                  {[
                    { id: "chest", x: 74, y: 32, label: "Pectoral & Charnela" },
                    { id: "center", x: 60, y: 46, label: "Eje Core Transverso" },
                    { id: "left-flank", x: 42, y: 52, label: "Cuadrado Lumbar" },
                    { id: "right-flank", x: 76, y: 52, label: "Oblicuo Externo" },
                  ].map((dot) => (
                    <button
                      key={dot.id}
                      type="button"
                      onClick={() => setSelectedHotspot(dot.id)}
                      style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                      className="absolute group z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#1E6BFF]/30 animate-ping absolute -inset-1" />
                      <span className="w-4 h-4 rounded-full bg-[#1E6BFF] ring-4 ring-white shadow-md block" />
                    </button>
                  ))}

                  {/* Tarjeta Flotante Inferior: Oxygen Level 95% */}
                  <div className="absolute bottom-6 right-2 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_12px_30px_rgba(0,0,0,0.08)] border border-white flex flex-col gap-1 w-44 z-20">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-rose-500" />
                      <span>Oxygen Level</span>
                    </div>

                    <span className="font-sans font-extrabold text-xl text-slate-900 leading-none my-1">
                      95%
                    </span>

                    {/* Mini gráfico de barras azul */}
                    <div className="flex items-end gap-1 h-5 pt-1">
                      {[40, 60, 80, 50, 95, 70, 90].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className={`flex-1 rounded-full ${
                            i >= 4 ? "bg-[#1E6BFF]" : "bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
