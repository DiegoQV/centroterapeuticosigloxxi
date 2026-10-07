"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Calendar,
  FileText,
  FilePlus,
  Activity,
  Heart,
  Droplet,
  User,
  RotateCw,
  ZoomIn,
  Maximize2,
  CheckCircle2,
  X,
  Printer,
  Clock,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Plus,
  LayoutGrid,
  Users,
  BarChart3,
  FolderKanban,
  Settings,
  Eye,
} from "lucide-react";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

// Tipo para el paciente del turno en Box
interface PatientQueueItem {
  id: string;
  name: string;
  avatar: string;
  dni: string;
  age: number;
  sex: "Masculino" | "Femenino";
  weight: string;
  bloodType: string;
  diagnosis: string;
  jointFocus: "knee" | "lumbar" | "shoulder" | "cervical";
  jointName: string;
  evaPain: number;
  bloodPressure: string;
  heartRate: number;
  boxAssigned: string;
  xrayImage: string;
  xrayDate: string;
  xrayDiagnosis: string;
  activePrescription: string;
  history: {
    id: string;
    title: string;
    date: string;
    status: "completed" | "in_progress" | "pending";
    note?: string;
  }[];
}

const INITIAL_QUEUE: PatientQueueItem[] = [
  {
    id: "p1",
    name: "Carlos Mendívil Reyna",
    avatar: "CM",
    dni: "45892147",
    age: 48,
    sex: "Masculino",
    weight: "74 kg",
    bloodType: "A+",
    diagnosis: "Gonartrosis Grado III & Reemplazo Articular",
    jointFocus: "knee",
    jointName: "Rodilla Derecha",
    evaPain: 6,
    bloodPressure: "120/80 mmHg",
    heartRate: 72,
    boxAssigned: "Box 1 · Terapia Manual",
    xrayImage: "/images/medical/xray-knee.jpg",
    xrayDate: "12/02/2026",
    xrayDiagnosis: "Pinzamiento del compartimento femorotibial medial con osteofitosis marginal.",
    activePrescription: "Puente Glúteo con banda elástica (3×12) + Crioterapia compresiva 15 min",
    history: [
      { id: "h1", title: "Evaluación Traumatológica Inicial", date: "12/02/2026", status: "completed", note: "Flexión activa limitada a 85°. Dolor punzante a la carga mecánica." },
      { id: "h2", title: "Cirugía de Reemplazo Articular", date: "24/02/2026", status: "completed", note: "Procedimiento quirúrgico exitoso sin complicaciones infecciosas." },
      { id: "h3", title: "Control Postquirúrgico en Box", date: "Hoy · 11:30", status: "in_progress", note: "Movilización patelar suave y reeducación propioceptiva." },
      { id: "h4", title: "Reeducación de la Marcha & Propiocepción", date: "28/09/2026", status: "pending" },
    ],
  },
  {
    id: "p2",
    name: "Elena Peña Vásquez",
    avatar: "EP",
    dni: "71203492",
    age: 36,
    sex: "Femenino",
    weight: "58 kg",
    bloodType: "O+",
    diagnosis: "Hernia Discal L4-L5 & Lumbalgia Mecánica",
    jointFocus: "lumbar",
    jointName: "Columna Lumbar",
    evaPain: 7,
    bloodPressure: "115/75 mmHg",
    heartRate: 74,
    boxAssigned: "Box 2 · Magnetoterapia Ecam",
    xrayImage: "/images/medical/xray-spine.jpg",
    xrayDate: "20/05/2026",
    xrayDiagnosis: "Disminución del espacio intervertebral L4-L5 con compromiso foraminal radicular.",
    activePrescription: "Extensión McKenzie pasiva (2×15) + Magneto Ecam 50 Gauss (25 min)",
    history: [
      { id: "h21", title: "Resonancia Magnética & Diagnóstico", date: "15/08/2026", status: "completed" },
      { id: "h22", title: "Descompresión McKenzie en Camilla", date: "Hoy · 10:00", status: "in_progress" },
      { id: "h23", title: "Control de Estabilidad Core & Transverso", date: "26/09/2026", status: "pending" },
    ],
  },
  {
    id: "p3",
    name: "Víctor Huamán Zavaleta",
    avatar: "VH",
    dni: "10458723",
    age: 52,
    sex: "Masculino",
    weight: "78 kg",
    bloodType: "B+",
    diagnosis: "Tendinopatía de Manguito Rotador (Supraespinoso)",
    jointFocus: "shoulder",
    jointName: "Hombro Derecho",
    evaPain: 5,
    bloodPressure: "128/82 mmHg",
    heartRate: 78,
    boxAssigned: "Box 1 · Terapia Manual",
    xrayImage: "/images/medical/xray-knee.jpg",
    xrayDate: "10/09/2026",
    xrayDiagnosis: "Tendinosis del supraespinoso con engrosamiento subacromial sin rotura completa.",
    activePrescription: "Ejercicios pendulares Codman + TENS analgésico 100Hz (15 min)",
    history: [
      { id: "h31", title: "Ecografía Musculoesquelética", date: "02/09/2026", status: "completed" },
      { id: "h32", title: "Liberación Miofascial & Péndulo", date: "Hoy · 16:00", status: "in_progress" },
      { id: "h33", title: "Fortalecimiento de Rotadores Externos", date: "29/09/2026", status: "pending" },
    ],
  },
  {
    id: "p4",
    name: "Sofía Cárdenas Benavides",
    avatar: "SC",
    dni: "73981240",
    age: 29,
    sex: "Femenino",
    weight: "52 kg",
    bloodType: "A+",
    diagnosis: "Cervicobraquialgia & Rectificación Cervical",
    jointFocus: "cervical",
    jointName: "Columna Cervical",
    evaPain: 4,
    bloodPressure: "110/70 mmHg",
    heartRate: 65,
    boxAssigned: "Box 3 · Electroterapia",
    xrayImage: "/images/medical/xray-spine.jpg",
    xrayDate: "14/09/2026",
    xrayDiagnosis: "Pérdida de la lordosis fisiológica cervical C4-C6 con espasmo paravertebral bilateral.",
    activePrescription: "Retracción mentoniana + Termoterapia superficial y TENS (20 min)",
    history: [
      { id: "h41", title: "Tracción Cervical Asistida", date: "18/09/2026", status: "completed" },
      { id: "h42", title: "Reeducación Postural Global (RPG)", date: "Hoy · 17:30", status: "in_progress" },
      { id: "h43", title: "Control Goniométrico Cervical", date: "30/09/2026", status: "pending" },
    ],
  },
];

