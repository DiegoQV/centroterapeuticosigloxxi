import Link from "next/link";
import { ArrowLeft, Stethoscope, PhoneCall } from "lucide-react";
import { TriageEngine } from "@/features/triage";

export const metadata = {
  title: "Triage Orientativo Preliminar | Centro Terapéutico Siglo XXI",
  description:
    "Formulario de orientación preliminar previa a tu cita de fisioterapia y rehabilitación en Jr. Sociego, Chachapoyas.",
};

export default function TriagePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Bar Navigation */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </Link>

        <a
          href="https://wa.me/51941996388"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">WhatsApp de Atención:</span>
          <span>+51 941 996 388</span>
        </a>
      </div>

      {/* Intro Header */}
      <div className="max-w-3xl mx-auto mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
          <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
          <span>Orientación Funcional Previa a Consulta</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Formulario de Triage Orientativo
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
          Completa este breve cuestionario para que nuestro equipo clínico en Chachapoyas
          pueda conocer el motivo de tu molestia y preparar tu valoración inicial presencial.
        </p>
      </div>

      {/* Triage Engine Container */}
      <div className="max-w-3xl mx-auto">
        <TriageEngine />
      </div>

      {/* Footer Disclaimer */}
      <div className="max-w-3xl mx-auto mt-8 text-center text-[11px] text-slate-400 space-y-1">
        <p>
          Centro Terapéutico Siglo XXI • Jr. Sociego, Chachapoyas (Barrio La Laguna)
        </p>
        <p>
          Ley General de Salud N° 26842 & Ley de Protección de Datos Personales N° 29733 (Perú).
        </p>
      </div>
    </div>
  );
}
