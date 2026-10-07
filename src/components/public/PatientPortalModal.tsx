"use client";

import { useState } from "react";
import {
  X,
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  Fingerprint,
  Activity,
  FileText,
  CalendarCheck,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PatientPortalModal({ isOpen, onClose }: PatientPortalModalProps) {
  const [dni, setDni] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dni || dni.trim().length < 8) {
      setErrorMsg("Ingrese un número de documento válido (mínimo 8 caracteres).");
      return;
    }
    setErrorMsg("");
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setDni("");
    setErrorMsg("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-[490px] bg-white rounded-[32px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.06)] overflow-hidden border border-zinc-200/90 text-zinc-900 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Cabecera en Verde Salvia Botánico (Misma paleta exacta del Footer) */}
        <div className="bg-[#EAF5EE] text-[#18181b] p-7 sm:p-8 relative overflow-hidden border-b border-[#38C666]/25">
          {/* Resplandor Botánico Ambiental Sutil */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#38C666]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Botón de cerrar circular refinado */}
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white hover:bg-[#0D2818] hover:text-white border border-zinc-200/90 text-zinc-600 flex items-center justify-center transition-all duration-200 shadow-2xs cursor-pointer group"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
          </button>

          {/* Micro-badge de Seguridad Clínica */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#38C666]/30 text-[11px] font-outfit font-semibold tracking-wider text-[#0D2818] uppercase mb-3.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#38C666] animate-pulse" />
            <span>Portal Clínico Digital · Cifrado SSL 256-Bit</span>
          </div>

          <h3 className="font-outfit text-2xl sm:text-[25px] font-semibold tracking-[-0.02em] text-[#0D2818] leading-tight">
            Expediente & Portal del Paciente
          </h3>
          <p className="font-inter text-xs sm:text-[13px] text-zinc-700 leading-relaxed mt-2 max-w-md font-normal">
            Consulta tus pautas de rehabilitación biomecánica, planes activos en el hogar y registro de evolución terapéutica.
          </p>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-7 sm:p-8 bg-white space-y-5">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Tarjeta de Verificación de Identidad Clínica */}
              <div className="bg-[#FAFBF9] p-4 rounded-2xl border border-zinc-200/90 shadow-2xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-[#EAF5EE] border border-[#38C666]/30 flex items-center justify-center text-[#0D2818] shrink-0 mt-0.5">
                  <Fingerprint className="w-5 h-5 text-[#38C666]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-outfit font-semibold text-xs text-zinc-900 tracking-wide">
                    Acceso Exclusivo para Pacientes Activos
                  </h4>
                  <p className="font-inter text-xs text-zinc-600 leading-relaxed font-normal">
                    Tu expediente digital se asocia a tu documento tras la consulta de evaluación inicial presencial en Jr. Sociego, Chachapoyas.
                  </p>
                </div>
              </div>

              {/* Input Documento */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="dni-input" className="font-outfit font-semibold text-xs text-zinc-900 uppercase tracking-wider">
                    Documento de Identidad
                  </label>
                  <span className="font-mono text-[10.5px] text-zinc-500 font-medium">
                    DNI · CE · Pasaporte
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <input
                    id="dni-input"
                    type="text"
                    maxLength={15}
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="Ingresa tu número (ej. 74839201)"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-300 rounded-2xl text-sm font-inter font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden focus:border-[#0D2818] focus:ring-4 focus:ring-[#0D2818]/5 shadow-2xs transition-all"
                  />
                </div>
                {errorMsg && (
                  <p className="font-inter text-xs text-rose-600 mt-2 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Módulos Disponibles en el Portal */}
              <div>
                <span className="block font-outfit text-[11px] font-semibold text-zinc-600 uppercase tracking-wider mb-2.5">
                  Beneficios del expediente digital
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11.5px] font-inter text-zinc-800">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAFBF9] border border-zinc-200/80 shadow-2xs">
                    <Activity className="w-3.5 h-3.5 text-[#38C666] shrink-0" />
                    <span className="font-medium truncate">Pautas biomecánicas</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAFBF9] border border-zinc-200/80 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#38C666] shrink-0" />
                    <span className="font-medium truncate">Control de dolor</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAFBF9] border border-zinc-200/80 shadow-2xs">
                    <CalendarCheck className="w-3.5 h-3.5 text-[#38C666] shrink-0" />
                    <span className="font-medium truncate">Gestión de sesiones</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAFBF9] border border-zinc-200/80 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#38C666] shrink-0" />
                    <span className="font-medium truncate">Historial reservado</span>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-1/3 py-3.5 text-xs font-inter font-medium text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 rounded-full transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3.5 text-xs font-inter font-semibold text-white bg-[#0D2818] hover:bg-[#153e26] rounded-full shadow-[0_10px_25px_-5px_rgba(13,40,24,0.25)] hover:shadow-[0_14px_30px_-5px_rgba(13,40,24,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Consultar Expediente</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#38C666] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Acceso Staff Clínico */}
              <div className="pt-2 text-center">
                <Link
                  href="/login"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-inter font-medium text-zinc-600 hover:text-[#0D2818] transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>¿Eres parte del equipo asistencial? Acceso Profesional →</span>
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-5 animate-in fade-in zoom-in-95 duration-200">
              {/* Anillo de verificación de identidad */}
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#38C666]/20 animate-ping opacity-75" />
                <div className="relative w-16 h-16 rounded-full bg-[#EAF5EE] text-[#0D2818] flex items-center justify-center shadow-xs border border-[#38C666]/40">
                  <ShieldCheck className="w-8 h-8 text-[#0D2818]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5EE] border border-[#38C666]/30 text-[#0D2818] text-[11px] font-outfit font-semibold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#38C666]" />
                  <span>Expediente Registrado</span>
                </div>
                <h4 className="font-outfit text-xl font-semibold text-zinc-900 tracking-tight">
                  Coordinación de Acceso Digital
                </h4>
                <p className="font-inter text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed font-normal">
                  Para el documento <strong className="text-zinc-900 font-semibold">{dni}</strong>, puedes solicitar al equipo de recepción el envío de tu enlace biométrico directo o la reactivación de pautas en el hogar.
                </p>
              </div>

              {/* Tarjeta de Acción Inmediata WhatsApp */}
              <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-zinc-200/90 shadow-2xs text-left space-y-3">
                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-medium">
                  <span>Atención en tiempo real</span>
                  <span className="text-[#0D2818] font-semibold">Chachapoyas, PE</span>
                </div>
                <a
                  href={`https://wa.me/51941996388?text=${encodeURIComponent(
                    `Hola Centro Terapéutico Siglo XXI, deseo consultar el acceso a mis pautas terapéuticas y citas para el documento: ${dni}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-full bg-[#0D2818] hover:bg-[#153e26] text-white font-inter font-semibold text-xs flex items-center justify-center gap-2.5 shadow-[0_10px_25px_-5px_rgba(13,40,24,0.25)] transition-all group"
                >
                  <MessageCircle className="w-4 h-4 text-[#38C666]" />
                  <span>Solicitar Enlace de Acceso vía WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#38C666] group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-inter font-medium text-zinc-600 hover:text-zinc-900 py-1 transition-colors cursor-pointer"
              >
                ← Volver al sitio principal
              </button>
            </div>
          )}

          {/* Institutional note */}
          <div className="mt-6 pt-4 border-t border-zinc-200/80 flex items-center justify-between text-[10.5px] text-zinc-500 font-inter">
            <span>Centro Terapéutico Siglo XXI · Chachapoyas</span>
            <span className="flex items-center gap-1.5 font-medium text-zinc-700">
              <ShieldCheck className="w-3.5 h-3.5 text-[#38C666]" />
              Ley N° 29733 (Datos de Salud)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