// Puntos anatómicos sobre el maniquí muscular 3D
const HOTSPOTS = [
  { id: "cervical", name: "Cervical", x: 50, y: 16, focus: "cervical" as const },
  { id: "shoulder", name: "Hombro", x: 33, y: 22, focus: "shoulder" as const },
  { id: "lumbar", name: "Lumbar", x: 50, y: 44, focus: "lumbar" as const },
  { id: "knee", name: "Rodilla", x: 44, y: 66, focus: "knee" as const },
];

export default function PatientQueueWorkstation() {
  const [queue, setQueue] = useState<PatientQueueItem[]>(INITIAL_QUEUE);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [bodyView, setBodyView] = useState<"front" | "back">("front");
  const [zoomLevel, setZoomLevel] = useState<1 | 1.25 | 1.5>(1);

  // Modales interactivos funcionales
  const [modalType, setModalType] = useState<
    "schedule" | "notes" | "prescription" | "report" | "xray" | null
  >(null);

  // Notificación tipo toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filtrado de pacientes en la cola
  const filteredQueue = useMemo(() => {
    if (!searchQuery.trim()) return queue;
    const q = searchQuery.toLowerCase();
    return queue.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.dni.includes(q) ||
        p.diagnosis.toLowerCase().includes(q)
    );
  }, [queue, searchQuery]);

  const currentPatient = filteredQueue[currentIndex] || queue[0];

  // Navegación de cola
  const handlePrevPatient = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredQueue.length - 1));
  };

  const handleNextPatient = () => {
    setCurrentIndex((prev) => (prev < filteredQueue.length - 1 ? prev + 1 : 0));
  };

  // Cambiar paciente al hacer clic en un hotspot si coincide
  const handleHotspotClick = (focus: "knee" | "lumbar" | "shoulder" | "cervical") => {
    const patientWithFocus = queue.find((p) => p.jointFocus === focus);
    if (patientWithFocus) {
      const idx = filteredQueue.findIndex((p) => p.id === patientWithFocus.id);
      if (idx !== -1) {
        setCurrentIndex(idx);
        showToast(`Paciente seleccionado: ${patientWithFocus.name} (${patientWithFocus.jointName})`);
        return;
      }
    }
    showToast(`Foco biomecánico: ${focus.toUpperCase()} seleccionado`);
  };

  // ==========================================
  // ESTADOS PARA LOS FORMULARIOS DE LOS MODALES
  // ==========================================

  // 1. Agendar Cita
  const [scheduleDate, setScheduleDate] = useState("2026-09-25");
  const [scheduleTime, setScheduleTime] = useState("11:30");
  const [scheduleTherapy, setScheduleTherapy] = useState("Terapia Manual 1 a 1");
  const [scheduleBox, setScheduleBox] = useState("Box 1 · Terapia Manual");

  const handleSaveSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: "h-" + Date.now(),
      title: `${scheduleTherapy} (${scheduleBox.split("·")[0].trim()})`,
      date: `${scheduleDate} · ${scheduleTime}`,
      status: "pending" as const,
    };
    setQueue((prev) =>
      prev.map((p) =>
        p.id === currentPatient.id
          ? { ...p, history: [...p.history, newEntry] }
          : p
      )
    );
    setModalType(null);
    showToast(`Cita agendada para ${currentPatient.name}: ${scheduleDate} a las ${scheduleTime}`);
  };

  // 2. Registro SOAP
  const [soapS, setSoapS] = useState(
    "Paciente refiere disminución del dolor durante la noche (EVA 4/10). Sensación de rigidez matutina menor a 15 minutos."
  );
  const [soapO, setSoapO] = useState(
    "Flexión de rodilla activa: 105°. Fuerza cuadricipital M4+. Edema leve periarticular sin signos de calor local."
  );
  const [soapA, setSoapA] = useState(
    "Evolución favorable acorde a la fase proliferativa y remodelación tisular. Tolerancia óptima al protocolo de carga progresiva."
  );
  const [soapP, setSoapP] = useState(
    "Mantener protocolo de ejercicios domiciliarios 2 veces al día. Continuar 3 sesiones semanales en Box con Magnetoterapia Ecam."
  );

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    const newHistoryItem = {
      id: "soap-" + Date.now(),
      title: "Evolución Clínica SOAP en Box",
      date: "Hoy · " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "completed" as const,
      note: `S: ${soapS.slice(0, 45)}...`,
    };
    setQueue((prev) =>
      prev.map((p) =>
        p.id === currentPatient.id
          ? { ...p, history: [newHistoryItem, ...p.history] }
          : p
      )
    );
    setModalType(null);
    showToast(`Registro SOAP guardado con éxito en la historia clínica de ${currentPatient.name}`);
  };

  // 3. Prescripción Terapéutica
  const [prescExercise, setPrescExercise] = useState("Puente Glúteo con Descompresión Lumbar");
  const [prescSets, setPrescSets] = useState("3 series × 12 repeticiones (sostenido 6s)");
  const [prescEquipment, setPrescEquipment] = useState("Magnetoterapia Ecam (50 Gauss - 25 min)");

  const handleSavePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    const newPrescText = `${prescExercise} (${prescSets}) + ${prescEquipment}`;
    setQueue((prev) =>
      prev.map((p) =>
        p.id === currentPatient.id
          ? { ...p, activePrescription: newPrescText }
          : p
      )
    );
    setModalType(null);
    showToast(`Pauta terapéutica actualizada para ${currentPatient.name}`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 p-2 sm:p-4 min-h-[calc(100vh-2rem)] select-none">
      
      {/* Toast flotante de confirmación clínica */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#0B3B32] text-white px-5 py-3 rounded-2xl shadow-xl border border-emerald-500/30 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-emerald-300 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================= */}
      {/* SIDEBAR VERTICAL IZQUIERDO: Identidad Siglo XXI           */}
      {/* ========================================================= */}
      <aside className="w-full lg:w-16 bg-white rounded-3xl p-3 shadow-sm border border-[#D3ECE4]/80 flex lg:flex-col items-center justify-between gap-4 shrink-0">
        <div className="flex lg:flex-col items-center gap-5 w-full">
          
          {/* Isotipo Siglo XXI */}
          <Link
            href="/"
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0B3B32] to-[#04241E] text-emerald-200 flex items-center justify-center font-serif font-bold text-lg shadow-sm hover:scale-105 transition-transform"
            title="Centro Terapéutico Siglo XXI"
          >
            XXI
          </Link>

          {/* Menú de Iconos Funcionales */}
          <nav className="flex lg:flex-col items-center gap-2">
            <button
              type="button"
              className="w-10 h-10 rounded-2xl bg-[#0B3B32] text-emerald-200 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
              title="Estación Clínica Activa"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            <Link
              href="/agenda"
              className="w-10 h-10 rounded-2xl hover:bg-[#E8F6F1] flex items-center justify-center transition-colors text-slate-500 hover:text-[#0B3B32]"
              title="Agenda de Citas en Box"
            >
              <Calendar className="w-4 h-4" />
            </Link>

            <Link
              href="/pacientes"
              className="w-10 h-10 rounded-2xl hover:bg-[#E8F6F1] flex items-center justify-center transition-colors text-slate-500 hover:text-[#0B3B32] relative"
              title="Expedientes de Pacientes"
            >
              <Users className="w-4 h-4" />
              <span className="w-4 h-4 rounded-full bg-[#059669] text-white font-bold text-[9px] flex items-center justify-center absolute -top-1 -right-1 ring-2 ring-white">
                {queue.length}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setModalType("report")}
              className="w-10 h-10 rounded-2xl hover:bg-[#E8F6F1] flex items-center justify-center transition-colors text-slate-500 hover:text-[#0B3B32] cursor-pointer"
              title="Generar Informe Clínico Oficial"
            >
              <FileText className="w-4 h-4" />
            </button>

            <Link
              href="/admin"
              className="w-10 h-10 rounded-2xl hover:bg-[#E8F6F1] flex items-center justify-center transition-colors text-slate-500 hover:text-[#0B3B32]"
              title="Configuración & Seguridad RLS"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </nav>
        </div>

        {/* Salir / Logout en la base */}
        <div className="pt-2 border-t border-[#D3ECE4]/60 hidden lg:block">
          <LogoutButton
            variant="portal"
            className="w-10 h-10 rounded-2xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-colors"
          />
        </div>
      </aside>

      {/* ========================================================= */}
      {/* CONTENEDOR PRINCIPAL: HEADER + SPLIT 7/5 CLÍNICO          */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 1. BARRA SUPERIOR: Cola de Pacientes + Stepper + Search */}
        <header className="flex flex-wrap items-center justify-between gap-4 mb-5">
          
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B3B32] tracking-tight leading-none">
              Cola de Pacientes en Box
            </h1>

            {/* Selector de Pacientes de la Cola ‹ 1/4 › */}
            <div className="flex items-center gap-1.5 bg-white rounded-2xl px-3 py-1.5 border border-[#D3ECE4] shadow-2xs">
              <button
                type="button"
                onClick={handlePrevPatient}
                className="p-1 rounded-lg hover:bg-[#E8F6F1] text-slate-600 hover:text-[#0B3B32] transition-colors cursor-pointer"
                title="Paciente anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs font-bold text-[#0B3B32] px-1">
                {currentIndex + 1} / {filteredQueue.length}
              </span>
              <button
                type="button"
                onClick={handleNextPatient}
                className="p-1 rounded-lg hover:bg-[#E8F6F1] text-slate-600 hover:text-[#0B3B32] transition-colors cursor-pointer"
                title="Siguiente paciente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Buscador, Alertas y Perfil del Fisioterapeuta */}
          <div className="flex items-center gap-3">
            {/* Buscador en Vivo */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar paciente, DNI o patología..."
                className="w-48 sm:w-64 h-10 pl-4 pr-9 rounded-2xl bg-white border border-[#D3ECE4] text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#059669]/30 shadow-2xs"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Campana de Notificaciones */}
            <button
              type="button"
              onClick={() => showToast("No hay alertas críticas pendientes en los Boxes.")}
              className="w-10 h-10 rounded-2xl bg-white border border-[#D3ECE4] shadow-2xs flex items-center justify-center text-slate-600 relative hover:bg-[#E8F6F1] hover:text-[#0B3B32] transition-colors cursor-pointer"
              title="Notificaciones de box"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-2.5 right-2.5 ring-2 ring-white" />
            </button>

            {/* Perfil del Fisioterapeuta Responsable */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-[#D3ECE4]">
              <div className="w-9 h-9 rounded-2xl bg-[#E8F6F1] text-[#0B3B32] font-serif font-bold text-sm flex items-center justify-center border border-[#D3ECE4] shrink-0">
                JB
              </div>
              <div className="hidden md:block text-left">
                <span className="text-xs font-bold text-slate-900 block leading-tight">
                  Lic. Jahn Billoq
                </span>
                <span className="text-[10px] text-slate-500 font-medium block">
                  Fisioterapeuta Colegiado · Traumatología
                </span>
              </div>
            </div>
          </div>

        </header>

        {/* 2. SPLIT PRINCIPAL: MANIQUÍ 3D (7 cols) + EXPEDIENTE (5 cols) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
          
          {/* ========================================================= */}
          {/* COLUMNA CENTRAL (7 cols): MANIQUÍ 3D + HOTSPOTS           */}
          {/* ========================================================= */}
          <div className="xl:col-span-7 bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-[#D3ECE4]/80 flex flex-col justify-between min-h-[740px] relative overflow-hidden">
            
            {/* Cabecera del Visor Anatómico */}
            <div className="flex items-center justify-between z-10">
              <div>
                <span className="text-[10px] font-bold text-[#059669] uppercase tracking-wider block">
                  Exploración Biomecánica 3D
                </span>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#0B3B32] tracking-tight mt-0.5">
                  Foco Clínico: {currentPatient.jointName}
                </h2>
              </div>

              {/* Selector de Plano Anterior / Posterior */}
              <div className="inline-flex p-1 bg-[#F5F8F6] rounded-2xl text-xs font-semibold border border-[#D3ECE4]/60">
                <button
                  type="button"
                  onClick={() => setBodyView("front")}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    bodyView === "front"
                      ? "bg-[#0B3B32] text-white shadow-2xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={() => setBodyView("back")}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    bodyView === "back"
                      ? "bg-[#0B3B32] text-white shadow-2xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Posterior
                </button>
              </div>
            </div>

            {/* Barra de Herramientas Flotante Lateral */}
            <div className="absolute right-5 top-24 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-sm border border-[#D3ECE4] flex flex-col items-center gap-1.5 text-slate-500">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => (z < 1.5 ? ((z + 0.25) as 1 | 1.25 | 1.5) : 1))}
                className="w-8 h-8 rounded-xl hover:bg-[#E8F6F1] hover:text-[#0B3B32] flex items-center justify-center transition-colors cursor-pointer"
                title="Aumentar zoom biomecánico"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="w-8 h-8 rounded-xl hover:bg-[#E8F6F1] hover:text-[#0B3B32] flex items-center justify-center transition-colors cursor-pointer"
                title="Restablecer vista a 100%"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setBodyView((v) => (v === "front" ? "back" : "front"))}
                className="w-8 h-8 rounded-xl hover:bg-[#E8F6F1] hover:text-[#0B3B32] flex items-center justify-center transition-colors cursor-pointer"
                title="Rotar vista 180°"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Área Central del Maniquí Muscular 3D con Puntos Interactivos */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <div
                style={{ transform: `scale(${zoomLevel})` }}
                className="relative w-full max-w-[340px] aspect-3/4 transition-transform duration-300 flex items-center justify-center"
              >
                <Image
                  src={
                    bodyView === "front"
                      ? "/images/medical/body-front-3d.jpg"
                      : "/images/medical/body-back-3d.jpg"
                  }
                  alt="Modelo Anatómico Muscular 3D"
                  fill
                  className="object-contain drop-shadow-md"
                  priority
                />

                {/* Puntos de Lesión / Hotspots Interactivos */}
                {HOTSPOTS.map((spot) => {
                  const isActive = currentPatient.jointFocus === spot.focus;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => handleHotspotClick(spot.focus)}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                      title={`Foco biomecánico: ${spot.name}`}
                    >
                      {/* Anillos de pulso */}
                      <span
                        className={`w-9 h-9 rounded-full absolute -inset-2 animate-ping opacity-35 ${
                          isActive ? "bg-[#059669]" : "bg-slate-400"
                        }`}
                      />
                      <span
                        className={`w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center text-[10px] font-extrabold text-white transition-transform ${
                          isActive
                            ? "bg-[#0B3B32] scale-125 ring-2 ring-emerald-400"
                            : "bg-[#059669] hover:scale-115"
                        }`}
                      >
                        {isActive ? "•" : "+"}
                      </span>
                    </button>
                  );
                })}

                {/* Tarjeta de Diagnóstico Flotante Anclada a la Lesión */}
                <div
                  onClick={() => setModalType("xray")}
                  className="absolute bottom-4 left-2 sm:left-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-md border border-[#D3ECE4] flex items-center gap-3 cursor-pointer hover:scale-102 transition-transform z-20"
                  title="Haga clic para ver el visor radiológico oficial"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-black relative border border-slate-200 shrink-0">
                    <Image
                      src={currentPatient.xrayImage}
                      alt="Miniatura Radiográfica"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-serif text-xs font-bold text-[#0B3B32] block leading-tight">
                      {currentPatient.diagnosis.split("&")[0].trim()}
                    </span>
                    <span className="text-[10px] text-[#059669] font-mono font-medium block mt-0.5">
                      {currentPatient.xrayDate} · Radiografía Digital
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pie del Visor Anatómico */}
            <div className="pt-3 border-t border-[#D3ECE4]/60 flex items-center justify-between text-xs text-slate-500">
              <span>Vista {bodyView === "front" ? "Anterior (Frontal)" : "Posterior (Dorsal)"}</span>
              <div className="flex items-center gap-1.5 font-semibold text-[#0B3B32]">
                <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                <span>Calibración Biomecánica Activa</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMNA DERECHA (5 cols): Ficha, Historial, Acciones     */}
          {/* ========================================================= */}
          <div className="xl:col-span-5 space-y-4">
            
            {/* 1. FICHA DEL PACIENTE CON IDENTIDAD SIGLO XXI */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#D3ECE4]/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base font-bold text-[#0B3B32] tracking-wide">
                  Ficha del Paciente
                </span>
                <span className="text-[10px] font-bold text-[#0B3B32] bg-[#E8F6F1] px-3 py-1 rounded-full border border-[#D3ECE4]">
                  {currentPatient.boxAssigned}
                </span>
              </div>

              {/* Tarjeta Noble Siglo XXI (Verde Quirúrgico Profundo) */}
              <div className="bg-gradient-to-br from-[#0B3B32] via-[#0C4E42] to-[#04241E] text-white rounded-3xl p-5 shadow-sm border border-[#0B3B32]/40 flex items-center justify-between gap-4 relative overflow-hidden">
                {/* Sutil halo decorativo */}
                <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center gap-3.5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-400/20 flex items-center justify-center font-serif font-bold text-xl text-emerald-100 border border-emerald-300/40 shrink-0">
                    {currentPatient.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full font-mono font-medium text-emerald-100">
                        {currentPatient.weight}
                      </span>
                      <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full font-mono font-medium text-emerald-100">
                        {currentPatient.bloodType}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-lg text-white leading-tight">
                      {currentPatient.name}
                    </h3>
                    <span className="text-xs text-emerald-100/90 font-sans font-medium block mt-0.5">
                      {currentPatient.sex}, {currentPatient.age} años · DNI {currentPatient.dni}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0 relative z-10">
                  <span className="text-[10px] text-emerald-200/80 block uppercase tracking-wider font-semibold">
                    Diagnóstico:
                  </span>
                  <span className="font-serif text-xs font-bold text-white max-w-[130px] block line-clamp-2 mt-0.5">
                    {currentPatient.diagnosis.split("&")[0].trim()}
                  </span>
                </div>
              </div>

              {/* Signos Vitales y Escala EVA */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-[#F5F8F6] border border-[#D3ECE4]/70 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white shadow-2xs flex items-center justify-center text-[#059669]">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-medium">Presión Arterial</span>
                    <span className="font-mono text-xs font-bold text-[#0F292F]">{currentPatient.bloodPressure}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#F5F8F6] border border-[#D3ECE4]/70 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white shadow-2xs flex items-center justify-center text-rose-500">
                    <Heart className="w-4 h-4 fill-rose-500" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-medium">Ritmo Cardíaco · Dolor EVA</span>
                    <span className="font-mono text-xs font-bold text-[#0F292F]">{currentPatient.heartRate} bpm · EVA {currentPatient.evaPain}/10</span>
                  </div>
                </div>
              </div>

              {/* Prescripción Terapéutica Activa */}
              <div className="p-3.5 rounded-2xl bg-[#E8F6F1] border border-[#D3ECE4] text-xs">
                <span className="text-[10px] font-bold text-[#0B3B32] uppercase tracking-wider block mb-1">
                  Pauta Terapéutica Activa en Box:
                </span>
                <p className="font-semibold text-[#0F292F] text-[11px] leading-relaxed">
                  {currentPatient.activePrescription}
                </p>
              </div>
            </div>

            {/* 2. HISTORIAL CLÍNICO & DOCUMENTOS RADIOGRÁFICOS */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#D3ECE4]/80 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Historia Clínica & Evolución */}
                <div>
                  <span className="font-serif text-sm font-bold text-[#0B3B32] block mb-2">
                    Historia & Sesiones
                  </span>
                  <div className="space-y-1.5 text-xs max-h-[160px] overflow-y-auto pr-1">
                    {currentPatient.history.map((h) => (
                      <div
                        key={h.id}
                        className={`p-2 rounded-xl border transition-all ${
                          h.status === "in_progress"
                            ? "bg-[#E8F6F1] border-[#B7E2D5] text-[#0B3B32] font-semibold"
                            : "bg-[#F5F8F6] border-[#D3ECE4]/60 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="truncate">{h.title}</span>
                          {h.status === "completed" && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                          )}
                          {h.status === "in_progress" && (
                            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{h.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visor Rápido de Radiografía */}
                <div>
                  <span className="font-serif text-sm font-bold text-[#0B3B32] block mb-2">
                    Imágenes & Radiografía
                  </span>
                  <div
                    onClick={() => setModalType("xray")}
                    className="rounded-2xl overflow-hidden border border-[#D3ECE4] bg-black aspect-4/3 relative cursor-pointer group shadow-2xs"
                    title="Haga clic para expandir el estudio en pantalla completa"
                  >
                    <Image
                      src={currentPatient.xrayImage}
                      alt="Estudio Radiológico"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2.5 right-2.5 text-white text-[10px] font-mono flex items-center justify-between">
                      <span>({currentPatient.xrayDate})</span>
                      <Maximize2 className="w-3.5 h-3.5 text-emerald-300" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. LOS 3 BOTONES DE ACCIÓN MÉDICA 100% FUNCIONALES */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              
              {/* Botón 1: Agendar Cita */}
              <button
                type="button"
                onClick={() => setModalType("schedule")}
                className="py-3 px-2 rounded-2xl bg-white hover:bg-[#F5F8F6] border border-[#D3ECE4] text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer hover:shadow-xs active:scale-98"
              >
                <Calendar className="w-4 h-4 text-[#0B3B32]" />
                <span>Agendar Cita</span>
              </button>

              {/* Botón 2: Evolución SOAP */}
              <button
                type="button"
                onClick={() => setModalType("notes")}
                className="py-3 px-2 rounded-2xl bg-white hover:bg-[#F5F8F6] border border-[#D3ECE4] text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer hover:shadow-xs active:scale-98"
              >
                <FilePlus className="w-4 h-4 text-[#059669]" />
                <span>Evolución SOAP</span>
              </button>

              {/* Botón 3: Prescribir Pauta */}
              <button
                type="button"
                onClick={() => setModalType("prescription")}
                className="py-3 px-2 rounded-2xl bg-[#0B3B32] hover:bg-[#072B24] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/20 transition-all cursor-pointer active:scale-98"
              >
                <Stethoscope className="w-4 h-4 text-emerald-300" />
                <span>Prescribir Pauta</span>
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* MODAL 1: SCHEDULE / AGENDAR SESIÓN EN BOX                 */}
      {/* ========================================================= */}
      {modalType === "schedule" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-100 relative">
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8F6F1] text-[#0B3B32] flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0B3B32] leading-tight">
                  Agendar Sesión en Box
                </h3>
                <span className="text-xs text-slate-500">
                  Paciente: {currentPatient.name} (DNI {currentPatient.dni})
                </span>
              </div>
            </div>

            <form onSubmit={handleSaveSchedule} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Fecha de la Cita</label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#059669]/30 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Horario en Box</label>
                <div className="grid grid-cols-3 gap-2">
                  {["09:00", "10:30", "11:30", "15:00", "16:30", "18:00"].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setScheduleTime(time)}
                      className={`p-2 rounded-xl border font-bold transition-all cursor-pointer ${
                        scheduleTime === time
                          ? "bg-[#0B3B32] text-white border-[#0B3B32]"
                          : "bg-[#F5F8F6] text-slate-700 border-slate-200 hover:bg-[#E8F6F1]"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Terapia a Realizar</label>
                <select
                  value={scheduleTherapy}
                  onChange={(e) => setScheduleTherapy(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                >
                  <option>Terapia Manual 1 a 1</option>
                  <option>Magnetoterapia Ecam (Regeneración)</option>
                  <option>Electroanalgesia TENS + Termoterapia</option>
                  <option>Goniometría & Revaloración de Alta</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Box Asignado</label>
                <select
                  value={scheduleBox}
                  onChange={(e) => setScheduleBox(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                >
                  <option>Box 1 · Camilla de Terapia Manual</option>
                  <option>Box 2 · Camilla Magnetoterapia Ecam</option>
                  <option>Box 3 · Camilla Electroterapia</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0B3B32] hover:bg-[#072B24] text-white font-bold shadow-md shadow-emerald-950/20 cursor-pointer"
                >
                  Confirmar Cita en Agenda
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: ADD NOTES / REGISTRO SOAP                        */}
      {/* ========================================================= */}
      {modalType === "notes" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-xl w-full shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8F6F1] text-[#059669] flex items-center justify-center">
                <FilePlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0B3B32] leading-tight">
                  Registro de Evolución Clínica (SOAP)
                </h3>
                <span className="text-xs text-slate-500">
                  {currentPatient.name} · Sesión Activa en Box
                </span>
              </div>
            </div>

            <form onSubmit={handleSaveNotes} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  S - Subjetivo (Lo que refiere el paciente)
                </label>
                <textarea
                  value={soapS}
                  onChange={(e) => setSoapS(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#059669]/30 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  O - Objetivo (Hallazgos en camilla y goniometría)
                </label>
                <textarea
                  value={soapO}
                  onChange={(e) => setSoapO(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#059669]/30 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  A - Análisis (Juicio clínico de respuesta al tratamiento)
                </label>
                <textarea
                  value={soapA}
                  onChange={(e) => setSoapA(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#059669]/30 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  P - Plan (Próxima intervención y pauta domiciliaria)
                </label>
                <textarea
                  value={soapP}
                  onChange={(e) => setSoapP(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#059669]/30 font-medium"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0B3B32] hover:bg-[#072B24] text-white font-bold shadow-md shadow-emerald-950/20 cursor-pointer"
                >
                  Guardar en Historia Clínica
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: PRESCRIBIR PAUTA TERAPÉUTICA                     */}
      {/* ========================================================= */}
      {modalType === "prescription" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-100 relative">
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8F6F1] text-[#0B3B32] flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0B3B32] leading-tight">
                  Prescribir Pauta Fisioterapéutica
                </h3>
                <span className="text-xs text-slate-500">
                  {currentPatient.name} · Foco: {currentPatient.jointName}
                </span>
              </div>
            </div>

            <form onSubmit={handleSavePrescription} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Ejercicio Terapéutico Prescrito
                </label>
                <select
                  value={prescExercise}
                  onChange={(e) => setPrescExercise(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                >
                  <option>Puente Glúteo con Descompresión Lumbar</option>
                  <option>Cobra McKenzie con Descompresión Axial</option>
                  <option>Bird-Dog - Control Motor Cuadrupedia</option>
                  <option>Estiramiento Activo de Cadena Lateral</option>
                  <option>Ejercicios Pendulares Codman para Hombro</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Dosificación (Series × Repeticiones / Tiempo)
                </label>
                <input
                  type="text"
                  value={prescSets}
                  onChange={(e) => setPrescSets(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-medium"
                  placeholder="Ej: 3 series × 12 reps con 6s sostenido"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Aparatología Complementaria en Box
                </label>
                <select
                  value={prescEquipment}
                  onChange={(e) => setPrescEquipment(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                >
                  <option>Magnetoterapia Ecam (50 Gauss - Regeneración ósea)</option>
                  <option>Electroanalgesia TENS 7000 (100 Hz Bifásico)</option>
                  <option>Termoterapia con Compresa Húmedo-Caliente (20 min)</option>
                  <option>Crioterapia con Compresa Fría y Compresión (15 min)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0B3B32] hover:bg-[#072B24] text-white font-bold shadow-md shadow-emerald-950/20 cursor-pointer"
                >
                  Asignar Prescripción
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: INFORME CLÍNICO OFICIAL DE ALTA / EVOLUCIÓN      */}
      {/* ========================================================= */}
      {modalType === "report" && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-100 relative max-h-[92vh] overflow-y-auto print:p-0 print:shadow-none">
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors print:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabecera Oficial del Informe */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D3ECE4] mb-5">
              <div>
                <span className="font-serif font-bold text-lg text-[#0B3B32] block tracking-tight">
                  CENTRO TERAPÉUTICO SIGLO XXI
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Sede Jr. Sociego, Chachapoyas · RUC 20458921471 · DIRIS-AM
                </span>
              </div>
              <span className="text-xs font-bold text-[#0B3B32] bg-[#E8F6F1] px-3 py-1 rounded-full border border-[#D3ECE4]">
                Informe Biomecánico
              </span>
            </div>

            {/* Datos del Paciente */}
            <div className="bg-[#F5F8F6] rounded-2xl p-4 mb-5 text-xs grid grid-cols-2 sm:grid-cols-4 gap-3 border border-[#D3ECE4]/60">
              <div>
                <span className="text-slate-400 block font-medium">Paciente</span>
                <strong className="font-serif text-[#0B3B32] block mt-0.5 text-sm">{currentPatient.name}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">DNI</span>
                <strong className="font-mono text-slate-900 block mt-0.5">{currentPatient.dni}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Edad / Sexo</span>
                <strong className="text-slate-900 block mt-0.5">{currentPatient.age} años · {currentPatient.sex}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Foco Articular</span>
                <strong className="text-slate-900 block mt-0.5">{currentPatient.jointName}</strong>
              </div>
            </div>

            {/* Diagnóstico y Evolución */}
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-serif font-bold text-sm text-[#0B3B32] mb-1">1. Diagnóstico Clínico & Foco</h4>
                <p className="text-slate-700 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed">
                  {currentPatient.diagnosis}. Presenta afección funcional en {currentPatient.jointName} con escala EVA de {currentPatient.evaPain}/10 y limitación goniométrica.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm text-[#0B3B32] mb-1">2. Pauta Fisioterapéutica y Aparatología</h4>
                <p className="text-slate-700 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed">
                  {currentPatient.activePrescription}. Protocolo supervisado 1 a 1 en Box.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm text-[#0B3B32] mb-1">3. Conclusiones y Alta Funcional</h4>
                <p className="text-slate-700 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed">
                  El paciente muestra una respuesta favorable al tratamiento de tracción y reeducación motriz. Se autoriza progresión a pauta de ejercicios domiciliarios bajo supervisión.
                </p>
              </div>
            </div>

            {/* Firma */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block">Fecha de Emisión</span>
                <strong className="text-slate-800">22 de Septiembre, 2026</strong>
              </div>

              <div className="text-right">
                <div className="w-36 border-b border-slate-400 mb-1" />
                <span className="font-bold text-slate-900 block">Lic. Jahn Billoq</span>
                <span className="text-[10px] text-slate-500">C.F.P. 4589 · Chachapoyas</span>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="mt-6 flex items-center justify-end gap-2.5 print:hidden">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs cursor-pointer"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-[#0B3B32] hover:bg-[#072B24] text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-950/20 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-emerald-300" />
                <span>Imprimir / Exportar PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 5: VISOR RADIOGRÁFICO DE ALTA RESOLUCIÓN            */}
      {/* ========================================================= */}
      {modalType === "xray" && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full border border-slate-800 relative">
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-serif font-bold text-base text-white">
                Visor de Diagnóstico por Imagen · {currentPatient.jointName}
              </h3>
            </div>

            <div className="relative w-full aspect-square max-h-[460px] rounded-2xl overflow-hidden bg-black border border-slate-800 my-2">
              <Image
                src={currentPatient.xrayImage}
                alt="Radiografía Clínica"
                fill
                className="object-contain"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs mt-3 flex items-start justify-between gap-4">
              <div>
                <span className="text-emerald-400 font-bold block">Informe Radiológico</span>
                <p className="text-slate-200 mt-0.5 leading-relaxed">
                  {currentPatient.xrayDiagnosis}
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 shrink-0">
                Fecha: {currentPatient.xrayDate}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
