"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Users,
  FileText,
  ClipboardCheck,
  Activity,
  Clock,
  Calendar,
  Stethoscope,
  BarChart3,
  Settings,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  MoreVertical,
  Check,
  CheckCircle2,
  ArrowRight,
  Edit3,
  X,
  ShieldCheck,
  Download,
  Menu,
  Phone,
  Mail,
  Building,
  UserCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

export type ClinicalViewType =
  | "inicio"
  | "pacientes"
  | "expediente"
  | "evaluacion"
  | "planes"
  | "sesiones"
  | "citas"
  | "profesionales"
  | "reportes"
  | "configuracion";

interface ClinicalSuiteWorkstationProps {
  initialView?: ClinicalViewType;
}

export default function ClinicalSuiteWorkstation({
  initialView = "inicio",
}: ClinicalSuiteWorkstationProps) {
  const [currentView, setCurrentView] = useState<ClinicalViewType>(initialView);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Pestaña activa dentro del expediente del paciente
  const [expedienteTab, setExpedienteTab] = useState<
    "resumen" | "historia" | "evaluaciones" | "planes" | "sesiones" | "citas"
  >("resumen");

  // Paciente seleccionado actualmente para el expediente clínico
  const [selectedPatientId, setSelectedPatientId] = useState<string>("p1");

  // Filtros de búsqueda
  const [globalSearch, setGlobalSearch] = useState("");
  const [patientSearch, setPatientSearch] = useState("");
  const [patientStatusFilter, setPatientStatusFilter] = useState("todos");

  // Subpestaña de nueva evaluación
  const [evalSubtab, setEvalSubtab] = useState<"signos" | "fisico" | "escalas">("signos");
  const [evalDolor, setEvalDolor] = useState(3);
  const [evalDuracion, setEvalDuracion] = useState("6 meses - 1 año");
  const [evalObservaciones, setEvalObservaciones] = useState(
    "Mejora en movilidad lumbar. Continúa con plan de tratamiento y fortalecimiento de core."
  );
  const [evalRedFlags, setEvalRedFlags] = useState(false);

  // Subpestaña de reportes
  const [reportTab, setReportTab] = useState<"pacientes" | "evolucion" | "sesiones" | "financiero">("pacientes");

  // Subpestaña de configuración
  const [configTab, setConfigTab] = useState<"general" | "usuarios" | "seguridad">("general");

  // Modales
  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);
  const [isNewCitaModalOpen, setIsNewCitaModalOpen] = useState(false);

  // Toast de notificación
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Estados interactivos para el Dashboard (Fitted Single Viewport)
  const [inicioTab, setInicioTab] = useState<"evolucion" | "boxes" | "actividad">("evolucion");
  const [agendaFilter, setAgendaFilter] = useState<"todas" | "box" | "pendientes">("todas");
  const [doctorFilter, setDoctorFilter] = useState<"mis_pacientes" | "todos">("todos");
  const [chartPeriod, setChartPeriod] = useState<"30d" | "90d" | "1a">("30d");
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(25);

  const [boxesState, setBoxesState] = useState([
    {
      id: 1,
      name: "Box 1 · Terapia Manual",
      status: "ocupado",
      patient: "María López García",
      procedure: "Descompresión Lumbar L4-L5",
      doc: "Dra. Carla Sánchez",
      time: "08:00 - 08:45",
    },
    {
      id: 2,
      name: "Box 2 · Kinesiología",
      status: "ocupado",
      patient: "Carlos Mendoza R.",
      procedure: "Readaptación LCA y Goniometría",
      doc: "Dr. Alejandro Torres",
      time: "09:30 - 10:15",
    },
    {
      id: 3,
      name: "Gabinete 1 · Reeducación",
      status: "disponible",
      patient: "Próx: Ana Torres (11:00 AM)",
      procedure: "Reeducación Miofascial Postural",
      doc: "Lic. Elena Morales",
      time: "11:00 - 11:45",
    },
    {
      id: 4,
      name: "Gimnasio de Rehabilitación",
      status: "activo",
      patient: "3 Pacientes en Rutina Activa",
      procedure: "Circuito Propioceptivo y Marcha",
      doc: "Lic. Roberto Mendoza",
      time: "Continuo",
    },
  ]);

  const handleToggleBoxStatus = (boxId: number) => {
    setBoxesState((prev) =>
      prev.map((b) => {
        if (b.id === boxId) {
          const nextStatus = b.status === "ocupado" ? "disponible" : "ocupado";
          showToast(`${b.name}: ${nextStatus === "disponible" ? "Liberado y sanitizado ✓" : "Asignado a sesión clínica"}`);
          return { ...b, status: nextStatus };
        }
        return b;
      })
    );
  };

  const handleUpdateCitaStatus = (id: string, newStatus: string, patientName: string) => {
    setCitasList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    if (newStatus === "atendida") {
      showToast(`Cita de ${patientName} marcada como ATENDIDA ✓`);
    }
  };

  // ==========================================
  // ESTADOS Y DATOS CLÍNICOS DEL SISTEMA
  // ==========================================

  // Directorio de Pacientes con expedientes clínicos detallados
  const [patients, setPatients] = useState([
    {
      id: "p1",
      name: "María López García",
      avatarImg: "/images/patient-maria.jpg",
      initials: "ML",
      dni: "72648291",
      age: 34,
      phone: "987 654 321",
      admissionDate: "12 ene 2025",
      lastSession: "10 abr 2025",
      assignedDoc: "Dra. Carla Sánchez",
      status: "En tratamiento",
      diagnosis: "Lumbalgia mecánica & Hernia discal L4-L5",
      consultationReason: "Dolor lumbar crónico de 6 meses con irradiación a glúteo derecho",
      progress: 68,
      progressStatus: "Buena evolución clínica · Disminución EVA 7 → 3",
      planName: "Reeducación Funcional & Estabilidad Lumbar",
      planStartDate: "05 mar 2025",
      planDuration: "8 semanas (16 sesiones)",
      objectives: [
        "Disminuir dolor a escala EVA < 3 en actividades cotidianas",
        "Mejorar movilidad y flexión lumbar activa a > 75°",
        "Fortalecer musculatura estabilizadora profunda (Core & Transverso)",
        "Retomar actividades laborales y deportivas sin reagudización",
      ],
      exercises: [
        { name: "Puente de glúteos", dose: "3 series · 12 repeticiones (6s sostenido)", img: "/images/anatomy/exercise-main-plank.jpg" },
        { name: "Estiramiento lumbar & Cobra McKenzie", dose: "3 series · 30 seg respiración diafragmática", img: "/images/anatomy/exercise-cobra.jpg" },
        { name: "Fortalecimiento Bird-Dog", dose: "3 series · 10 repeticiones por lado", img: "/images/anatomy/exercise-bird-dog.jpg" },
      ],
      upcomingSessions: [
        { date: "15 abr 2025", time: "09:00" },
        { date: "17 abr 2025", time: "10:30" },
        { date: "22 abr 2025", time: "09:00" },
        { date: "24 abr 2025", time: "10:30" },
      ],
      notes: [
        {
          id: "h1",
          date: "10 abr 2025",
          author: "Dra. Carla Sánchez",
          role: "Especialista en Columna",
          note: "Evolución favorable. Disminuye dolor EVA 3/10. Mejor tolerancia al ejercicio de descompresión lumbar. Se progresa a pauta domiciliaria.",
        },
        {
          id: "h2",
          date: "03 abr 2025",
          author: "Dra. Carla Sánchez",
          role: "Especialista en Columna",
          note: "Se mantiene plan de tratamiento. Buena adherencia al protocolo de magnetoterapia y termoterapia superficial.",
        },
        {
          id: "h3",
          date: "25 mar 2025",
          author: "Dr. Luis Herrera",
          role: "Médico Fisiatra",
          note: "Evaluación inicial. Dolor lumbar EVA 7/10 con limitación en flexión activa a 40°. Discopatía L4-L5 sin signo de Lasègue positivo.",
        },
        {
          id: "h4",
          date: "12 ene 2025",
          author: "Dr. Luis Herrera",
          role: "Médico Fisiatra",
          note: "Ingreso al programa de rehabilitación integral. Dolor lumbar crónico de 6 meses de evolución refractario a analgésicos comunes.",
        },
      ],
    },
    {
      id: "p2",
      name: "Carlos Mendoza R.",
      avatarImg: null,
      initials: "CM",
      dni: "45231876",
      age: 42,
      phone: "976 123 456",
      admissionDate: "20 ene 2025",
      lastSession: "08 abr 2025",
      assignedDoc: "Dr. Alejandro Torres",
      status: "En tratamiento",
      diagnosis: "Gonartrosis Grado II de Rodilla derecha",
      consultationReason: "Gonalgia al bajar escaleras y rigidez matutina tras actividad física",
      progress: 55,
      progressStatus: "Ganancia de rango articular activo (0°-115°)",
      planName: "Fortalecimiento de Cadena Cinética y Cuádriceps",
      planStartDate: "28 ene 2025",
      planDuration: "10 semanas (20 sesiones)",
      objectives: [
        "Aliviar sobrecarga patelofemoral y dolor mecánico en carga",
        "Aumentar fuerza isométrica de cuádriceps y vasto interno",
        "Readaptación a la marcha funcional sin claudicación",
        "Control neuromuscular para prevención de retrocesos articulares",
      ],
      exercises: [
        { name: "Sentadilla isométrica en pared", dose: "3 series · 35 segundos a 60°", img: "/images/anatomy/exercise-main-plank.jpg" },
        { name: "Extensión terminal de rodilla con banda", dose: "3 series · 15 repeticiones", img: "/images/anatomy/exercise-cobra.jpg" },
        { name: "Puente unipodal adaptado", dose: "3 series · 10 repeticiones por pierna", img: "/images/anatomy/exercise-bird-dog.jpg" },
      ],
      upcomingSessions: [
        { date: "14 abr 2025", time: "09:30" },
        { date: "16 abr 2025", time: "09:30" },
        { date: "21 abr 2025", time: "09:30" },
      ],
      notes: [
        {
          id: "h2-1",
          date: "08 abr 2025",
          author: "Dr. Alejandro Torres",
          role: "Director Médico",
          note: "Control clínico: Flexión activa a 115°. Tolerancia excelente a la carga con banda elástica. Se retira muleta de descarga.",
        },
        {
          id: "h2-2",
          date: "28 mar 2025",
          author: "Dr. Alejandro Torres",
          role: "Director Médico",
          note: "Sesión 10: Terapia con ultrasonido pulsátil y electroestimulación TENS. Disminución del derrame articular residual.",
        },
        {
          id: "h2-3",
          date: "20 ene 2025",
          author: "Dr. Alejandro Torres",
          role: "Director Médico",
          note: "Evaluación inicial: Signo del cepillo patelar positivo. Dolor EVA 6/10. Se inicia protocolo conservador.",
        },
      ],
    },
    {
      id: "p3",
      name: "Ana Torres Silva",
      avatarImg: null,
      initials: "AT",
      dni: "70124583",
      age: 28,
      phone: "945 987 654",
      admissionDate: "02 mar 2025",
      lastSession: "07 abr 2025",
      assignedDoc: "Lic. Elena Morales",
      status: "En evaluación",
      diagnosis: "Cervicobraquialgia postraumática C5-C6",
      consultationReason: "Cervicalgia irradiada a hombro y brazo izquierdo tras latigazo cervical",
      progress: 40,
      progressStatus: "Fase analgésica y movilización neural suave",
      planName: "Protocolo de Descompresión Cervical y Neurodinamia",
      planStartDate: "05 mar 2025",
      planDuration: "6 semanas (12 sesiones)",
      objectives: [
        "Aliviar parestesias en territorio radicular C6",
        "Restablecer rotación e inclinación cervical simétrica",
        "Corrección postural del patrón anteriorizado de cabeza",
        "Educación ergonómica para puesto de trabajo en oficina",
      ],
      exercises: [
        { name: "Retracción cervical (Chin tuck)", dose: "3 series · 10 repeticiones sostenidas 5s", img: "/images/anatomy/exercise-cobra.jpg" },
        { name: "Deslizamiento neural del nervio mediano", dose: "2 series · 8 oscilaciones lentas", img: "/images/anatomy/exercise-main-plank.jpg" },
        { name: "Estiramiento suave de trapecio superior", dose: "3 series · 30 segundos por lado", img: "/images/anatomy/exercise-bird-dog.jpg" },
      ],
      upcomingSessions: [
        { date: "15 abr 2025", time: "11:00" },
        { date: "17 abr 2025", time: "11:00" },
        { date: "22 abr 2025", time: "11:00" },
      ],
      notes: [
        {
          id: "h3-1",
          date: "07 abr 2025",
          author: "Lic. Elena Morales",
          role: "Fisioterapeuta Colegiada",
          note: "Menor frecuencia de hormigueo en antebrazo. Movilidad cervical en rotación derecha 65°, izquierda 50°. Buena respuesta a termoterapia.",
        },
        {
          id: "h3-2",
          date: "02 mar 2025",
          author: "Dr. Alejandro Torres",
          role: "Director Médico",
          note: "Ingreso: Accidente de tránsito leve hace 3 semanas. Spurling test dudoso. Se descarta compromiso mielopático. Pauta de fisioterapia suave.",
        },
      ],
    },
    {
      id: "p4",
      name: "Jorge Ramírez Díaz",
      avatarImg: null,
      initials: "JR",
      dni: "41587210",
      age: 51,
      phone: "988 234 567",
      admissionDate: "15 feb 2025",
      lastSession: "05 abr 2025",
      assignedDoc: "Lic. Roberto Mendoza",
      status: "En tratamiento",
      diagnosis: "Tendinopatía de Manguito Rotador (Supraespinoso)",
      consultationReason: "Dolor en abducción de hombro derecho y limitación para dormir de lado",
      progress: 72,
      progressStatus: "Excelente progreso funcional · Fuerza muscular 4+/5",
      planName: "Readaptación de Hombro y Ritmo Escapulohumeral",
      planStartDate: "20 feb 2025",
      planDuration: "8 semanas (16 sesiones)",
      objectives: [
        "Arco doloroso de abducción negativo",
        "Fortalecimiento excéntrico de rotadores externos e internos",
        "Control motor escapular en elevación frontal",
        "Reincorporación a actividades manuales cotidianas",
      ],
      exercises: [
        { name: "Rotación externa con banda elástica", dose: "3 series · 12 repeticiones con toalla en codo", img: "/images/anatomy/exercise-bird-dog.jpg" },
        { name: "Serrato anterior en pared (Wall slide)", dose: "3 series · 10 repeticiones controladas", img: "/images/anatomy/exercise-main-plank.jpg" },
        { name: "Péndulo de Codman para descompresión", dose: "2 minutos de oscilaciones suaves", img: "/images/anatomy/exercise-cobra.jpg" },
      ],
      upcomingSessions: [
        { date: "16 abr 2025", time: "14:00" },
        { date: "18 abr 2025", time: "14:00" },
        { date: "23 abr 2025", time: "14:00" },
      ],
      notes: [
        {
          id: "h4-1",
          date: "05 abr 2025",
          author: "Lic. Roberto Mendoza",
          role: "Kinesiólogo Clínico",
          note: "Neer y Hawkins negativos hoy. Arco doloroso casi ausente. Paciente ya duerme sobre el lado derecho sin despertar por dolor.",
        },
        {
          id: "h4-2",
          date: "15 feb 2025",
          author: "Lic. Roberto Mendoza",
          role: "Kinesiólogo Clínico",
          note: "Evaluación inicial: Tendinopatía crónica reagudizada. Jobe test positivo con debilidad. Se inicia protocolo de terapia manual y diatermia.",
        },
      ],
    },
    {
      id: "p5",
      name: "Lucía Fernández M.",
      avatarImg: null,
      initials: "LF",
      dni: "61234578",
      age: 37,
      phone: "932 876 543",
      admissionDate: "10 mar 2025",
      lastSession: "03 abr 2025",
      assignedDoc: "Dra. Carla Sánchez",
      status: "En tratamiento",
      diagnosis: "Fascitis plantar bilateral & Espolón calcáneo",
      consultationReason: "Talalgia matutina severa en primeros pasos y dolor al apoyo podálico prolongado",
      progress: 60,
      progressStatus: "Fase de regeneración tisular y descarga mecánica",
      planName: "Protocolo de Ondas de Choque y Descarga Plantar",
      planStartDate: "12 mar 2025",
      planDuration: "6 semanas (12 sesiones)",
      objectives: [
        "Eliminar dolor matutino de los primeros pasos (EVA < 2)",
        "Aumentar elasticidad del tendón de Aquiles y fascia plantar",
        "Readaptar la pisada dinámica con taloneras ortopédicas de silicona",
        "Fortalecer musculatura intrínseca del pie y tríceps sural",
      ],
      exercises: [
        { name: "Liberación miofascial plantar con pelota", dose: "3 series · 2 minutos por pie", img: "/images/anatomy/exercise-cobra.jpg" },
        { name: "Estiramiento de gemelos y sóleo en plano inclinado", dose: "3 series · 45 segundos sostenido", img: "/images/anatomy/exercise-main-plank.jpg" },
        { name: "Trabajo intrínseco (Short foot exercise)", dose: "3 series · 15 contracciones activas", img: "/images/anatomy/exercise-bird-dog.jpg" },
      ],
      upcomingSessions: [
        { date: "14 abr 2025", time: "16:30" },
        { date: "18 abr 2025", time: "16:30" },
        { date: "21 abr 2025", time: "16:30" },
        { date: "25 abr 2025", time: "16:30" },
      ],
      notes: [
        {
          id: "h5-1",
          date: "03 abr 2025",
          author: "Dra. Carla Sánchez",
          role: "Fisioterapeuta Especialista",
          note: "Sesión 6: Aplicación de terapia con ondas de choque focales a 2.2 bar. Reducción notable de la hipersensibilidad en inserción del calcáneo.",
        },
        {
          id: "h5-2",
          date: "26 mar 2025",
          author: "Dra. Carla Sánchez",
          role: "Fisioterapeuta Especialista",
          note: "Control ecográfico: Grosor fascial disminuido de 5.1 mm a 4.3 mm. Paciente refiere alivio evidente al levantarse por la mañana.",
        },
        {
          id: "h5-3",
          date: "10 mar 2025",
          author: "Dr. Alejandro Torres",
          role: "Director Médico",
          note: "Ingreso: Diagnóstico confirmado de fascitis plantar bilateral con predominio derecho. Se prescribe ortesis nocturna y pauta de fisioterapia avanzada.",
        },
      ],
    },
    {
      id: "p6",
      name: "Diego Pérez Castillo",
      avatarImg: null,
      initials: "DP",
      dni: "74321098",
      age: 29,
      phone: "991 223 345",
      admissionDate: "01 abr 2025",
      lastSession: "01 abr 2025",
      assignedDoc: "Dr. Alejandro Torres",
      status: "En evaluación",
      diagnosis: "Esguince de tobillo grado II (LPAA)",
      consultationReason: "Entropinamiento brusco jugando fútbol con edema y equimosis perimaleolar",
      progress: 30,
      progressStatus: "Fase subaguda: drenaje de edema y propiocepción temprana",
      planName: "Readaptación de Tobillo y Estabilidad Funcional",
      planStartDate: "02 abr 2025",
      planDuration: "4 semanas (8 sesiones)",
      objectives: [
        "Reabsorción completa del edema y hematoma residual",
        "Recuperar dorsiflexión activa a 15°",
        "Entrenamiento del control neuromuscular sobre plato de Freeman",
        "Reincorporación a carrera lineal y cambios de dirección progresivos",
      ],
      exercises: [
        { name: "Movilización articular con toalla", dose: "3 series · 15 círculos y flexoextensiones", img: "/images/anatomy/exercise-cobra.jpg" },
        { name: "Equilibrio unipodal sobre superficie inestable", dose: "3 series · 30 segundos por apoyo", img: "/images/anatomy/exercise-main-plank.jpg" },
        { name: "Cargas excéntricas de tríceps sural", dose: "3 series · 10 repeticiones lentas", img: "/images/anatomy/exercise-bird-dog.jpg" },
      ],
      upcomingSessions: [
        { date: "15 abr 2025", time: "15:00" },
        { date: "17 abr 2025", time: "15:00" },
        { date: "22 abr 2025", time: "15:00" },
      ],
      notes: [
        {
          id: "h6-1",
          date: "01 abr 2025",
          author: "Dr. Alejandro Torres",
          role: "Director Médico",
          note: "Evaluación inicial: Cajón anterior positivo suave (+). No hay fractura según Reglas de Ottawa. Vendaje neuromuscular compresivo y protocolo POLICE.",
        },
      ],
    },
  ]);

  // Paciente actualmente seleccionado para el visor de expediente
  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  // Citas del Centro
  const [citasList, setCitasList] = useState([
    {
      id: "c1",
      patient: "María López García",
      time: "08:00 - 08:45",
      date: "12 Abr 2025",
      doctor: "Dra. Carla Sánchez",
      specialty: "Fisioterapia · Box 1",
      status: "atendida",
    },
    {
      id: "c2",
      patient: "Carlos Mendoza R.",
      time: "09:30 - 10:15",
      date: "12 Abr 2025",
      doctor: "Dr. Alejandro Torres",
      specialty: "Kinesiología · Sala 2",
      status: "confirmada",
    },
    {
      id: "c3",
      patient: "Ana Torres Silva",
      time: "11:00 - 11:45",
      date: "12 Abr 2025",
      doctor: "Lic. Elena Morales",
      specialty: "Reeducación funcional · Gabinete 1",
      status: "confirmada",
    },
    {
      id: "c4",
      patient: "Jorge Ramírez Díaz",
      time: "14:00 - 14:45",
      date: "12 Abr 2025",
      doctor: "Lic. Roberto Mendoza",
      specialty: "Terapia manual · Sala 1",
      status: "pendiente",
    },
    {
      id: "c5",
      patient: "Lucía Fernández M.",
      time: "16:30 - 17:15",
      date: "12 Abr 2025",
      doctor: "Dra. Carla Sánchez",
      specialty: "Evaluación inicial · Gabinete 2",
      status: "pendiente",
    },
  ]);

  // Directorio de Profesionales
  const professionals = [
    {
      id: "pr1",
      name: "Dr. Alejandro Torres",
      role: "Director Médico & Rehabilitación",
      colegiatura: "C.F.P. 4589 · C.M.P. 68214",
      specialty: "Traumatología y Rehabilitación Funcional",
      photo: "/images/doctor-alejandro.jpg",
      patientsCount: 18,
      status: "Disponible",
      accessRole: "admin",
    },
    {
      id: "pr2",
      name: "Dra. Carla Sánchez",
      role: "Fisioterapeuta Especialista",
      colegiatura: "C.F.P. 5120",
      specialty: "Columna Vertebral y Terapia Manual",
      photo: "/images/doctor-carla.jpg",
      patientsCount: 16,
      status: "En sesión",
      accessRole: "profesional",
    },
    {
      id: "pr3",
      name: "Lic. Elena Morales",
      role: "Fisioterapeuta Colegiada",
      colegiatura: "C.F.P. 6341",
      specialty: "Rehabilitación Deportiva y Readaptación",
      photo: "/images/doctor-1.jpg",
      patientsCount: 12,
      status: "Disponible",
      accessRole: "profesional",
    },
    {
      id: "pr4",
      name: "Lic. Roberto Mendoza",
      role: "Kinesiólogo Clínico",
      colegiatura: "C.F.P. 5892",
      specialty: "Reeducación Biomecánica y Goniometría",
      photo: "/images/doctor-2.jpg",
      patientsCount: 14,
      status: "En descanso",
      accessRole: "profesional",
    },
  ];

  // Manejador para agregar nota a historia clínica del paciente seleccionado
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    const newEntry = {
      id: "h-" + Date.now(),
      date: "Hoy · " + new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" }),
      author: "Dr. Alejandro Torres",
      role: "Director Médico",
      note: newNoteText,
    };
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedPatient.id
          ? { ...p, notes: [newEntry, ...p.notes] }
          : p
      )
    );
    setNewNoteText("");
    setIsNewNoteModalOpen(false);
    showToast(`Evolución registrada en la historia de ${selectedPatient.name} ✓`);
  };

  // Filtrado de pacientes
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      p.dni.includes(patientSearch) ||
      p.phone.includes(patientSearch);
    if (patientStatusFilter === "todos") return matchesSearch;
    return matchesSearch && p.status.toLowerCase() === patientStatusFilter.toLowerCase();
  });

  const citasPendientes = citasList.filter((c) => c.status === "pendiente").length;
  const citasAtendidas = citasList.filter((c) => c.status === "atendida").length;
  const citasVisibles = citasList.filter((c) => {
    if (doctorFilter === "mis_pacientes" && !c.doctor.includes("Alejandro")) return false;
    if (agendaFilter === "box") return c.status === "confirmada" || c.status === "en_box";
    if (agendaFilter === "pendientes") return c.status === "pendiente";
    return true;
  });

  return (
    <div className="flex h-screen bg-[#F4F6F8] font-sans antialiased text-slate-800 overflow-hidden">
      
      {/* Toast Flotante */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-[#0C3832] text-white px-4 py-2.5 rounded-xl shadow-xl border border-emerald-500/30 flex items-center gap-2 text-xs font-medium animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Backdrop para móvil */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* ========================================================= */}
      {/* 1. SIDEBAR LATERAL OSCURA (Verde Clínico con Contraste y Foto) */}
      {/* ========================================================= */}
      <aside
        className={`fixed lg:sticky top-0 inset-y-0 left-0 z-50 w-72 bg-[#062820] text-white shrink-0 flex flex-col justify-between p-4 h-screen select-none border-r border-[#0b3b32] transition-transform duration-300 ease-in-out relative overflow-hidden shadow-xl ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Contenido Superior: Logo + Navegación */}
        <div className="relative z-10">
          {/* Logo y Encabezado de la Sidebar */}
          <div className="flex items-center justify-between px-2 py-2.5 mb-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 group"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-emerald-400/25 flex items-center justify-center text-emerald-300 shadow-xs group-hover:scale-105 transition-transform backdrop-blur-xs">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="font-manrope font-bold text-sm tracking-tight block text-white leading-tight">
                  CT Siglo XXI
                </span>
                <span className="text-[10px] text-emerald-300 font-medium block">
                  Centro Terapéutico
                </span>
              </div>
            </Link>

            {/* Botón cerrar sidebar en móvil */}
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Etiqueta de Sección */}
          <div className="px-3 pt-0.5 pb-1.5 text-[9px] font-bold uppercase tracking-widest text-emerald-400/50 letter-spacing-widest">
            Módulos Asistenciales
          </div>

          {/* Menú de Navegación Vertical con los 10 Módulos */}
          <nav className="space-y-0.5 text-xs font-medium">
            {[
              { id: "inicio",         label: "Inicio",               icon: Home,          badge: null },
              { id: "pacientes",      label: "Pacientes",            icon: Users,         badge: 48 },
              { id: "expediente",     label: "Historia clínica",     icon: FileText,      badge: null },
              { id: "evaluacion",     label: "Evaluaciones",         icon: ClipboardCheck,badge: null },
              { id: "planes",         label: "Planes terapéuticos",  icon: Activity,      badge: null },
              { id: "sesiones",       label: "Sesiones",             icon: Clock,         badge: null },
              { id: "citas",          label: "Citas",                icon: Calendar,      badge: 4 },
              { id: "profesionales",  label: "Profesionales",        icon: Stethoscope,   badge: null },
              { id: "reportes",       label: "Reportes",             icon: BarChart3,     badge: null },
              { id: "configuracion",  label: "Configuración",        icon: Settings,      badge: null },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCurrentView(item.id as ClinicalViewType);
                    if (item.id === "expediente") {
                      setExpedienteTab("historia");
                    }
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer text-left ${
                    isActive
                      ? "bg-emerald-500/20 text-white font-bold border-l-2 border-emerald-400"
                      : "text-white/60 hover:bg-white/8 hover:text-white/90"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-emerald-300" : "text-white/40"}`} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge !== null && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
                      isActive
                        ? "bg-emerald-400/30 text-emerald-200"
                        : "bg-white/10 text-white/50"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Base: solo logout — el avatar ahora está en el topbar */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-end relative z-10">
          <LogoutButton
            variant="pro"
            iconOnly={true}
            className="w-8 h-8 rounded-lg hover:bg-white/10 text-emerald-200 hover:text-white flex items-center justify-center transition-colors"
          />
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. ÁREA DE CONTENIDO PRINCIPAL + TOPBAR                   */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        
        {/* TOPBAR BLANCA ELEVADA CON BUSCADOR Y SELECTOR DE SEDE */}
        <header className="h-14 shrink-0 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
          
          <div className="flex items-center gap-3">
            {/* Botón menú móvil */}
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 cursor-pointer"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Buscador Global */}
            <div className="relative w-56 sm:w-80 md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Buscar pacientes por DNI, nombre, patología..."
                className="w-full pl-10 pr-12 py-1.5 rounded-xl bg-slate-50/90 border border-slate-200/90 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-[#0B3B32] focus:ring-3 focus:ring-[#0B3B32]/10 transition-all"
              />
              <span className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-200/60">
                ⌘K
              </span>
            </div>
          </div>

          {/* Iconos de Notificación, Ayuda y Sede */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => showToast("No hay alertas críticas en el centro")}
              className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 relative cursor-pointer transition-colors"
              title="Notificaciones"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-2 right-2 ring-2 ring-white" />
            </button>

            <button
              type="button"
              onClick={() => showToast("Soporte Clínico CT Siglo XXI: +51 941 996 388")}
              className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer hidden sm:flex transition-colors"
              title="Ayuda y Soporte"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Selector de Sede */}
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200 text-xs font-semibold text-slate-700 hover:text-[#0B3B32] transition-colors py-1 cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden md:inline">Sede Jr. Sociego, Chachapoyas</span>
              <span className="md:hidden">CT Siglo XXI</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

        </header>

        {/* CONTENIDO INTERNO DE LA VISTA SELECCIONADA */}
        <main className="p-3.5 sm:p-4 lg:p-5 flex-1 flex flex-col min-h-0 overflow-hidden w-full max-w-[1600px] mx-auto">

          {/* ======================================================= */}
          {/* VISTA 1: INICIO (ESTACIÓN INTERACTIVA DE DOCTOR / 100vh) */}
          {/* ======================================================= */}
          {currentView === "inicio" && (
            <div className="flex-1 flex flex-col gap-3 min-h-0 overflow-hidden">
              
              {/* FILA 1: Encabezado Ejecutivo Clínico + Acciones Rápidas (shrink-0, ~46px) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden relative shrink-0 border-2 border-emerald-500/40 ring-2 ring-emerald-100 shadow-xs">
                    <Image
                      src="/images/doctor-alejandro.jpg"
                      alt="Dr. Alejandro Torres"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2.5">
                      <h1 className="font-manrope text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        Hola, Dr. Alejandro Torres
                      </h1>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-semibold text-[#0B3B32]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Sede Jr. Sociego
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-sans">
                      Director Médico · Rehabilitación Biomecánica · <span className="font-medium text-slate-700">Turno Matutino</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Selector Segmentado: Mis Pacientes / Toda la Sede */}
                  <div className="p-0.5 rounded-xl bg-slate-100 border border-slate-200/70 flex items-center text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setDoctorFilter("mis_pacientes")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        doctorFilter === "mis_pacientes"
                          ? "bg-white text-slate-900 shadow-2xs font-bold"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      Mis Pacientes ({citasList.filter((c) => c.doctor.includes("Alejandro")).length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setDoctorFilter("todos")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        doctorFilter === "todos"
                          ? "bg-white text-slate-900 shadow-2xs font-bold"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      Toda la Sede ({citasList.length})
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsNewPatientModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 text-xs font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-slate-400" />
                    <span>Nuevo Paciente</span>
                  </button>

                  {/* CTA primario — Deep Eucalyptus Teal de la referencia */}
                  <button
                    type="button"
                    onClick={() => setIsNewCitaModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#1E5B53] hover:bg-[#164E48] text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all duration-150 cursor-pointer group"
                  >
                    <Plus className="w-3.5 h-3.5 text-emerald-200 group-hover:rotate-90 transition-transform duration-200" />
                    <span>+ Programar Cita</span>
                  </button>
                </div>
              </div>

              {/* FILA 2: 4 Tarjetas KPI con Micro-Gráficos (Estilo Dribbble) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">

                {/* 1. Recuperación Activa (con onda ECG Heart Rate) */}
                <div
                  onClick={() => setCurrentView("pacientes")}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between gap-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Recuperación Funcional</span>
                    <button type="button" className="text-slate-400 hover:text-slate-600 cursor-pointer">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-baseline gap-1 my-0.5">
                    <span className="font-manrope text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-none">
                      78
                    </span>
                    <span className="text-xs font-semibold text-slate-400">% alta médica</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100/70 mt-0.5">
                    {/* SVG Micro ECG Wave */}
                    <div className="w-20 h-6 shrink-0">
                      <svg className="w-full h-full" viewBox="0 0 80 24" fill="none">
                        <path
                          d="M2,12 L18,12 L22,4 L28,20 L34,2 L40,22 L44,12 L56,12 L60,8 L64,16 L68,12 L78,12"
                          stroke="#14B8A6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium leading-tight text-right">
                      Evolución clínica +6.2% vs mes anterior
                    </span>
                  </div>
                </div>

                {/* 2. Citas Asistenciales (con onda rítmica de presión) */}
                <div
                  onClick={() => setCurrentView("citas")}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between gap-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Citas Asistenciales</span>
                    <button type="button" className="text-slate-400 hover:text-slate-600 cursor-pointer">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-baseline gap-1 my-0.5">
                    <span className="font-manrope text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-none">
                      12
                    </span>
                    <span className="text-xs font-semibold text-slate-400">citas hoy</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100/70 mt-0.5">
                    {/* SVG Smooth Rhythm Wave */}
                    <div className="w-20 h-6 shrink-0">
                      <svg className="w-full h-full" viewBox="0 0 80 24" fill="none">
                        <path
                          d="M2,16 Q12,6 24,14 T48,10 T72,14 T78,12"
                          stroke="#0D9488"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium leading-tight text-right">
                      8 atendidas · 4 pendientes de turno
                    </span>
                  </div>
                </div>

                {/* 3. Ocupación de Boxes (con micro gráfico de barras) */}
                <div
                  onClick={() => setInicioTab("boxes")}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between gap-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Ocupación de Boxes</span>
                    <button type="button" className="text-slate-400 hover:text-slate-600 cursor-pointer">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-baseline gap-1 my-0.5">
                    <span className="font-manrope text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-none">
                      75%
                    </span>
                    <span className="text-xs font-semibold text-slate-400">3 de 4 en uso</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100/70 mt-0.5">
                    {/* SVG Micro Bar Chart */}
                    <div className="w-20 h-6 shrink-0">
                      <svg className="w-full h-full" viewBox="0 0 80 24" fill="none">
                        <rect x="4"  y="12" width="4" height="12" rx="1.5" fill="#2DD4BF" />
                        <rect x="13" y="6"  width="4" height="18" rx="1.5" fill="#14B8A6" />
                        <rect x="22" y="14" width="4" height="10" rx="1.5" fill="#2DD4BF" />
                        <rect x="31" y="2"  width="4" height="22" rx="1.5" fill="#14B8A6" />
                        <rect x="40" y="8"  width="4" height="16" rx="1.5" fill="#2DD4BF" />
                        <rect x="49" y="4"  width="4" height="20" rx="1.5" fill="#14B8A6" />
                        <rect x="58" y="10" width="4" height="14" rx="1.5" fill="#2DD4BF" />
                        <rect x="67" y="6"  width="4" height="18" rx="1.5" fill="#14B8A6" />
                      </svg>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium leading-tight text-right">
                      Box 1, Box 2 y Gimnasio activos
                    </span>
                  </div>
                </div>

                {/* 4. Adherencia Pautas (con barras segmentadas) */}
                <div
                  onClick={() => setInicioTab("evolucion")}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between gap-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Adherencia Pautas</span>
                    <button type="button" className="text-slate-400 hover:text-slate-600 cursor-pointer">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-baseline gap-1 my-0.5">
                    <span className="font-manrope text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-none">
                      91.4%
                    </span>
                    <span className="text-xs font-semibold text-slate-400">cumplimiento</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100/70 mt-0.5">
                    {/* SVG Segmented Pill Bars */}
                    <div className="w-20 h-6 shrink-0">
                      <svg className="w-full h-full" viewBox="0 0 80 24" fill="none">
                        {[0, 8, 16, 24, 32, 40, 48, 56].map((x) => (
                          <rect key={x} x={x} y="4" width="4" height="16" rx="2" fill="#14B8A6" />
                        ))}
                        {[64, 72].map((x) => (
                          <rect key={x} x={x} y="4" width="4" height="16" rx="2" fill="#E2E8F0" />
                        ))}
                      </svg>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium leading-tight text-right">
                      34 de 37 pacientes al día en pauta
                    </span>
                  </div>
                </div>
              </div>

              {/* FILA 3: BENTO GRID DE ALTA DENSIDAD CLÍNICA (Treatment Progress + Próximas citas) */}
              <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
                
                {/* PANEL IZQUIERDO (7 Columnas): Treatment Progress Overview */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 flex flex-col min-h-0">
                  {/* Encabezado con Leyendas y Pestañas Integradas */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100 shrink-0">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-manrope">
                        Progreso Clínico & Tratamientos
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Evolución funcional y respuesta terapéutica global
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Leyendas estilo Dribbble */}
                      <div className="hidden sm:flex items-center gap-3 text-xs font-semibold text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-sm bg-[#14B8A6]" />
                          Progreso
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-sm bg-[#93C5FD]" />
                          Recuperación
                        </span>
                      </div>

                      {/* Selector de periodo dropdown */}
                      <div className="p-0.5 rounded-xl bg-slate-100 border border-slate-200/70 flex items-center text-xs font-semibold">
                        {(["30d", "90d", "1a"] as const).map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setChartPeriod(p)}
                            className={`px-2.5 py-0.5 rounded-lg transition-all cursor-pointer uppercase ${
                              chartPeriod === p
                                ? "bg-white text-slate-900 font-bold shadow-2xs"
                                : "text-slate-500 hover:text-slate-900"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Subpestañas rápidas de visualización */}
                  <div className="flex items-center gap-2 pt-2 pb-1 text-xs font-semibold shrink-0">
                    <button
                      type="button"
                      onClick={() => setInicioTab("evolucion")}
                      className={`px-3 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                        inicioTab === "evolucion"
                          ? "bg-[#1E5B53] text-white font-bold shadow-2xs"
                          : "bg-slate-100 text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>Gráfico Clínico</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setInicioTab("boxes")}
                      className={`px-3 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                        inicioTab === "boxes"
                          ? "bg-[#1E5B53] text-white font-bold shadow-2xs"
                          : "bg-slate-100 text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Building className="w-3.5 h-3.5" />
                      <span>Monitor Boxes (4)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setInicioTab("actividad")}
                      className={`px-3 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                        inicioTab === "actividad"
                          ? "bg-[#1E5B53] text-white font-bold shadow-2xs"
                          : "bg-slate-100 text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Actividad en Vivo</span>
                    </button>
                  </div>

                  {/* CONTENIDO INTERACTIVO DEL PANEL IZQUIERDO */}
                  <div className="flex-1 min-h-0 pt-1 flex flex-col">
                    {/* 1. GRÁFICO CLÍNICO MULTI-BARRA (Estilo exacto de la referencia Dribbble) */}
                    {inicioTab === "evolucion" && (
                      <div className="flex-1 min-h-0 flex flex-col justify-between">
                        {/* Gráfico SVG de barras de tratamiento médico */}
                        <div className="flex-1 min-h-[120px] w-full">
                          <svg className="w-full h-full" viewBox="0 0 520 160" preserveAspectRatio="none">
                            {/* Líneas horizontales de guía con Y-labels */}
                            <line x1="32" y1="20"  x2="510" y2="20"  stroke="#F1F5F9" strokeWidth="1.2" strokeDasharray="3 3" />
                            <line x1="32" y1="60"  x2="510" y2="60"  stroke="#F1F5F9" strokeWidth="1.2" strokeDasharray="3 3" />
                            <line x1="32" y1="100" x2="510" y2="100" stroke="#F1F5F9" strokeWidth="1.2" strokeDasharray="3 3" />
                            <line x1="32" y1="140" x2="510" y2="140" stroke="#E2E8F0" strokeWidth="1.5" />

                            {/* Etiquetas del eje Y */}
                            <text x="2" y="24"  fill="#94A3B8" fontSize="8" fontWeight="600">150</text>
                            <text x="2" y="64"  fill="#94A3B8" fontSize="8" fontWeight="600">100</text>
                            <text x="2" y="104" fill="#94A3B8" fontSize="8" fontWeight="600">50</text>
                            <text x="10" y="143" fill="#94A3B8" fontSize="8" fontWeight="600">0</text>

                            {/* Barras verticales con ritmo y alturas realistas estilo Dribbble */}
                            {[
                              { x: 42,  h1: 30, h2: 45 },
                              { x: 58,  h1: 60, h2: 30 },
                              { x: 74,  h1: 85, h2: 25 },
                              { x: 90,  h1: 45, h2: 70 },
                              { x: 106, h1: 110, h2: 35 },
                              { x: 122, h1: 75, h2: 60 },
                              { x: 138, h1: 95, h2: 40 },
                              { x: 154, h1: 65, h2: 80 },
                              { x: 170, h1: 105, h2: 30 },
                              { x: 186, h1: 80, h2: 65 },
                              { x: 202, h1: 50, h2: 90 },
                              { x: 218, h1: 120, h2: 20 },
                              { x: 234, h1: 90, h2: 55 },
                              { x: 250, h1: 70, h2: 75 },
                              { x: 266, h1: 85, h2: 45 },
                              { x: 282, h1: 40, h2: 100 },
                              { x: 298, h1: 115, h2: 25 },
                              { x: 314, h1: 65, h2: 70 },
                              { x: 330, h1: 95, h2: 50 },
                              { x: 346, h1: 80, h2: 60 },
                              { x: 362, h1: 55, h2: 85 },
                              { x: 378, h1: 100, h2: 35 },
                              { x: 394, h1: 75, h2: 65 },
                              { x: 410, h1: 125, h2: 15 },
                              { x: 426, h1: 85, h2: 55 },
                              { x: 442, h1: 60, h2: 80 },
                              { x: 458, h1: 110, h2: 30 },
                              { x: 474, h1: 90, h2: 45 },
                              { x: 490, h1: 70, h2: 70 },
                            ].map((bar, idx) => (
                              <g key={idx}>
                                {/* Barra de Recuperación (Azul Suave #93C5FD) */}
                                <rect
                                  x={bar.x}
                                  y={140 - bar.h2}
                                  width="5.5"
                                  height={bar.h2}
                                  rx="2"
                                  fill="#BAE6FD"
                                  opacity="0.85"
                                />
                                {/* Barra de Progreso Principal (Verde Menta #14B8A6) */}
                                <rect
                                  x={bar.x + 6.5}
                                  y={140 - bar.h1}
                                  width="5.5"
                                  height={bar.h1}
                                  rx="2"
                                  fill="#14B8A6"
                                />
                              </g>
                            ))}

                            {/* Etiquetas de Días en Eje X */}
                            <text x="65"  y="155" fill="#94A3B8" fontSize="8" fontWeight="600" textAnchor="middle">LUN</text>
                            <text x="135" y="155" fill="#94A3B8" fontSize="8" fontWeight="600" textAnchor="middle">MAR</text>
                            <text x="210" y="155" fill="#94A3B8" fontSize="8" fontWeight="600" textAnchor="middle">MIÉ</text>
                            <text x="285" y="155" fill="#94A3B8" fontSize="8" fontWeight="600" textAnchor="middle">JUE</text>
                            <text x="360" y="155" fill="#94A3B8" fontSize="8" fontWeight="600" textAnchor="middle">VIE</text>
                            <text x="435" y="155" fill="#94A3B8" fontSize="8" fontWeight="600" textAnchor="middle">SÁB</text>
                            <text x="485" y="155" fill="#94A3B8" fontSize="8" fontWeight="600" textAnchor="middle">DOM</text>
                          </svg>
                        </div>

                        {/* Pie con métricas de alta y evolución */}
                        <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 shrink-0">
                          <div className="py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-semibold">Alta media:</span>
                            <strong className="font-manrope text-xs font-bold text-slate-900">4.2 sem.</strong>
                          </div>
                          <div className="py-1.5 px-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between">
                            <span className="text-[10px] text-emerald-800 font-semibold">Reducción EVA:</span>
                            <strong className="font-manrope text-xs font-bold text-emerald-900">−4.8 pts</strong>
                          </div>
                          <div className="py-1.5 px-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 font-semibold">Altas este mes:</span>
                            <strong className="font-manrope text-xs font-bold text-slate-900">18 pacientes</strong>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 2. MONITOR DE BOXES INTERACTIVO */}
                    {inicioTab === "boxes" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1 min-h-0 overflow-y-auto">
                        {boxesState.map((box) => (
                          <div
                            key={box.id}
                            className={`p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                              box.status === "ocupado"
                                ? "bg-emerald-50/40 border-emerald-200"
                                : box.status === "disponible"
                                ? "bg-slate-50/80 border-slate-200"
                                : "bg-cyan-50/40 border-cyan-200"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="font-manrope font-bold text-xs text-slate-900">{box.name}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize inline-flex items-center gap-1 ${
                                  box.status === "ocupado"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : box.status === "disponible"
                                    ? "bg-slate-200/80 text-slate-700"
                                    : "bg-cyan-100 text-cyan-800"
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${
                                    box.status === "ocupado" ? "bg-emerald-600 animate-pulse" : box.status === "disponible" ? "bg-slate-400" : "bg-cyan-600"
                                  }`} />
                                  {box.status}
                                </span>
                              </div>
                              <p className="text-xs text-slate-800 font-bold truncate mt-1.5">{box.patient}</p>
                              <p className="text-[10px] text-slate-500 font-medium truncate">{box.procedure}</p>
                            </div>

                            <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-200/60 text-[11px]">
                              <span className="text-slate-500 font-medium truncate max-w-[130px]">{box.doc}</span>
                              <button
                                type="button"
                                onClick={() => handleToggleBoxStatus(box.id)}
                                className="font-bold text-xs text-[#1E5B53] hover:text-[#164E48] hover:underline cursor-pointer"
                              >
                                {box.status === "ocupado" ? "Liberar Box" : "Asignar Box"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 3. ACTIVIDAD CLÍNICA EN VIVO */}
                    {inicioTab === "actividad" && (
                      <div className="space-y-2 flex-1 min-h-0 overflow-y-auto pr-1">
                        {[
                          { title: "Nuevo paciente registrado", detail: "Diego Pérez · DNI 74321098 · Esguince Tobillo", time: "09:24", color: "bg-teal-500" },
                          { title: "Sesión completada en Box 1", detail: "María López · Terapia Manual Lumbar", time: "08:45", color: "bg-emerald-500" },
                          { title: "Plan terapéutico actualizado", detail: "Carlos Mendoza · Fase 2 Readaptación", time: "Ayer 17:32", color: "bg-emerald-700" },
                          { title: "Evaluación inicial registrada", detail: "Ana Torres · Cervicobraquialgia", time: "Ayer 16:20", color: "bg-teal-600" },
                        ].map((act, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className={`w-2 h-2 rounded-full shrink-0 ${act.color}`} />
                              <div className="min-w-0">
                                <strong className="text-slate-900 block text-xs truncate">{act.title}</strong>
                                <span className="text-[10px] text-slate-500 block truncate">{act.detail}</span>
                              </div>
                            </div>
                            <span className="font-mono text-[10px] text-slate-400 shrink-0">{act.time}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* PANEL DERECHO (5 Columnas): Próximas citas con Mini Calendario Circular Idéntico a la Referencia */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-4 flex flex-col min-h-0 justify-between">
                  <div className="space-y-2.5">
                    {/* Header: Título de Sección */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                      <h3 className="text-sm font-bold text-slate-900 font-manrope">
                        Próximas citas
                      </h3>
                      <button
                        type="button"
                        onClick={() => setCurrentView("citas")}
                        className="text-xs font-semibold text-slate-500 hover:text-[#3D8C7C] cursor-pointer"
                      >
                        Ver detalles
                      </button>
                    </div>

                    {/* Subheader: Mes + Botones circulares de navegación */}
                    <div className="flex items-center justify-between">
                      <span className="font-manrope font-bold text-sm text-slate-900">
                        Septiembre 2025
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => showToast("Mes anterior")}
                          className="w-6 h-6 rounded-full bg-[#F3F4F6] hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                          title="Anterior"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast("Mes siguiente")}
                          className="w-6 h-6 rounded-full bg-[#3D8C7C] hover:bg-[#2F7E71] flex items-center justify-center text-white shadow-xs transition-colors cursor-pointer"
                          title="Siguiente"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Leyenda exacta de la imagen de referencia */}
                    <div className="flex items-center gap-3.5 text-[11px] font-medium text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#DDEBFC]" />
                        Disponible
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#3D8C7C]" />
                        Seleccionado
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs bg-[#F0F2F5]" />
                        No disponible
                      </span>
                    </div>

                    {/* Días de la semana */}
                    <div className="grid grid-cols-7 text-center text-[11px] font-medium text-slate-500 py-0.5">
                      <span>Dom</span>
                      <span>Lun</span>
                      <span>Mar</span>
                      <span>Mié</span>
                      <span>Jue</span>
                      <span>Vie</span>
                      <span>Sáb</span>
                    </div>

                    {/* Grid de 35 fechas circulares idénticas a la imagen de referencia */}
                    <div className="grid grid-cols-7 gap-y-1 text-center text-xs">
                      {[
                        // Fila 1
                        { id: 1,  day: "01", status: "plain" },
                        { id: 2,  day: "02", status: "unavailable" },
                        { id: 3,  day: "03", status: "unavailable" },
                        { id: 4,  day: "04", status: "unavailable" },
                        { id: 5,  day: "05", status: "unavailable" },
                        { id: 6,  day: "06", status: "unavailable" },
                        { id: 7,  day: "08", status: "unavailable" },
                        // Fila 2
                        { id: 8,  day: "09", status: "available" },
                        { id: 9,  day: "10", status: "available" },
                        { id: 10, day: "11", status: "available" },
                        { id: 11, day: "12", status: "available" },
                        { id: 12, day: "13", status: "available" },
                        { id: 13, day: "14", status: "available" },
                        { id: 14, day: "15", status: "available" },
                        // Fila 3
                        { id: 15, day: "16", status: "unavailable" },
                        { id: 16, day: "17", status: "unavailable" },
                        { id: 17, day: "18", status: "unavailable" },
                        { id: 18, day: "19", status: "available" },
                        { id: 19, day: "20", status: "available" },
                        { id: 20, day: "21", status: "available" },
                        { id: 21, day: "22", status: "available" },
                        // Fila 4
                        { id: 22, day: "23", status: "available" },
                        { id: 23, day: "24", status: "available" },
                        { id: 24, day: "25", status: "selected" },
                        { id: 25, day: "26", status: "unavailable" },
                        { id: 26, day: "27", status: "unavailable" },
                        { id: 27, day: "28", status: "unavailable" },
                        { id: 28, day: "29", status: "unavailable" },
                        // Fila 5
                        { id: 29, day: "30", status: "available" },
                        { id: 30, day: "31", status: "available" },
                        { id: 31, day: "01", status: "available" },
                        { id: 32, day: "02", status: "available" },
                        { id: 33, day: "03", status: "available" },
                        { id: 34, day: "04", status: "available" },
                        { id: 35, day: "05", status: "unavailable" },
                      ].map((item) => {
                        const isSelected = selectedCalendarDay === item.id || (selectedCalendarDay === 25 && item.id === 24);
                        return (
                          <div key={item.id} className="flex items-center justify-center py-0.5">
                            {isSelected ? (
                              <button
                                type="button"
                                onClick={() => setSelectedCalendarDay(item.id)}
                                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#3D8C7C] text-white font-bold flex items-center justify-center shadow-xs ring-2 ring-[#3D8C7C]/25 cursor-pointer text-xs"
                              >
                                {item.day}
                              </button>
                            ) : item.status === "available" ? (
                              <button
                                type="button"
                                onClick={() => setSelectedCalendarDay(item.id)}
                                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#DDEBFC] text-[#1E3A8A] font-semibold hover:brightness-95 flex items-center justify-center cursor-pointer text-xs"
                              >
                                {item.day}
                              </button>
                            ) : item.status === "unavailable" ? (
                              <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#F0F2F5] text-slate-700 font-medium flex items-center justify-center text-xs">
                                {item.day}
                              </div>
                            ) : (
                              <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 flex items-center justify-center text-slate-700 font-medium text-xs">
                                {item.day}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sección Inferior: Mis citas (Estilo Dribbble) */}
                  <div className="pt-2.5 border-t border-slate-100 shrink-0">
                    <div className="flex items-center justify-between pb-1.5">
                      <span className="font-manrope font-bold text-xs text-slate-900">
                        Mis citas
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Día 25 · 10:30 a. m.
                      </span>
                    </div>

                    {/* Tarjeta de la Cita */}
                    <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/70 transition-all flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0 border border-slate-200">
                          <Image
                            src="/images/doctor-alejandro.jpg"
                            alt="Dr. Alejandro Torres"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="font-manrope font-bold text-xs text-slate-900 block truncate">
                            Dr. Alejandro Torres
                          </span>
                          <span className="text-[10px] text-slate-500 block truncate">
                            Reeducación Biomecánica · Gabinete 1
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[10px] font-bold text-[#1E3A8A] bg-[#DDEBFC] px-2 py-0.5 rounded-full">
                          Confirmada
                        </span>
                        <span className="font-mono text-[10px] text-slate-500 font-semibold">
                          10:30–11:00 a. m.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ======================================================= */}
          {/* VISTA 2: PACIENTES (SCREEN 3 DE LA REFERENCIA)          */}
          {/* ======================================================= */}
          {currentView === "pacientes" && (
            <div className="space-y-5">
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                    Directorio Clínico de Pacientes
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Total: {patients.length} pacientes registrados en Centro Terapéutico Siglo XXI
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsNewPatientModalOpen(true)}
                  className="bg-[#0C3832] hover:bg-[#07241E] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo paciente</span>
                </button>
              </div>

              {/* Filtros y Buscador */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={patientSearch}
                    onChange={(e) => setPatientSearch(e.target.value)}
                    placeholder="Buscar paciente por nombre, DNI, teléfono..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#0C3832]"
                  />
                </div>

                {/* Filtro por estado */}
                <select
                  value={patientStatusFilter}
                  onChange={(e) => setPatientStatusFilter(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="en tratamiento">En tratamiento</option>
                  <option value="en evaluación">En evaluación</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              {/* Tabla de Pacientes */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[680px]">
                    <thead className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase">
                      <tr>
                        <th className="py-3 px-4">Nombre</th>
                        <th className="py-3 px-4">DNI</th>
                        <th className="py-3 px-4">Edad</th>
                        <th className="py-3 px-4">Teléfono</th>
                        <th className="py-3 px-4">Última sesión</th>
                        <th className="py-3 px-4">Profesional</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPatients.map((p) => (
                        <tr
                          key={p.id}
                          onClick={() => {
                            setSelectedPatientId(p.id);
                            setCurrentView("expediente");
                            setExpedienteTab("resumen");
                          }}
                          className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                        >
                          <td className="py-3 px-4 flex items-center gap-2.5">
                            {p.avatarImg ? (
                              <div className="w-8 h-8 rounded-full overflow-hidden relative border border-slate-200 shrink-0">
                                <Image src={p.avatarImg} alt={p.name} fill className="object-cover" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#0C3832] font-bold text-[10px] flex items-center justify-center shrink-0">
                                {p.initials}
                              </div>
                            )}
                            <span className="font-semibold text-slate-900">{p.name}</span>
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-600">{p.dni}</td>
                          <td className="py-3 px-4 text-slate-600">{p.age}</td>
                          <td className="py-3 px-4 text-slate-600 font-mono">{p.phone}</td>
                          <td className="py-3 px-4 text-slate-600">{p.lastSession}</td>
                          <td className="py-3 px-4 text-slate-600 font-medium">{p.assignedDoc}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                                p.status === "En tratamiento"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                                  : "bg-blue-50 text-blue-700 border border-blue-200/80"
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Mostrando {filteredPatients.length} de {patients.length} pacientes</span>
                  <div className="flex items-center gap-1 font-semibold">
                    <button type="button" className="p-1 hover:bg-slate-100 rounded">‹</button>
                    <button type="button" className="w-6 h-6 rounded bg-[#0C3832] text-white flex items-center justify-center">1</button>
                    <button type="button" className="p-1 hover:bg-slate-100 rounded">›</button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ======================================================= */}
          {/* VISTA 3: EXPEDIENTE CLÍNICO (SCREENS 4 & 5)             */}
          {/* ======================================================= */}
          {currentView === "expediente" && (
            <div className="space-y-5">
              
              {/* Cabecera del Paciente Dinámica */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  {selectedPatient.avatarImg ? (
                    <div className="w-14 h-14 rounded-full overflow-hidden relative border border-slate-200 shrink-0">
                      <Image
                        src={selectedPatient.avatarImg}
                        alt={selectedPatient.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#0C3832] font-bold text-lg flex items-center justify-center shrink-0 border border-emerald-200">
                      {selectedPatient.initials}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900 leading-tight">
                        {selectedPatient.name}
                      </h2>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        selectedPatient.status === "En tratamiento"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}>
                        {selectedPatient.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
                      <span>DNI: {selectedPatient.dni}</span>
                      <span>Edad: {selectedPatient.age} años</span>
                      <span>Tel: {selectedPatient.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentView("evaluacion");
                    }}
                    className="bg-[#0C3832] text-white hover:bg-[#07241E] px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Nueva evaluación</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast(`Modo edición de datos habilitado para ${selectedPatient.name}`)}
                    className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editar</span>
                  </button>
                </div>
              </div>

              {/* Barra de Subpestañas del Expediente */}
              <div className="flex border-b border-slate-200 text-xs font-semibold text-slate-500 gap-4 sm:gap-6 overflow-x-auto">
                {[
                  { id: "resumen", label: "Resumen" },
                  { id: "historia", label: "Historia clínica" },
                  { id: "evaluaciones", label: "Evaluaciones" },
                  { id: "planes", label: "Planes terapéuticos" },
                  { id: "sesiones", label: "Sesiones" },
                  { id: "citas", label: "Citas" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setExpedienteTab(tab.id as any);
                      if (tab.id === "evaluaciones") setCurrentView("evaluacion");
                      if (tab.id === "planes") setCurrentView("planes");
                      if (tab.id === "sesiones") setCurrentView("sesiones");
                      if (tab.id === "citas") setCurrentView("citas");
                    }}
                    className={`pb-2.5 transition-all cursor-pointer whitespace-nowrap ${
                      expedienteTab === tab.id
                        ? "text-[#0C3832] border-b-2 border-[#0C3832] font-bold"
                        : "hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* PESTAÑA A: RESUMEN DEL PACIENTE SELECCIONADO */}
              {expedienteTab === "resumen" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* 1. Información General */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Información general
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Fecha de ingreso</span>
                        <span className="font-semibold text-slate-800">{selectedPatient.admissionDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Motivo de consulta</span>
                        <span className="font-semibold text-slate-800 leading-snug">{selectedPatient.consultationReason}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Diagnóstico (referencial)</span>
                        <span className="font-semibold text-slate-800 leading-snug">{selectedPatient.diagnosis}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Profesional asignado</span>
                        <span className="font-semibold text-slate-800">{selectedPatient.assignedDoc}</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Progreso del Tratamiento Dinámico */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between items-center text-center">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider self-start">
                      Progreso del tratamiento
                    </h3>
                    <div className="relative w-28 h-28 my-2 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" fill="none" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#0C3832"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 * (1 - selectedPatient.progress / 100)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute font-extrabold text-2xl text-slate-900">{selectedPatient.progress}%</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Mejora percibida</span>
                      <span className="text-[11px] text-emerald-700 font-medium">{selectedPatient.progressStatus}</span>
                    </div>
                  </div>

                  {/* 3. Plan Actual Dinámico */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        Plan actual
                      </h3>
                      <strong className="text-sm font-bold text-slate-900 block leading-tight">
                        {selectedPatient.planName}
                      </strong>
                      <span className="text-[11px] text-slate-500 font-medium block mt-1">
                        (Inicio: {selectedPatient.planStartDate})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentView("planes");
                      }}
                      className="mt-4 border border-slate-200 hover:bg-slate-50 text-slate-700 py-1.5 px-3 rounded-xl text-xs font-semibold self-start flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>Ver plan</span>
                    </button>
                  </div>

                  {/* 4. Próximas Sesiones */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        Próximas sesiones
                      </h3>
                      <div className="space-y-1.5 text-xs">
                        {selectedPatient.upcomingSessions.map((s, idx) => (
                          <div key={idx} className="flex items-center justify-between text-slate-700">
                            <span>📅 {s.date}</span>
                            <span className="font-mono text-slate-500 text-[11px]">{s.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentView("sesiones")}
                      className="text-[11px] text-[#0C3832] font-semibold hover:underline mt-3 self-start"
                    >
                      Ver todas →
                    </button>
                  </div>
                </div>
              )}

              {/* PESTAÑA B: HISTORIA CLÍNICA (LÍNEA DE TIEMPO) */}
              {expedienteTab === "historia" && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Línea de Tiempo de Evolución Clínica
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Registro cronológico de {selectedPatient.name} (DNI {selectedPatient.dni})
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsNewNoteModalOpen(true)}
                      className="bg-[#0C3832] hover:bg-[#07241E] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Nueva nota</span>
                    </button>
                  </div>

                  {/* Timeline vertical dinámico */}
                  <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {selectedPatient.notes.map((item) => (
                      <div key={item.id} className="relative">
                        <span className="w-3 h-3 rounded-full bg-[#0C3832] border-2 border-white absolute -left-6 top-1 ring-2 ring-slate-200" />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-xs text-slate-900">{item.date}</span>
                            <span className="text-[11px] text-slate-500 font-medium">· {item.author} ({item.role})</span>
                          </div>
                          <p className="text-xs text-slate-700 bg-slate-50/70 p-3 rounded-xl border border-slate-100 leading-relaxed">
                            {item.note}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ======================================================= */}
          {/* VISTA 4: NUEVA EVALUACIÓN (SCREEN 6 DE LA REFERENCIA)   */}
          {/* ======================================================= */}
          {currentView === "evaluacion" && (
            <div className="space-y-5">
              
              {/* Breadcrumb y Botón Borrador */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <button
                      type="button"
                      onClick={() => setCurrentView("expediente")}
                      className="hover:text-slate-700 cursor-pointer"
                    >
                      Evaluaciones
                    </button>
                    <span>›</span>
                    <span className="text-slate-800 font-bold">Nueva evaluación</span>
                  </div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
                    Evaluación Clínica Funcional
                  </h1>
                </div>

                <button
                  type="button"
                  onClick={() => showToast("Borrador guardado exitosamente")}
                  className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer shadow-2xs"
                >
                  Guardar borrador
                </button>
              </div>

              {/* Banner Resumen del Paciente */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center gap-3">
                {selectedPatient.avatarImg ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden relative border border-slate-200 shrink-0">
                    <Image src={selectedPatient.avatarImg} alt={selectedPatient.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0C3832] font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200">
                    {selectedPatient.initials}
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="font-bold text-slate-900">{selectedPatient.name}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500 font-mono">DNI: {selectedPatient.dni}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">Edad: {selectedPatient.age} años</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-emerald-700 font-medium">{selectedPatient.diagnosis}</span>
                </div>
              </div>

              {/* Formulario Principal de Evaluación */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  1. Registro de Evaluación / Seguimiento
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Fecha de evaluación</label>
                    <input
                      type="date"
                      defaultValue="2025-04-12"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tipo de evaluación</label>
                    <select className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium">
                      <option>Evaluación Inicial</option>
                      <option>Reevaluación de Control</option>
                      <option>Evaluación de Alta Funcional</option>
                    </select>
                  </div>
                </div>

                {/* Subpestañas del Formulario */}
                <div className="flex border-b border-slate-200 text-xs font-semibold text-slate-500 gap-6 pt-2">
                  {[
                    { id: "signos", label: "Signos y síntomas" },
                    { id: "fisico", label: "Examen físico" },
                    { id: "escalas", label: "Escalas funcionales" },
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setEvalSubtab(sub.id as any)}
                      className={`pb-2.5 transition-all cursor-pointer ${
                        evalSubtab === sub.id
                          ? "text-[#0C3832] border-b-2 border-[#0C3832] font-bold"
                          : "hover:text-slate-900"
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

                {/* Contenido de Signos y Síntomas */}
                <div className="space-y-4 text-xs pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-bold text-slate-700">Dolor percibido (Escala EVA)</label>
                        <span className="font-bold text-[#0C3832] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {evalDolor} / 10
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={evalDolor}
                        onChange={(e) => setEvalDolor(Number(e.target.value))}
                        className="w-full accent-[#0C3832]"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Duración del dolor</label>
                      <select
                        value={evalDuracion}
                        onChange={(e) => setEvalDuracion(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                      >
                        <option>Menos de 1 mes (Agudo)</option>
                        <option>1 - 6 meses (Subagudo)</option>
                        <option>6 meses - 1 año (Crónico)</option>
                        <option>Más de 1 año (Crónico refractario)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold text-slate-700">Observaciones y Hallazgos Clínicos</label>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {evalObservaciones.length}/500
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={evalObservaciones}
                      onChange={(e) => setEvalObservaciones(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0C3832] font-medium leading-relaxed"
                    />
                  </div>

                  <div>
                    <span className="font-bold text-slate-700 block mb-1.5">Banderas Rojas (Red Flags)</span>
                    <label className="inline-flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={evalRedFlags}
                        onChange={(e) => setEvalRedFlags(e.target.checked)}
                        className="rounded border-slate-300 text-[#0C3832] focus:ring-[#0C3832]"
                      />
                      <span>No presenta signos de alarma, déficit motor progresivo ni pérdida de control de esfínteres</span>
                    </label>
                  </div>
                </div>

                {/* Botones de Acción */}
                <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setCurrentView("expediente")}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      showToast("Evaluación clínica registrada con éxito en Supabase");
                      setCurrentView("expediente");
                    }}
                    className="px-5 py-2 rounded-xl bg-[#0C3832] hover:bg-[#07241E] text-white font-bold text-xs shadow-md shadow-emerald-950/20 cursor-pointer"
                  >
                    Guardar evaluación
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ======================================================= */}
          {/* VISTA 5: PLAN TERAPÉUTICO (SCREEN 7 DE LA REFERENCIA)   */}
          {/* ======================================================= */}
          {currentView === "planes" && (
            <div className="space-y-5">
              
              {/* Header Paciente Dinámico */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center gap-3">
                {selectedPatient.avatarImg ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden relative border border-slate-200 shrink-0">
                    <Image src={selectedPatient.avatarImg} alt={selectedPatient.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#0C3832] font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200">
                    {selectedPatient.initials}
                  </div>
                )}
                <div>
                  <h2 className="text-base font-bold text-slate-900 leading-tight">
                    {selectedPatient.name}
                  </h2>
                  <span className="text-xs text-slate-500 font-mono">DNI: {selectedPatient.dni} · Diagnóstico: {selectedPatient.diagnosis}</span>
                </div>
              </div>

              {/* Subtabs del Expediente */}
              <div className="flex border-b border-slate-200 text-xs font-semibold text-slate-500 gap-6">
                {[
                  { id: "resumen", label: "Resumen" },
                  { id: "planes", label: "Planes terapéuticos", active: true },
                  { id: "ejercicios", label: "Ejercicios" },
                  { id: "evolucion", label: "Evolución" },
                ].map((tab, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      if (tab.id === "resumen") {
                        setCurrentView("expediente");
                        setExpedienteTab("resumen");
                      }
                    }}
                    className={`pb-2.5 transition-all cursor-pointer ${
                      tab.active
                        ? "text-[#0C3832] border-b-2 border-[#0C3832] font-bold"
                        : "hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Ficha del Plan Terapéutico Dinámico */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {selectedPatient.planName}
                    </h3>
                    <span className="text-xs text-slate-500">
                      Inicio: {selectedPatient.planStartDate} · Duración estimada: {selectedPatient.planDuration}
                    </span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
                    Activo
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  
                  {/* Objetivos Dinámicos */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Objetivos Terapéuticos
                    </h4>
                    <div className="space-y-2 text-xs text-slate-700">
                      {selectedPatient.objectives.map((obj, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ejercicios Principales con Miniaturas Dinámicos */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Ejercicios Prescritos (Biblioteca Siglo XXI)
                    </h4>
                    
                    <div className="space-y-2.5">
                      {selectedPatient.exercises.map((ex, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/70 transition-colors"
                        >
                          <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-200 relative shrink-0">
                            <Image
                              src={ex.img}
                              alt={ex.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-xs text-slate-900 block leading-tight">
                              {ex.name}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium">
                              {ex.dose}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <Link
                    href="/pauta"
                    className="border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold shadow-2xs"
                  >
                    Ver vista del paciente
                  </Link>
                  <button
                    type="button"
                    onClick={() => showToast("Plan terapéutico exportado en PDF membretado")}
                    className="bg-[#0C3832] hover:bg-[#07241E] text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer shadow-2xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Ver plan completo</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ======================================================= */}
          {/* VISTA 6: SESIONES / AGENDA (SCREEN 8 DE LA REFERENCIA)  */}
          {/* ======================================================= */}
          {currentView === "sesiones" && (
            <div className="space-y-5">
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                    Sesiones en Box & Gabinetes
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Programación asistencial y control de box en Centro Terapéutico Siglo XXI
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsNewCitaModalOpen(true)}
                  className="bg-[#0C3832] hover:bg-[#07241E] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nueva sesión</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                
                {/* Calendario de Abril 2025 (5 cols) */}
                <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between font-bold text-xs text-slate-800">
                    <span>Abril 2025</span>
                    <div className="flex items-center gap-1">
                      <button type="button" className="p-1 hover:bg-slate-100 rounded">‹</button>
                      <button type="button" className="p-1 hover:bg-slate-100 rounded">›</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {["L", "M", "X", "J", "V", "S", "D"].map((day, i) => (
                      <span key={i} className="font-bold text-slate-400 py-1 text-[11px]">{day}</span>
                    ))}
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                      <button
                        key={d}
                        type="button"
                        className={`py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                          d === 12
                            ? "bg-[#0C3832] text-white font-bold"
                            : [8, 10, 15, 17, 22].includes(d)
                            ? "hover:bg-slate-100 text-slate-800 font-bold relative after:w-1 after:h-1 after:bg-emerald-500 after:rounded-full after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2"
                            : "hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sesiones del Día (7 cols) */}
                <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Sesiones del día · Sábado 12 de Abril
                    </h3>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      5 citas activas en box
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {[
                      {
                        time: "08:00",
                        name: "María López García",
                        therapy: "Fisioterapia Manual & Magneto",
                        room: "Sala 1",
                        doctor: "Dra. Carla Sánchez",
                        badge: "bg-emerald-50 text-[#0C3832]",
                      },
                      {
                        time: "09:30",
                        name: "Carlos Mendoza R.",
                        therapy: "Kinesiología & TENS 7000",
                        room: "Sala 2",
                        doctor: "Dr. Alejandro Torres",
                        badge: "bg-emerald-50 text-[#0C3832]",
                      },
                      {
                        time: "11:00",
                        name: "Ana Torres Silva",
                        therapy: "Reeducación funcional",
                        room: "Gabinete 1",
                        doctor: "Lic. Elena Morales",
                        badge: "bg-teal-50 text-teal-800",
                      },
                      {
                        time: "14:00",
                        name: "Jorge Ramírez Díaz",
                        therapy: "Terapia manual miofascial",
                        room: "Sala 1",
                        doctor: "Lic. Roberto Mendoza",
                        badge: "bg-emerald-50 text-[#0C3832]",
                      },
                      {
                        time: "16:30",
                        name: "Lucía Fernández M.",
                        therapy: "Evaluación funcional inicial",
                        room: "Gabinete 2",
                        doctor: "Dra. Carla Sánchez",
                        badge: "bg-teal-50 text-teal-800",
                      },
                    ].map((s, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          const p = patients.find((pat) =>
                            pat.name.toLowerCase().includes(s.name.split(" ")[0].toLowerCase())
                          );
                          if (p) {
                            setSelectedPatientId(p.id);
                            setCurrentView("expediente");
                            setExpedienteTab("resumen");
                          }
                        }}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 hover:border-emerald-200 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-slate-800 bg-white px-2 py-1 rounded-lg border border-slate-200">
                            {s.time}
                          </span>
                          <div>
                            <span className="font-bold text-slate-900 block leading-tight hover:text-emerald-700">
                              {s.name}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium">
                              {s.therapy} · {s.doctor}
                            </span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] ${s.badge}`}>
                          {s.room}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ======================================================= */}
          {/* VISTA 7: CITAS (SECCIÓN 12)                             */}
          {/* ======================================================= */}
          {currentView === "citas" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                    Gestión de Citas y Turnos
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Programación, confirmación y reprogramación de turnos
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNewCitaModalOpen(true)}
                  className="bg-[#0C3832] hover:bg-[#07241E] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Programar Cita</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[650px]">
                    <thead className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase">
                      <tr>
                        <th className="py-3 px-4">Paciente</th>
                        <th className="py-3 px-4">Fecha y Horario</th>
                        <th className="py-3 px-4">Especialista</th>
                        <th className="py-3 px-4">Servicio / Box</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4 text-right">Gestión</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {citasList.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                          <td
                            onClick={() => {
                              const p = patients.find((pat) =>
                                pat.name.toLowerCase().includes(c.patient.split(" ")[0].toLowerCase())
                              );
                              if (p) {
                                setSelectedPatientId(p.id);
                                setCurrentView("expediente");
                                setExpedienteTab("resumen");
                              }
                            }}
                            className="py-3 px-4 font-bold text-slate-900 cursor-pointer hover:text-emerald-700 hover:underline"
                          >
                            {c.patient}
                          </td>
                          <td className="py-3 px-4 text-slate-600 font-mono">
                            {c.date} · {c.time}
                          </td>
                          <td className="py-3 px-4 text-slate-700 font-medium">{c.doctor}</td>
                          <td className="py-3 px-4 text-slate-600">{c.specialty}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                                c.status === "confirmada"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : c.status === "atendida"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              type="button"
                              onClick={() => showToast(`Cita de ${c.patient} reprogramada`)}
                              className="text-[11px] text-[#0C3832] font-semibold hover:underline"
                            >
                              Reprogramar
                            </button>
                            <button
                              type="button"
                              onClick={() => showToast(`Cita de ${c.patient} cancelada`)}
                              className="text-[11px] text-rose-600 font-semibold hover:underline"
                            >
                              Cancelar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* VISTA 8: PROFESIONALES (SECCIÓN 13)                     */}
          {/* ======================================================= */}
          {currentView === "profesionales" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                    Equipo de Especialistas Colegiados
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Profesionales habilitados de Centro Terapéutico Siglo XXI (Chachapoyas)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast("Modal para dar de alta nuevo especialista")}
                  className="bg-[#0C3832] hover:bg-[#07241E] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nuevo Profesional</span>
                </button>
              </div>

              {/* Grid de Retratos Médicos Reales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {professionals.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
                        <Image
                          src={doc.photo}
                          alt={doc.name}
                          fill
                          className="object-cover object-top"
                        />
                        <span
                          className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs ${
                            doc.status === "Disponible"
                              ? "bg-emerald-500 text-white"
                              : doc.status === "En sesión"
                              ? "bg-teal-700 text-white"
                              : "bg-slate-600 text-white"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-bold text-sm text-slate-900 leading-tight">
                          {doc.name}
                        </h3>
                        <span className="text-xs text-[#0C3832] font-semibold block mt-0.5">
                          {doc.role}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          {doc.colegiatura}
                        </span>
                        <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                          {doc.specialty}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Pacientes asignados</span>
                      <strong className="text-slate-900 font-bold">{doc.patientsCount} activos</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* VISTA 9: REPORTES & ANALÍTICA (SCREEN 9 DE REFERENCIA)  */}
          {/* ======================================================= */}
          {currentView === "reportes" && (
            <div className="space-y-5">
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                    Reportes Clínicos y de Gestión
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Métricas de recuperación, sesiones realizadas y evolución de pacientes
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-600 font-medium shadow-2xs">
                    12/04/2025 - 30/04/2025
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast("Reporte emitido y descargado")}
                    className="bg-[#0C3832] hover:bg-[#07241E] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Generar reporte</span>
                  </button>
                </div>
              </div>

              {/* Subpestañas de Reporte */}
              <div className="flex border-b border-slate-200 text-xs font-semibold text-slate-500 gap-6">
                {[
                  { id: "pacientes", label: "Pacientes" },
                  { id: "evolucion", label: "Evolución" },
                  { id: "sesiones", label: "Sesiones" },
                  { id: "financiero", label: "Financiero" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setReportTab(tab.id as any)}
                    className={`pb-2.5 transition-all cursor-pointer ${
                      reportTab === tab.id
                        ? "text-[#0C3832] border-b-2 border-[#0C3832] font-bold"
                        : "hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* KPIs de Reporte */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Total de pacientes</span>
                  <div className="text-3xl font-extrabold text-slate-900">48</div>
                  <span className="text-[11px] text-emerald-700 font-semibold block">
                    ↑ +5% vs. mes anterior
                  </span>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Sesiones realizadas</span>
                  <div className="text-3xl font-extrabold text-slate-900">142</div>
                  <span className="text-[11px] text-emerald-700 font-semibold block">
                    ↑ +12% vs. mes anterior
                  </span>
                </div>

                {/* Donut Chart de Estados de Pacientes */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-medium block mb-1">
                      Estados de pacientes
                    </span>
                    <div className="space-y-1 text-[11px]">
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <span className="w-2 h-2 rounded-full bg-[#0C3832]" /> En tratamiento: 65%
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <span className="w-2 h-2 rounded-full bg-cyan-500" /> En evaluación: 25%
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" /> Alta: 10%
                      </span>
                    </div>
                  </div>

                  <div className="relative w-16 h-16 shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#0C3832"
                        strokeWidth="3.8"
                        strokeDasharray="65, 100"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="3.8"
                        strokeDasharray="25, 100"
                        strokeDashoffset="-65"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="3.8"
                        strokeDasharray="10, 100"
                        strokeDashoffset="-90"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Gráfico de Barras: Evolución de Pacientes (Semana 1 a Semana 4) */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Evolución de pacientes por semana
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#0C3832]" /> En tratamiento
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-500" /> En evaluación
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" /> Alta
                    </span>
                  </div>
                </div>

                <div className="h-52 w-full flex items-end justify-around pt-6 border-b border-slate-100 pb-2">
                  {[
                    { sem: "Semana 1", t: 40, e: 20, a: 10 },
                    { sem: "Semana 2", t: 55, e: 25, a: 12 },
                    { sem: "Semana 3", t: 70, e: 22, a: 15 },
                    { sem: "Semana 4", t: 85, e: 18, a: 20 },
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 group">
                      <div className="w-12 sm:w-16 bg-slate-100 rounded-xl overflow-hidden flex flex-col-reverse justify-start h-40">
                        <div style={{ height: `${bar.t}%` }} className="bg-[#0C3832] w-full" />
                        <div style={{ height: `${bar.e}%` }} className="bg-cyan-500 w-full" />
                        <div style={{ height: `${bar.a}%` }} className="bg-emerald-400 w-full" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600">{bar.sem}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ======================================================= */}
          {/* VISTA 10: CONFIGURACIÓN (SECCIÓN 15)                    */}
          {/* ======================================================= */}
          {currentView === "configuracion" && (
            <div className="space-y-5">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                Configuración del Sistema Clínico
              </h1>

              {/* Subtabs de Configuración */}
              <div className="flex border-b border-slate-200 text-xs font-semibold text-slate-500 gap-6">
                {[
                  { id: "general", label: "Datos del Centro" },
                  { id: "usuarios", label: "Usuarios y Roles" },
                  { id: "seguridad", label: "Seguridad RLS y Auditoría" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setConfigTab(tab.id as any)}
                    className={`pb-2.5 transition-all cursor-pointer ${
                      configTab === tab.id
                        ? "text-[#0C3832] border-b-2 border-[#0C3832] font-bold"
                        : "hover:text-slate-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {configTab === "general" && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm">Ficha Institucional de la Clínica</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="text-slate-500 block mb-1 font-medium">Nombre de la Institución</label>
                      <input
                        type="text"
                        defaultValue="Centro Terapéutico Siglo XXI"
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-slate-500 block mb-1 font-medium">RUC</label>
                      <input
                        type="text"
                        defaultValue="20458921471"
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-slate-500 block mb-1 font-medium">Dirección Sede Principal</label>
                      <input
                        type="text"
                        defaultValue="Jr. Sociego 357, Chachapoyas 01001"
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="text-slate-500 block mb-1 font-medium">Teléfono / WhatsApp</label>
                      <input
                        type="text"
                        defaultValue="+51 941 996 388"
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}

              {configTab === "usuarios" && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Roles y Permisos de Usuarios</h3>
                      <p className="text-xs text-slate-500">Mapeo de roles en Supabase Auth (`admin`, `profesional`, `paciente`)</p>
                    </div>
                    <Link
                      href="/admin"
                      className="bg-[#0C3832] text-white text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-[#07241E]"
                    >
                      Consola RLS
                    </Link>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    <div className="py-2.5 flex items-center justify-between">
                      <div>
                        <strong className="text-slate-900 block">Administrador (`admin`)</strong>
                        <span className="text-slate-500">Control total, auditoría, gestión de staff y multi-tenant.</span>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">Activo</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <div>
                        <strong className="text-slate-900 block">Especialista (`profesional`)</strong>
                        <span className="text-slate-500">Acceso a pacientes de la clínica, historias, evaluaciones y pautas.</span>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">Activo</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <div>
                        <strong className="text-slate-900 block">Paciente (`paciente`)</strong>
                        <span className="text-slate-500">Aislamiento RLS estricto: solo consulta su propia prescripción.</span>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">Activo</span>
                    </div>
                  </div>
                </div>
              )}

              {configTab === "seguridad" && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Seguridad RLS y Multi-tenant Activos</h3>
                      <p className="text-xs text-slate-500">10/10 pruebas de seguridad superadas con éxito</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    El sistema cuenta con políticas Row Level Security en todas las 12 tablas, protegiendo credenciales de service_role mediante aislamiento del servidor y auditando cada acceso en la tabla <code>audit_logs</code>.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/admin"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0C3832] text-white text-xs font-semibold hover:bg-[#07241E]"
                    >
                      <span>Abrir Consola Administrativa Avanzada</span>
                      <ArrowRight className="w-4 h-4 text-emerald-300" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>

      </div>

      {/* ========================================================= */}
      {/* MODAL 1: NUEVA NOTA EN HISTORIA CLÍNICA                   */}
      {/* ========================================================= */}
      {isNewNoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-100 relative">
            <button
              type="button"
              onClick={() => setIsNewNoteModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Nueva Nota de Evolución Clínica
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Paciente: {selectedPatient.name} (DNI {selectedPatient.dni}) · {selectedPatient.assignedDoc}
            </p>
            <form onSubmit={handleAddNote} className="space-y-4 text-xs">
              <textarea
                rows={4}
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Escribe los hallazgos en camilla, respuesta al dolor, goniometría y pauta indicada..."
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#0C3832] font-medium"
                required
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewNoteModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0C3832] hover:bg-[#07241E] text-white font-bold cursor-pointer"
                >
                  Guardar nota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: NUEVO PACIENTE                                   */}
      {/* ========================================================= */}
      {isNewPatientModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <button
              type="button"
              onClick={() => setIsNewPatientModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Registrar Nuevo Paciente
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Ingresa los datos para aperturar un nuevo expediente clínico.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsNewPatientModalOpen(false);
                showToast("Paciente registrado con éxito en el directorio de Siglo XXI");
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nombres y Apellidos</label>
                <input
                  type="text"
                  placeholder="Ej: Raúl Vargas Morales"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">DNI</label>
                  <input
                    type="text"
                    placeholder="74839201"
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Edad</label>
                  <input
                    type="number"
                    placeholder="35"
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Teléfono</label>
                <input
                  type="tel"
                  placeholder="987 123 456"
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Especialista Asignado</label>
                <select className="w-full p-2.5 rounded-xl border border-slate-200 bg-white">
                  <option>Dra. Carla Sánchez (Columna & Manual)</option>
                  <option>Dr. Alejandro Torres (Traumatología)</option>
                  <option>Lic. Elena Morales (Deportiva)</option>
                  <option>Lic. Roberto Mendoza (Kinesiología)</option>
                </select>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewPatientModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0C3832] text-white font-bold cursor-pointer"
                >
                  Registrar Expediente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: PROGRAMAR CITA / SESIÓN EN BOX                   */}
      {/* ========================================================= */}
      {isNewCitaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 relative">
            <button
              type="button"
              onClick={() => setIsNewCitaModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Programar Turno en Box
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Asigna paciente, fecha, horario y profesional responsable.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsNewCitaModalOpen(false);
                showToast("Cita programada con éxito en la agenda del centro");
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 block mb-1">Paciente</label>
                <select className="w-full p-2.5 rounded-xl border border-slate-200 bg-white">
                  {patients.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} (DNI: {p.dni})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha</label>
                  <input
                    type="date"
                    defaultValue="2025-04-14"
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Horario</label>
                  <select className="w-full p-2.5 rounded-xl border border-slate-200 bg-white">
                    <option>08:00 - 08:45</option>
                    <option>09:30 - 10:15</option>
                    <option>11:00 - 11:45</option>
                    <option>14:00 - 14:45</option>
                    <option>16:30 - 17:15</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Sala / Box</label>
                <select className="w-full p-2.5 rounded-xl border border-slate-200 bg-white">
                  <option>Box 1 · Terapia Manual</option>
                  <option>Box 2 · Magnetoterapia Ecam</option>
                  <option>Sala 1 · Fisioterapia General</option>
                  <option>Gabinete 1 · Reeducación Funcional</option>
                </select>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewCitaModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0C3832] text-white font-bold cursor-pointer"
                >
                  Confirmar Turno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
