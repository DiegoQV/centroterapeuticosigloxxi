"use client";

import { useActionState, useState } from "react";
import { ShieldCheck, Loader2, AlertCircle, KeyRound, Calendar, Info, ArrowRight, Sparkles } from "lucide-react";
import { verifyPatientAccessAction } from "../actions";

interface PatientAccessFormProps {
  defaultToken?: string;
}

export function PatientAccessForm({ defaultToken = "" }: PatientAccessFormProps) {
  const [state, formAction, isPending] = useActionState(verifyPatientAccessAction, null);
  const [token, setToken] = useState(defaultToken);
  const [birthYear, setBirthYear] = useState("");

  const handleAutofillDemo = () => {
    setToken("e7b1c3");
    setBirthYear("1985");
  };

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
          <span className="font-medium leading-relaxed">{state.error}</span>
        </div>
      )}

      {/* Código de Pauta */}
      <div>
        <label
          htmlFor="token"
          className="block text-xs font-semibold text-slate-700 mb-1.5"
        >
          Código de pauta o identificador <span className="text-[#10B981]">*</span>
        </label>
        <div className="relative">
          <input
            id="token"
            name="token"
            type="text"
            placeholder="Ej. e7b1c3... (entregado en consulta)"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            disabled={isPending}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-[#0B3B32] focus:ring-4 focus:ring-[#0B3B32]/10 text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-none disabled:opacity-50"
          />
          <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Año de Nacimiento */}
      <div>
        <label
          htmlFor="birthYear"
          className="block text-xs font-semibold text-slate-700 mb-1.5"
        >
          Año de nacimiento (4 dígitos) <span className="text-[#10B981]">*</span>
        </label>
        <div className="relative">
          <input
            id="birthYear"
            name="birthYear"
            type="text"
            maxLength={4}
            placeholder="Ej. 1985"
            pattern="\d{4}"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            required
            disabled={isPending}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white focus:border-[#0B3B32] focus:ring-4 focus:ring-[#0B3B32]/10 text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-none disabled:opacity-50"
          />
          <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Microcopy de Verificación Médica */}
        <div className="mt-2 p-2.5 rounded-xl bg-[#E8F6F1] border border-[#D3ECE4] text-[11px] text-[#0B3B32] flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#0B3B32] shrink-0" />
          <span>Validación médica segura para consultar tus ejercicios prescritos.</span>
        </div>
      </div>

      {/* Botón Principal de Envío */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 px-5 rounded-xl bg-[#0B3B32] hover:bg-[#072B24] active:bg-[#041D18] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-50 mt-1"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-1 animate-spin text-[#A7F3D0]" />
            <span>Validando acceso...</span>
          </>
        ) : (
          <>
            <span>Consultar Mi Pauta Terapéutica</span>
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
          <span>Autocompletar acceso de prueba (María - Paciente)</span>
        </button>
      </div>

      {/* Pie de Seguridad */}
      <div className="pt-3.5 border-t border-slate-100 flex items-start gap-2.5 text-[11px] text-slate-500">
        <ShieldCheck className="w-4 h-4 text-[#0B3B32] shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800 block font-semibold leading-tight">Acceso Confidencial</strong>
          <span className="text-[10px] text-slate-400">Datos clínicos y pautas protegidos bajo secreto médico profesional.</span>
        </div>
      </div>
    </form>
  );
}
