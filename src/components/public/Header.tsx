"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import PatientPortalModal from "./PatientPortalModal";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalModalOpen, setPortalModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F0F4F1]/90 backdrop-blur-md border-b border-zinc-200/50 transition-all">
        <div className="h-20 sm:h-24 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
          
          {/* Logo Oficial del Centro Terapéutico Siglo XXI */}
          <Link
            href="/"
            className="relative flex items-center group shrink-0 py-1 cursor-pointer"
            aria-label="Ir al inicio - Centro Terapéutico Siglo XXI"
          >
            <div className="relative h-[42px] sm:h-[50px] lg:h-[57px] w-auto aspect-[1097/320] transition-transform duration-300 ease-out group-hover:scale-[1.02]">
              <img
                src="/logo.png"
                alt="Centro Terapéutico Siglo XXI - Rehabilitación y Bienestar"
                className="h-full w-auto object-contain select-none"
                loading="eager"
              />
            </div>
          </Link>

          {/* Menú de navegación centrado */}
          <nav className="hidden lg:flex items-center justify-center gap-7 xl:gap-8 font-inter text-[15px] font-medium text-[#18181b]/80">
            <a
              href="#especialidades"
              className="hover:text-[#18181b] transition-colors py-1 hover:opacity-100"
            >
              Servicios
            </a>
            <a
              href="#metodologia"
              className="hover:text-[#18181b] transition-colors py-1 hover:opacity-100"
            >
              Metodología
            </a>
            <a
              href="#equipamiento"
              className="hover:text-[#18181b] transition-colors py-1 hover:opacity-100"
            >
              Equipamiento
            </a>
            <a
              href="#equipo"
              className="hover:text-[#18181b] transition-colors py-1 hover:opacity-100"
            >
              Cuerpo clínico
            </a>
            <a
              href="#ubicacion"
              className="hover:text-[#18181b] transition-colors py-1 hover:opacity-100"
            >
              Ubicación
            </a>
          </nav>

          {/* Botones de cabecera: Portal Pacientes + agendar cita → */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPortalModalOpen(true)}
              className="hidden md:inline-flex items-center justify-center text-[13.5px] sm:text-[14px] font-inter font-medium text-[#18181b] bg-white/80 hover:bg-[#EAF5EE] border border-zinc-300/85 hover:border-[#38C666]/40 px-5 py-2.5 rounded-full transition-all duration-200 shadow-2xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[#18181b]"
            >
              portal paciente
            </button>
            <a
              href="#agendar"
              className="hidden sm:inline-flex items-center gap-2 bg-[#18181b] hover:bg-black text-white font-inter text-[14.5px] font-medium px-6 py-2.5 rounded-full transition-all hover:scale-[1.02] shadow-2xs"
            >
              <span>agendar cita</span>
              <span className="text-base leading-none">→</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#18181b] hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu List under the bar */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200/50 bg-[#F0F4F1] px-6 py-5 space-y-4 shadow-xl animate-in fade-in duration-150">
            <nav className="flex flex-col space-y-3 font-inter text-[15px] text-[#18181b]/85">
              <a
                href="#especialidades"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#18181b]"
              >
                Servicios
              </a>
              <a
                href="#metodologia"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#18181b]"
              >
                Metodología
              </a>
              <a
                href="#equipamiento"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#18181b]"
              >
                Equipamiento
              </a>
              <a
                href="#equipo"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#18181b]"
              >
                Cuerpo clínico
              </a>
              <a
                href="#ubicacion"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#18181b]"
              >
                Ubicación
              </a>
            </nav>

            <div className="pt-3 border-t border-zinc-200/60 flex flex-col gap-2.5">
              <a
                href="#agendar"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-[#18181b] text-white font-inter text-[14px] font-medium py-3 rounded-full shadow-2xs"
              >
                <span>agendar cita</span>
                <span>→</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setPortalModalOpen(true);
                }}
                className="w-full inline-flex items-center justify-center py-2.5 text-xs font-inter font-medium text-[#18181b] bg-white/80 border border-zinc-300/85 rounded-full shadow-2xs hover:bg-[#EAF5EE] transition-colors"
              >
                portal paciente
              </button>
            </div>
          </div>
        )}
      </header>

      <PatientPortalModal
        isOpen={portalModalOpen}
        onClose={() => setPortalModalOpen(false)}
      />
    </>
  );
}
