"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { clinicData } from "@/data/clinicData";

export default function Navbar() {
  const { nav } = clinicData;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 py-3.5 transition-all duration-200 ${
        isScrolled ? "shadow-md bg-white/95 backdrop-blur-md" : "shadow-xs"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Logo Oficial de Marca (2 Líneas - Isotipo + Tipografía) */}
          <Link href="#home" className="flex shrink-0 items-center group py-0.5" onClick={() => setMobileOpen(false)}>
            <img
              src="/brand/logo-official-2lines.png"
              alt="Centro Terapéutico Siglo XXI"
              className="h-10 sm:h-12 w-auto max-w-[190px] sm:max-w-none object-contain group-hover:scale-[1.02] transition-transform duration-200"
            />
          </Link>

          {/* Enlaces de Navegación de Escritorio */}
          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-5 xl:gap-8 font-sans">
            {nav.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="whitespace-nowrap text-sm font-bold text-[#111111] hover:text-[#0B3B32] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Accesos a los portales */}
          <div className="hidden lg:flex shrink-0 items-center gap-3 font-sans">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-xs font-bold text-[#0B3B32] px-4 py-2.5 rounded-full border border-[#0B3B32]/20 hover:bg-emerald-50 transition-colors"
              title="Acceso a la Suite Clínica y Administrativa"
            >
              <User className="w-3.5 h-3.5 text-gray-500" />
              <span>Acceso Clínico</span>
            </Link>

            <Link
              href="/acceder"
              className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap text-xs font-bold text-white px-4 py-2.5 rounded-full bg-[#0B3B32] hover:bg-[#072B24] transition-colors"
              title="Consultar tu pauta de ejercicios domiciliarios"
            >
              <span>Portal Paciente</span>
            </Link>

          </div>

          {/* Botón de Menú Móvil */}
          <div className="flex lg:hidden items-center font-sans">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 text-gray-700 hover:text-gray-900 cursor-pointer"
              aria-label="Alternar menú móvil"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {mobileOpen && (
        <div id="mobile-navigation" className="lg:hidden bg-white border-b border-gray-100 px-6 py-4 shadow-lg animate-in fade-in font-sans">
          <nav aria-label="Navegación móvil" className="flex flex-col space-y-3">
            {nav.links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-bold text-[#111111] hover:text-[#0B3B32] py-1"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-[#0B3B32] border border-[#0B3B32]/20 py-3 rounded-full hover:bg-emerald-50 transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Acceso Clínico</span>
              </Link>
              <Link
                href="/acceder"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#0B3B32] hover:bg-[#072B24] py-3 rounded-full transition-colors"
              >
                <span>Portal Paciente</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
