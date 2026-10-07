import Link from "next/link";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ArrowLeft, Stethoscope, User, Video, CalendarCheck, ShieldCheck, Phone } from "lucide-react";
import { PatientAccessForm } from "@/features/auth/components/PatientAccessForm";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

interface AccederPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AccederPage({ searchParams }: AccederPageProps) {
  const resolvedParams = await searchParams;
  const defaultToken =
    typeof resolvedParams.token === "string" ? resolvedParams.token : "";

  return (
    <div className={`min-h-screen w-full flex flex-col lg:flex-row bg-[#F8FAF9] ${plusJakarta.variable} font-jakarta antialiased selection:bg-emerald-100 selection:text-[#0B3B32]`}>
      
      {/* ============================================================== */}
      {/* 1. PANEL IZQUIERDO: Fotografía Clínica Reencuadrada & Filosofía */}
      {/* ============================================================== */}
      <div className="lg:w-[54%] xl:w-[56%] relative flex flex-col justify-between p-8 sm:p-12 lg:p-14 min-h-[420px] lg:min-h-screen text-white overflow-hidden">
        
        {/* Fotografía de Rehabilitación: Reencuadre superior (object-[center_18%]) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/login-physiotherapy.jpg"
            alt="Rehabilitación y Fisioterapia - Centro Terapéutico Siglo XXI"
            fill
            className="object-cover object-[center_18%]"
            priority
          />
          {/* Overlay graduado */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#041814] via-[#041814]/75 via-40% to-[#041814]/15" />
          <div className="absolute inset-0 bg-[#041814]/15 pointer-events-none" />
        </div>

        {/* Encabezado Superior Izquierdo: Logotipo Oficial */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 p-1.5 flex items-center justify-center shadow-xs">
            <img
              src="/brand/logo-emblem-tight.png"
              alt="Centro Terapéutico Siglo XXI"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="font-extrabold text-sm sm:text-base tracking-tight block text-white leading-tight">
              CENTRO TERAPÉUTICO SIGLO XXI
            </span>
            <span className="text-[10px] text-emerald-200/90 font-medium tracking-wider uppercase block">
              Portal Asistencial del Paciente
            </span>
          </div>
        </div>

        {/* Contenido Inferior Izquierdo: Anclado en la base con Plus Jakarta Sans */}
        <div className="relative z-10 space-y-3.5 max-w-lg pt-16 lg:pt-0">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-bold tracking-wider text-emerald-200 uppercase backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Pauta Domiciliaria</span>
          </div>

          <h1 className="text-3xl sm:text-4xl xl:text-[42px] font-serif font-normal text-white tracking-tight leading-[1.14]">
            Tu recuperación continúa en casa con supervisión médica.
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
            Consulta los videos de tus ejercicios prescritos con indicaciones precisas de postura, número de repeticiones y tiempo de descanso para realizar en casa de manera segura.
          </p>

          {/* Sellos de Confianza Simétricos en 3 Columnas Limpias */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/15 text-[11px] text-emerald-200/90">
            <div className="flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Videos Guiados HD</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Dosis Personalizada</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">Seguimiento Clínico</span>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. PANEL DERECHO: Formulario de Paciente con Plus Jakarta Sans */}
      {/* ============================================================== */}
      <div className="lg:w-[46%] xl:w-[44%] min-h-screen bg-white flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-y-auto">
        
        {/* Barra Superior */}
        <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-[#0B3B32] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Volver a la web</span>
          </Link>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-400">
            <Phone className="w-3 h-3 text-emerald-600" />
            <span>Consultas: +51 941 996 388</span>
          </span>
        </div>

        {/* Contenedor del Formulario con Ancho Óptimo */}
        <div className="max-w-[430px] w-full mx-auto my-auto py-6 sm:py-8">
          
          {/* Segmented Control de Modo Fluido */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6 border border-slate-200/70 shadow-2xs">
            <Link
              href="/login"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 transition-all"
            >
              <Stethoscope className="w-3.5 h-3.5 text-slate-400" />
              <span>Especialistas</span>
            </Link>
            <Link
              href="/acceder"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-white text-[#0B3B32] shadow-xs transition-all"
            >
              <User className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Pacientes</span>
            </Link>
          </div>

          {/* Cabecera del Formulario */}
          <div className="mb-5">
            <span className="text-[10px] font-bold tracking-widest text-[#0B3B32] uppercase bg-[#E8F6F1] px-2.5 py-1 rounded-md inline-block mb-2">
              Portal del Paciente
            </span>
            <h2 className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Consulta tu Pauta Terapéutica
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Ingresa el código proporcionado por tu fisioterapeuta y tu año de nacimiento.
            </p>
          </div>

          {/* Formulario de Paciente */}
          <PatientAccessForm defaultToken={defaultToken} />

        </div>

        {/* Pie Institucional */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <span>© 2026 Centro Terapéutico Siglo XXI</span>
          <span className="text-slate-500 font-medium">Chachapoyas, Amazonas · Perú</span>
        </div>

      </div>

    </div>
  );
}
