"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { clinicData } from "@/data/clinicData";

export default function Footer() {
  const { footer } = clinicData;

  return (
    <footer
      id="contact"
      className="relative bg-[#EDF7F3] text-[#111111] border-t border-emerald-900/10 overflow-hidden"
    >
      {/* 0. Filigrana Botánica Silueta Eucalipto/Olivo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F3F9F6] via-[#EDF7F3] to-[#E5F2EC]" />

        {/* Marca de agua botánica izquierda */}
        <svg
          className="absolute bottom-16 -left-8 sm:bottom-12 sm:left-0 w-72 sm:w-96 lg:w-[440px] h-auto text-[#0B3B32]/[0.06] select-none"
          viewBox="0 0 320 400"
          fill="currentColor"
        >
          <path
            d="M10,400 Q80,260 150,140 T230,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path d="M45,340 C10,330 -10,290 5,260 C25,270 50,305 45,340 Z" />
          <path d="M85,280 C130,270 160,230 155,195 C125,210 95,245 85,280 Z" />
          <path d="M95,230 C50,210 35,160 60,130 C80,150 100,195 95,230 Z" />
          <path d="M140,170 C190,150 215,105 205,75 C175,90 145,130 140,170 Z" />
          <path d="M155,130 C120,100 115,50 140,25 C155,50 165,95 155,130 Z" />
          <path d="M210,50 C240,25 255,-5 245,-25 C225,-10 205,20 210,50 Z" />
        </svg>

        {/* Marca de agua botánica superior derecha */}
        <svg
          className="hidden md:block absolute -top-12 -right-12 w-64 lg:w-80 h-auto text-[#0B3B32]/[0.04] rotate-180 select-none"
          viewBox="0 0 320 400"
          fill="currentColor"
        >
          <path
            d="M10,400 Q80,260 150,140 T230,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path d="M45,340 C10,330 -10,290 5,260 C25,270 50,305 45,340 Z" />
          <path d="M85,280 C130,270 160,230 155,195 C125,210 95,245 85,280 Z" />
          <path d="M95,230 C50,210 35,160 60,130 C80,150 100,195 95,230 Z" />
          <path d="M140,170 C190,150 215,105 205,75 C175,90 145,130 140,170 Z" />
          <path d="M155,130 C120,100 115,50 140,25 C155,50 165,95 155,130 Z" />
        </svg>
      </div>

      {/* 1. Sección Principal de 5 Columnas */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Columna 1: Marca, Misión e Íconos Sociales (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-3.5">
            <Link href="#home" className="inline-flex items-center group mb-1">
              <img
                src="/brand/logo-official-2lines.png"
                alt="Centro Terapéutico Siglo XXI"
                className="h-14 sm:h-16 w-auto object-contain group-hover:scale-[1.02] transition-transform duration-200"
              />
            </Link>

            <p className="font-serif font-bold text-sm text-[#0B3B32] leading-snug">
              &quot;{footer.tagline}&quot;
            </p>

            <p className="text-xs sm:text-sm text-gray-800 font-medium font-sans max-w-sm leading-relaxed">
              {footer.description}
            </p>

            {/* Redes Sociales */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white hover:bg-[#0B3B32] text-[#0B3B32] hover:text-white border border-emerald-200 flex items-center justify-center transition-all duration-200 shadow-xs"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href={`https://wa.me/${footer.columns.contactUs.phoneRaw}?text=Hola%20Centro%20Terap%C3%A9utico%20Siglo%20XXI%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white hover:bg-[#0B3B32] text-[#0B3B32] hover:text-white border border-emerald-200 flex items-center justify-center transition-all duration-200 shadow-xs"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white hover:bg-[#0B3B32] text-[#0B3B32] hover:text-white border border-emerald-200 flex items-center justify-center transition-all duration-200 shadow-xs"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#0B3B32] tracking-tight mb-4">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-800 font-medium font-sans">
              {footer.columns.quickLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-[#0B3B32] hover:underline underline-offset-4 transition-colors inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Nuestros Servicios (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#0B3B32] tracking-tight mb-4">
              Especialidades
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-800 font-medium font-sans">
              {footer.columns.ourServices.map((serv) => (
                <li key={serv.label}>
                  <a
                    href={serv.href}
                    className="hover:text-[#0B3B32] hover:underline underline-offset-4 transition-colors inline-block"
                  >
                    {serv.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Portales y Accesos (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#0B3B32] tracking-tight mb-4">
              Portales Clínicos
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-800 font-medium font-sans">
              {footer.columns.support.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-[#0B3B32] hover:underline underline-offset-4 transition-colors inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 5: Contáctanos (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-base sm:text-lg text-[#0B3B32] tracking-tight mb-4">
              Contáctanos
            </h4>

            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800 font-medium font-sans">
              <MapPin className="w-4 h-4 text-[#0B3B32] flex-shrink-0 mt-0.5" />
              <span className="leading-snug">{footer.columns.contactUs.address}</span>
            </div>

            <a
              href={`https://wa.me/${footer.columns.contactUs.phoneRaw}?text=Hola%20Centro%20Terap%C3%A9utico%20Siglo%20XXI%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-800 hover:text-[#0B3B32] font-bold font-sans transition-colors"
            >
              <Phone className="w-4 h-4 text-[#0B3B32] flex-shrink-0" />
              <span>{footer.columns.contactUs.phone}</span>
            </a>

            <a
              href={`mailto:${footer.columns.contactUs.email}`}
              className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-800 hover:text-[#0B3B32] font-medium font-sans transition-colors"
            >
              <Mail className="w-4 h-4 text-[#0B3B32] flex-shrink-0" />
              <span>{footer.columns.contactUs.email}</span>
            </a>
            <div id="horario-atencion" className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-800 font-sans scroll-mt-24">
              <Clock className="w-4 h-4 text-[#0B3B32] flex-shrink-0 mt-0.5" />
              <div className="space-y-1 leading-snug">
                <p className="font-bold text-[#0B3B32]">Horario de atención</p>
                <p>{footer.columns.contactUs.scheduleWeekday}</p>
                <p>{footer.columns.contactUs.scheduleSaturday}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Franja Inferior de Copyright */}
      <div className="relative z-20 w-full bg-[#0B3B32] py-4 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm text-white font-medium font-sans tracking-wide">
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
