"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Lock, Loader2, AlertCircle, Eye, EyeOff, ArrowRight, ShieldCheck, UserCheck, Sparkles } from "lucide-react";
import { loginStaffAction } from "../actions";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginStaffAction, null);
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleAutofillDemo = () => {
    setIdentifier("dr.alejandro@centroterapeutico.pe");
    setPassword("ClinicaSigloXXI2025!");
  };

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
          <span className="font-medium leading-relaxed">{state.error}</span>
        </div>
      )}

      {/* ID de Especialista o Correo */}
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold text-slate-700 mb-1.5"
        >
          ID de especialista o correo institucional <span className="text-[#10B981]">*</span>
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Ej. dr.alejandro o ID-4589"
            autoComplete="username"
            required
            disabled={isPending}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-[#0B3B32] focus:ring-4 focus:ring-[#0B3B32]/10 text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-none disabled:opacity-50"
          />
          <UserCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Contraseña */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="password"
            className="block text-xs font-semibold text-slate-700"
          >
            Contraseña clínica <span className="text-[#10B981]">*</span>
          </label>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Por protocolos de seguridad médica, para restablecer tu contraseña contacta a soporte de Sistemas en Centro Terapéutico Siglo XXI.");
            }}
            className="text-[11px] font-medium text-slate-500 hover:text-[#0B3B32] transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
            disabled={isPending}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-[#0B3B32] focus:ring-4 focus:ring-[#0B3B32]/10 text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-none disabled:opacity-50"
          />
          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isPending}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
            aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Botón Principal: Ingresar a la Estación Clínica */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-5 rounded-xl bg-[#0B3B32] hover:bg-[#072B24] active:bg-[#041D18] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-50 mt-1"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#A7F3D0]" />
            <span>Verificando credenciales...</span>
          </>
        ) : (
          <>
            <span>Ingresar a la Estación Clínica</span>
            <ArrowRight className="w-4 h-4 text-[#A7F3D0]" />
          </>
        )}
      </button>

      {/* Asistente Discreto de Prueba / Demostración */}
      <div className="pt-2 flex flex-col items-center gap-1">
        <button
          type="button"
          onClick={handleAutofillDemo}
          className="text-xs font-semibold text-[#0B3B32] hover:underline cursor-pointer inline-flex items-center gap-1.5 py-0.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Autocompletar acceso de prueba (Dr. Alejandro)</span>
        </button>
      </div>

      {/* Pie de Seguridad y Cumplimiento Normativo */}
      <div className="pt-3.5 border-t border-slate-100 flex items-start gap-2.5 text-[11px] text-slate-500">
        <ShieldCheck className="w-4 h-4 text-[#0B3B32] shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800 block font-semibold leading-tight">Sesión Asistencial Protegida</strong>
          <span className="text-[10px] text-slate-400">Cifrado de grado médico y registro de auditoría conforme a ley.</span>
        </div>
      </div>
    </form>
  );
}
