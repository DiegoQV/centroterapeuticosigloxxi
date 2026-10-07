"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  RotateCcw,
  Loader2,
  AlertTriangle,
  ChevronRight,
  Paperclip,
} from "lucide-react";
import { clinicData } from "@/data/clinicData";
import { solicitarCitaAction } from "@/features/citas/actions";

interface MessageOption {
  label: string;
  action: () => void;
  primary?: boolean;
  icon?: React.ReactNode;
}

interface ClinicalPrescription {
  condition: string;
  evaLevel?: number;
  recommendation: string;
  equipment: string;
  frequency: string;
  requiresImmediateAttention?: boolean;
}

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time?: string;
  options?: MessageOption[];
  isWarning?: boolean;
  prescription?: ClinicalPrescription;
  isEvaScale?: boolean;
}

interface ClinicalAssistantWidgetProps {
  onOpenBooking?: (service?: string) => void;
}

// Componente para efecto máquina de escribir (typewriter) suave y ágil
function TypewriterText({
  text,
  isTyping,
  onComplete,
}: {
  text: string;
  isTyping: boolean;
  onComplete: () => void;
}) {
  const [displayedText, setDisplayedText] = useState(isTyping ? "" : text);

  useEffect(() => {
    if (!isTyping) {
      setDisplayedText(text);
      return;
    }

    let i = 0;
    // Velocidad fluida: 15ms por carácter (dinámico sin hacer esperar de más)
    const interval = setInterval(() => {
      i++;
      setDisplayedText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        onComplete();
      }
    }, 15);

    return () => clearInterval(interval);
  }, [text, isTyping, onComplete]);

  return (
    <span>
      {displayedText}
      {isTyping && displayedText.length < text.length && (
        <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-emerald-600 animate-pulse rounded-xs align-middle" />
      )}
    </span>
  );
}

export default function ClinicalAssistantWidget({ onOpenBooking }: ClinicalAssistantWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<"none" | "nombre" | "telefono" | "turno">("none");
  const [bookingData, setBookingData] = useState({
    nombre: "",
    telefono: "",
    afeccion: "Consulta General",
    turno: "Mañana (8:00 AM - 1:00 PM)",
    eva: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isOpen) return;

    // Al inicio (con el mensaje de bienvenida), SIEMPRE iniciar arriba para ver el saludo completo
    if (messages.length <= 1) {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = 0;
      }
      const timer = setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = 0;
        }
      }, 60);
      return () => clearTimeout(timer);
    } else {
      // Solo hacer auto-scroll hacia abajo cuando el usuario o el bot agreguen respuestas
      scrollToBottom();
    }
  }, [messages, isOpen, isBotTyping]);

  const getFormattedTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${strMinutes} ${ampm}`;
  };

  // Mensaje de bienvenida con identidad médica profesional y tipeo animado
  const initWelcome = (withTyping = true) => {
    setBookingStep("none");
    const welcomeId = `msg-welcome-${Date.now()}`;
    const welcomeMsg: Message = {
      id: welcomeId,
      sender: "bot",
      text: "👋 Saludos. Bienvenido al servicio de orientación clínica de Siglo XXI en Chachapoyas.\n\nSoy tu asistente especializado en evaluación biomecánica y fisioterapia. ¿En qué podemos orientarte hoy?",
      time: getFormattedTime(),
      options: [
        {
          label: "🩺 Realizar Triage Clínico de mi dolor",
          action: () => startTriageFlow(),
          primary: true,
        },
        {
          label: "⚡ Tecnología biomédica (Ecam Magnet / TENS)",
          action: () => showEquipmentInfo(),
        },
        {
          label: "📍 Sede Chachapoyas & Horarios de atención",
          action: () => showLocationInfo(),
        },
        {
          label: "📅 Solicitar Cita de Valoración Presencial",
          action: () => startBookingFlow("Consulta General"),
        },
        {
          label: "💬 Hablar directamente por WhatsApp",
          action: () => openDirectWhatsApp(),
        },
      ],
    };

    if (withTyping) {
      setMessages([]);
      setIsBotTyping(true);
      setTimeout(() => {
        setIsBotTyping(false);
        setTypingMessageId(welcomeId);
        setMessages([welcomeMsg]);
      }, 450);
    } else {
      setIsBotTyping(false);
      setTypingMessageId(null);
      setMessages([welcomeMsg]);
    }
  };

  useEffect(() => {
    // Inicializar estado sin escribir para tener datos listos
    initWelcome(false);
  }, []);

  const handleOpenChat = () => {
    setIsOpen(true);
    // Si aún no ha iniciado o solo tiene el mensaje inicial, ejecutar efecto de tipeo interactivo
    if (messages.length <= 1) {
      initWelcome(true);
    }
  };

  const addBotMessage = (
    text: string,
    options?: MessageOption[],
    extra?: { isWarning?: boolean; prescription?: ClinicalPrescription; isEvaScale?: boolean }
  ) => {
    setIsBotTyping(true);
    const newId = `bot-${Date.now()}-${Math.random()}`;

    setTimeout(() => {
      setIsBotTyping(false);
      setTypingMessageId(newId);
      setMessages((prev) => [
        ...prev,
        {
          id: newId,
          sender: "bot",
          text,
          time: getFormattedTime(),
          options,
          isWarning: extra?.isWarning,
          prescription: extra?.prescription,
          isEvaScale: extra?.isEvaScale,
        },
      ]);
    }, 450);
  };

  const addUserMessage = (text: string) => {
    setTypingMessageId(null);
    setIsBotTyping(true);
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}-${Math.random()}`,
        sender: "user",
        text,
        time: getFormattedTime(),
      },
    ]);
  };

  // --- 1. TRIAGE CLÍNICO POR ZONAS ANATÓMICAS ---
  const startTriageFlow = () => {
    addUserMessage("Deseo realizar el triage orientativo de mi molestia");
    addBotMessage(
      "Por favor, selecciona la región anatómica donde se concentra tu principal dolor o limitación funcional:",
      [
        {
          label: "🦴 Columna Lumbar / Ciática (Espalda baja y pierna)",
          action: () => askEvaScale("Dolor Lumbar y Nervio Ciático"),
          primary: true,
        },
        {
          label: "💆 Región Cervical y Hombro (Cuello, trapecio y escápula)",
          action: () => askEvaScale("Cervicalgia y Manguito Rotador"),
        },
        {
          label: "🦵 Articulaciones (Rodilla, tobillo o esguinces)",
          action: () => askEvaScale("Lesión Articular / Esguince"),
        },
        {
          label: "⚡ Contracturas Musculares & Puntos Gatillo",
          action: () => askEvaScale("Contracturas Miofasciales"),
        },
        {
          label: "🏃 Lesiones Deportivas & Desgarros",
          action: () => askEvaScale("Lesión Deportiva Muscular"),
        },
        {
          label: "👵 Artrosis y Rigidez Articular Degenerativa",
          action: () => askEvaScale("Artrosis y Rigidez"),
        },
      ]
    );
  };

  // --- 2. ESCALA EVA (Escala Visual Analógica de Dolor) ---
  const askEvaScale = (zone: string) => {
    addUserMessage(`Región: ${zone}`);
    setBookingData((prev) => ({ ...prev, afeccion: zone }));

    addBotMessage(
      `Calibra la intensidad del dolor en la Escala EVA (Escala Visual Analógica de 1 a 10):`,
      [
        { label: "🟢 1 a 3 — Leve (Molestia tolerable)", action: () => evaluateZoneSeverity(zone, 3) },
        { label: "🟡 4 a 6 — Moderado (Limita algunas tareas)", action: () => evaluateZoneSeverity(zone, 5), primary: true },
        { label: "🔴 7 a 8 — Severo (Dificulta el movimiento)", action: () => evaluateZoneSeverity(zone, 8) },
        { label: "🟣 9 a 10 — Inhabilitante / Muy agudo", action: () => evaluateZoneSeverity(zone, 10) },
      ],
      { isEvaScale: true }
    );
  };

  const evaluateZoneSeverity = (zone: string, evaLevel: number) => {
    addUserMessage(`Intensidad de dolor EVA: ${evaLevel}/10`);
    setBookingData((prev) => ({ ...prev, eva: evaLevel }));

    // Verificación de bandera roja si el dolor es 9-10
    if (evaLevel >= 9) {
      addBotMessage(
        `Para tu seguridad clínica:\n\n¿El dolor comenzó por una caída grave/accidente, o presentas pérdida de control de esfínteres o parálisis repentina en piernas?`,
        [
          {
            label: "🚨 Sí, hubo traumatismo grave o pérdida de fuerza",
            action: () => triggerAlarm(zone),
          },
          {
            label: "✅ No, es dolor muscular/articular muy agudo",
            action: () => generateClinicalCard(zone, evaLevel),
            primary: true,
          },
        ]
      );
    } else {
      generateClinicalCard(zone, evaLevel);
    }
  };

  const triggerAlarm = (zone: string) => {
    addUserMessage("Presento síntomas de alarma médica");
    addBotMessage(
      "🚨 PROTOCOLO DE ALERTA MÉDICA:\n\nPor los signos descritos, es indispensable descartar fracturas o compromiso neurológico agudo mediante diagnóstico por imágenes en un servicio de urgencias médicas.\n\nTe sugerimos acudir al Hospital Regional Virgen de Fátima de Chachapoyas antes de una sesión fisioterapéutica.",
      [
        {
          label: "🏥 Ver ubicación Hospital Virgen de Fátima",
          action: () =>
            window.open("https://maps.google.com/?q=Hospital+Regional+Virgen+de+Fatima+Chachapoyas", "_blank"),
          primary: true,
        },
        {
          label: "📞 Llamar a central de orientación (+51 941 996 388)",
          action: () => window.open("tel:+51941996388", "_self"),
        },
        {
          label: "🔄 Reiniciar evaluación",
          action: () => initWelcome(),
        },
      ],
      { isWarning: true }
    );
  };

  // --- 3. FICHA CLÍNICA DE RECOMENDACIÓN TERAPÉUTICA ---
  const generateClinicalCard = (zone: string, eva: number) => {
    let rec = "";
    let equip = "";
    let freq = "2 a 3 sesiones semanales en fase inicial";

    if (zone.includes("Lumbar") || zone.includes("Ciático")) {
      rec =
        "Descompresión radicular no invasiva, terapia manual lumbopélvica y magnetoterapia profunda para revertir el edema perineural sin recurrir a fármacos.";
      equip = "Ecam Magnet (Magnetoterapia) + Kinesioterapia Activa";
    } else if (zone.includes("Cervical")) {
      rec =
        "Desactivación de puntos gatillo miofasciales, reeducación postural y electroanalgesia selectiva para bloquear el estímulo doloroso.";
      equip = "TENS 7000 + Percusión Miofascial Focalizada";
    } else if (zone.includes("Articular") || zone.includes("Esguince")) {
      rec =
        "Protocolo PEACE & LOVE para regeneración ligamentosa guiada, drenaje articular y propiocepción motriz.";
      equip = "Ecam Magnet + Readaptación Funcional";
    } else if (zone.includes("Artrosis")) {
      rec =
        "Estímulo de repolarización celular y regeneración del cartílago sin calor ni dolor, combinado con ejercicios activos de baja carga.";
      equip = "Magnetoterapia Pulsátil Ecam Magnet";
    } else {
      rec =
        "Tratamiento miofascial de tejido profundo, termoterapia y corrección biomecánica para prevenir recidivas.";
      equip = "Terapia Manual Asistida 1 a 1 + TENS 7000";
    }

    const prescription: ClinicalPrescription = {
      condition: zone,
      evaLevel: eva,
      recommendation: rec,
      equipment: equip,
      frequency: freq,
    };

    addBotMessage(
      `📋 Ficha Orientativa Generada para tu caso:`,
      [
        {
          label: `📅 Agendar Cita para ${zone}`,
          action: () => startBookingFlow(zone),
          primary: true,
        },
        {
          label: "💬 Enviar esta ficha por WhatsApp al fisioterapeuta",
          action: () =>
            openCustomWhatsApp(
              `Hola, completé el triage clínico para ${zone} con dolor EVA ${eva}/10. Deseo agendar evaluación.`
            ),
        },
        {
          label: "🔄 Consultar otra región anatómica",
          action: () => startTriageFlow(),
        },
      ],
      { prescription }
    );
  };

  // --- 4. EQUIPAMIENTO BIOMÉDICO ---
  const showEquipmentInfo = () => {
    addUserMessage("Deseo información del equipamiento biomédico");
    addBotMessage(
      "En Centro Terapéutico Siglo XXI contamos con tecnología biomédica certificada:\n\n" +
        "1. 🧲 Ecam Magnet (Magnetoterapia):\n" +
        "• Campos electromagnéticos pulsátiles. Estimula el callo óseo, regenera cartílago y desinflama articulaciones profundas sin dolor.\n\n" +
        "2. ⚡ TENS 7000 (Electroanalgesia):\n" +
        "• Corrientes selectivas de precisión bajo la Teoría de la Compuerta (Gate Control) para alivio rápido sin fármacos.\n\n" +
        "3. 🔨 Pistolas de Percusión Miofascial:\n" +
        "• Vibración mecánica de penetración profunda para disolver adherencias y contracturas musculares rebeldes.",
      [
        {
          label: "📅 Solicitar evaluación con estos equipos",
          action: () => startBookingFlow("Evaluación con Equipamiento Biomédico"),
          primary: true,
        },
        {
          label: "📍 Ver ubicación de los equipos en clínica",
          action: () => showLocationInfo(),
        },
        {
          label: "💬 Preguntar por WhatsApp sobre sesiones",
          action: () => openCustomWhatsApp("Deseo consultar sobre los equipos biomédicos"),
        },
      ]
    );
  };

  // --- 5. SEDE Y HORARIOS ---
  const showLocationInfo = () => {
    addUserMessage("¿Dónde queda la sede y cuáles son los horarios?");
    addBotMessage(
      "🏥 Centro Terapéutico Siglo XXI — Sede Chachapoyas:\n\n" +
        "📍 Dirección Oficial:\n" +
        "Jr. Sociego 357, Barrio La Laguna (Chachapoyas 01001, Amazonas)\n\n" +
        "⏰ Horarios de Atención Presencial:\n" +
        "• Lunes a Viernes: 08:00 - 13:00 y 15:00 - 20:00\n" +
        "• Sábados: 08:30 - 13:30\n\n" +
        "🔒 Atención en camilla individual, con estricta privacidad y confort.",
      [
        {
          label: "🗺️ Abrir ubicación en Google Maps",
          action: () =>
            window.open("https://maps.google.com/?q=Jr.+Sociego+357,+Chachapoyas+01001", "_blank"),
          primary: true,
        },
        {
          label: "📅 Agendar cita en esta sede",
          action: () => startBookingFlow("Cita en Sede Jr. Sociego 357"),
        },
        {
          label: "📞 Llamar por teléfono (+51 941 996 388)",
          action: () => window.open("tel:+51941996388", "_self"),
        },
      ]
    );
  };

  // --- 6. AGENDAMIENTO EN CHAT ---
  const startBookingFlow = (selectedZone: string) => {
    setBookingData((prev) => ({ ...prev, afeccion: selectedZone }));
    setBookingStep("nombre");
    addBotMessage(
      `Vamos a coordinar tu Cita de Evaluación para "${selectedZone}".\n\nPor favor, escribe tu Nombre y Apellido completo:`
    );
  };

  const handleUserInputSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputVal.trim();
    if (!text) return;

    setInputVal("");
    addUserMessage(text);

    if (bookingStep === "nombre") {
      setBookingData((prev) => ({ ...prev, nombre: text }));
      setBookingStep("telefono");
      addBotMessage(`Gracias ${text}. Ahora indica tu número telefónico o WhatsApp de contacto:`);
      return;
    }

    if (bookingStep === "telefono") {
      setBookingData((prev) => ({ ...prev, telefono: text }));
      setBookingStep("turno");
      addBotMessage(`Perfecto. ¿Qué turno te resulta más conveniente para tu primera sesión?`, [
        { label: "🌅 Turno Mañana (8:00 AM - 1:00 PM)", action: () => finishBooking("Mañana (8:00 AM - 1:00 PM)") },
        { label: "🌆 Turno Tarde (2:00 PM - 8:00 PM)", action: () => finishBooking("Tarde (2:00 PM - 8:00 PM)") },
        { label: "📅 Sábado (8:30 AM - 1:30 PM)", action: () => finishBooking("Sábado (8:30 AM - 1:30 PM)") },
      ]);
      return;
    }

    handleKeywordQuery(text);
  };

  const finishBooking = async (selectedTurno: string) => {
    addUserMessage(`Turno preferido: ${selectedTurno}`);
    setIsSubmitting(true);

    const payload = {
      nombre: bookingData.nombre,
      telefono: bookingData.telefono,
      afeccion: bookingData.afeccion,
      sede: "Sede Chachapoyas (Jr. Sociego 357)",
      turno: selectedTurno,
      origen: "modal" as const,
    };

    try {
      const res = await solicitarCitaAction(payload);
      setIsSubmitting(false);
      setBookingStep("none");

      if (res.success) {
        addBotMessage(
          `✅ Solicitud clínica registrada con éxito.\n\nSe ha creado el expediente de lead para ${bookingData.nombre}. Para asegurar tu horario de inmediato con la recepción de la clínica, presiona el botón a continuación:`,
          [
            {
              label: "🟢 Confirmar en WhatsApp de la Clínica",
              action: () => window.open(res.whatsappUrl || "https://wa.me/51941996388", "_blank"),
              primary: true,
            },
            {
              label: "🔄 Volver al inicio",
              action: () => initWelcome(),
            },
          ]
        );
      } else {
        addBotMessage(`Aviso: ${res.error}. Puedes contactarnos directamente:`, [
          {
            label: "📱 Abrir WhatsApp de citas",
            action: () => openDirectWhatsApp(),
            primary: true,
          },
        ]);
      }
    } catch {
      setIsSubmitting(false);
      setBookingStep("none");
      addBotMessage("Hemos procesado tu cita. Presiona el botón para confirmarla vía WhatsApp:", [
        {
          label: "📱 Enviar datos por WhatsApp",
          action: () => openDirectWhatsApp(),
          primary: true,
        },
      ]);
    }
  };

  const handleKeywordQuery = (query: string) => {
    const q = query.toLowerCase();

    if (q.includes("horario") || q.includes("hora") || q.includes("atienden") || q.includes("sabado")) {
      showLocationInfo();
    } else if (q.includes("donde") || q.includes("ubicacion") || q.includes("direccion") || q.includes("sociego")) {
      showLocationInfo();
    } else if (q.includes("ecam") || q.includes("magnet") || q.includes("tens") || q.includes("equipo")) {
      showEquipmentInfo();
    } else if (
      q.includes("ciatica") ||
      q.includes("espalda") ||
      q.includes("lumbar") ||
      q.includes("cuello") ||
      q.includes("rodilla") ||
      q.includes("esguince") ||
      q.includes("dolor")
    ) {
      startTriageFlow();
    } else if (q.includes("cita") || q.includes("agendar") || q.includes("reserva") || q.includes("turno")) {
      startBookingFlow("Consulta Solicitada");
    } else if (q.includes("precio") || q.includes("costo") || q.includes("cuanto")) {
      addBotMessage(
        "💰 Modelo de Honorarios Clínicos:\n\nEn Centro Terapéutico Siglo XXI cada paciente recibe una valoración funcional previa para determinar el número exacto de sesiones requeridas, evitando gastos innecesarios. Brindamos planes por sesión o paquetes de rehabilitación integral.",
        [
          { label: "📅 Agendar Cita de Valoración", action: () => startBookingFlow("Valoración Inicial") },
          { label: "💬 Consultar costos por WhatsApp", action: () => openCustomWhatsApp("Deseo consultar sobre los costos de las sesiones") },
        ]
      );
    } else {
      addBotMessage(
        `He registrado tu consulta: "${query}". Para brindarte una respuesta personalizada con un especialista colegiado, puedes transferir tu consulta a nuestro WhatsApp:`,
        [
          {
            label: "💬 Consultar por WhatsApp ahora",
            action: () => openCustomWhatsApp(query),
            primary: true,
          },
          {
            label: "🩺 Ver opciones de triage clínico",
            action: () => initWelcome(),
          },
        ]
      );
    }
  };

  const openDirectWhatsApp = () => {
    const text = encodeURIComponent(
      "Hola Centro Terapéutico Siglo XXI, deseo consultar con un fisioterapeuta para una evaluación."
    );
    window.open(`https://wa.me/51941996388?text=${text}`, "_blank");
  };

  const openCustomWhatsApp = (userQuery: string) => {
    const text = encodeURIComponent(
      `Hola Centro Terapéutico Siglo XXI, estuve en su asistente clínico web y deseo consultar:\n\n"${userQuery}"`
    );
    window.open(`https://wa.me/51941996388?text=${text}`, "_blank");
  };

  return (
    <aside aria-label="Asistente Clínico y Triage Digital" className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9999]">
      {/* BOTÓN FLOTANTE CIRCULAR CLÍNICO (SOLO AVATAR CON NOTIFICACIÓN SOBRE LA CABEZA) */}
      {!isOpen && (
        <div className="relative">
          <button
            onClick={handleOpenChat}
            aria-label="Abrir asistente virtual Siglo XXI"
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-1 shadow-2xl border-2 border-emerald-600 hover:border-emerald-500 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center group"
          >
            {/* Imagen del Avatar Biomecánico */}
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src="/brand/chatbot-avatar.png"
                alt="Asistente Biomecánico Siglo XXI"
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Baliza médica verde de conectado (inferior derecha) */}
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
          </button>
        </div>
      )}

      {/* VENTANA DE TRIAGE CLÍNICO Y ORIENTACIÓN MÉDICA — ACABADO TELEHEALTH (IMAGEN 2) */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Ventana de Chat Clínico"
          className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[9999] w-[calc(100vw-24px)] sm:w-[390px] h-[580px] max-h-[88vh] bg-white rounded-[28px] shadow-2xl border border-gray-200/80 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Cabecera Minimalista Estilo Chat Call (Imagen 2) */}
          <div className="bg-white pt-4 pb-3 px-4 border-b border-gray-100 relative font-sans">
            {/* Controles discretos en las esquinas */}
            <div className="absolute top-3.5 right-3.5 flex items-center gap-1">
              <button
                onClick={() => initWelcome(true)}
                title="Reiniciar chat"
                className="w-7 h-7 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
                className="w-7 h-7 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Título y Avatar Centrado como en Imagen 2 */}
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-medium text-gray-500 tracking-wide">
                Chat Call
              </span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-gray-200/90 shadow-2xs flex-shrink-0">
                  <img
                    src="/brand/chatbot-avatar.png"
                    alt="Asistente Siglo XXI"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-sans font-semibold text-base sm:text-lg text-gray-900 tracking-tight">
                  Asistente Siglo XXI
                </h3>
              </div>
            </div>
          </div>

          {/* Área de Mensajes y Fichas Clínicas */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-white font-sans text-xs sm:text-sm"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                {msg.sender === "user" ? (
                  /* Mensaje de Usuario idéntico a imagen 2 */
                  <div className="flex justify-end w-full">
                    <div className="max-w-[85%] bg-white border border-gray-200/90 text-gray-900 rounded-2xl rounded-tr-xs px-4 py-2.5 shadow-2xs text-xs sm:text-sm leading-relaxed">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  /* Mensaje del Asistente idéntico a imagen 2 */
                  <div className="flex items-start gap-2.5 w-full">
                    {/* Avatar circular idéntico al de la imagen 2 */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-gray-200/90 flex-shrink-0 mt-0.5 shadow-2xs">
                      <img
                        src="/brand/chatbot-avatar.png"
                        alt="Bot"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 max-w-[88%] space-y-2">
                      {/* Burbuja gris suave idéntica a imagen 2 con efecto mecanografía dinámico */}
                      <div
                        className={`rounded-2xl rounded-tl-xs px-4 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                          msg.isWarning
                            ? "bg-red-50 text-red-950 border border-red-200"
                            : "bg-[#F1F3F5] text-gray-900"
                        }`}
                      >
                        <TypewriterText
                          text={msg.text}
                          isTyping={typingMessageId === msg.id}
                          onComplete={() => setTypingMessageId(null)}
                        />
                      </div>

                      {/* Solo mostrar la ficha o los botones cuando termine de escribirse el mensaje actual */}
                      {typingMessageId !== msg.id && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                          {/* Ficha de recomendación con viñetas idéntica a imagen 2 */}
                          {msg.prescription && (
                            <div className="bg-[#F1F3F5] rounded-2xl p-4 text-xs sm:text-[13px] text-gray-800 space-y-2.5 border border-gray-200/40">
                              <div className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0 mt-1.5" />
                                <p className="leading-snug">
                                  <strong className="font-semibold text-gray-900">Orientación:</strong>{" "}
                                  {msg.prescription.recommendation}
                                </p>
                              </div>

                              <div className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0 mt-1.5" />
                                <p className="leading-snug">
                                  <strong className="font-semibold text-gray-900">Tecnología:</strong>{" "}
                                  <span className="font-medium text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                                    {msg.prescription.equipment}
                                  </span>
                                </p>
                              </div>

                              <div className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0 mt-1.5" />
                                <p className="leading-snug">
                                  <strong className="font-semibold text-gray-900">Frecuencia:</strong>{" "}
                                  {msg.prescription.frequency}
                                </p>
                              </div>

                              {msg.prescription.evaLevel && (
                                <div className="flex items-start gap-2 pt-0.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0 mt-1.5" />
                                  <p className="leading-snug">
                                    <strong className="font-semibold text-gray-900">Escala EVA:</strong>{" "}
                                    <span className="font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-md">
                                      {msg.prescription.evaLevel}/10
                                    </span>
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Opciones interactivas estilo moderno y limpio */}
                          {msg.options && msg.options.length > 0 && (
                            <div className="flex flex-col gap-1.5 pt-1">
                              {msg.options.map((opt, idx) => (
                                <button
                                  key={idx}
                                  onClick={opt.action}
                                  className={`text-left text-xs sm:text-[13px] font-medium py-2.5 px-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                                    opt.primary
                                      ? "bg-[#161D2B] hover:bg-black text-white shadow-xs"
                                      : "bg-white hover:bg-gray-100/80 text-gray-800 border border-gray-200/90 shadow-2xs"
                                  }`}
                                >
                                  <span className="leading-snug">{opt.label}</span>
                                  <ChevronRight
                                    className={`w-4 h-4 transition-transform group-hover:translate-x-1 flex-shrink-0 ml-1 ${
                                      opt.primary
                                        ? "text-gray-400 group-hover:text-white"
                                        : "text-gray-400 group-hover:text-gray-700"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Timestamp idéntico a imagen 2 (ej. 8:21 AM) */}
                          <div className="text-[10px] text-gray-400 font-normal mt-1 pl-1">
                            {msg.time || "8:21 AM"}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Indicador de Asistente Escribiendo (Tres Puntos Animados) */}
            {isBotTyping && (
              <div className="flex items-start gap-2.5 w-full animate-in fade-in duration-200">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-gray-200/90 flex-shrink-0 mt-0.5 shadow-2xs">
                  <img
                    src="/brand/chatbot-avatar.png"
                    alt="Bot"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-[#F1F3F5] rounded-2xl rounded-tl-xs px-4 py-3 shadow-2xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                </div>
              </div>
            )}

            {isSubmitting && (
              <div className="flex items-center gap-2 text-xs text-gray-500 italic p-2 bg-[#F1F3F5] rounded-xl">
                <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                <span>Registrando solicitud en base clínica...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Barra Inferior: Input flotante idéntico a Imagen 2 */}
          <div className="p-3 sm:p-3.5 bg-white border-t border-gray-100 font-sans">
            <form
              onSubmit={handleUserInputSubmit}
              className="w-full bg-[#F5F6F8] border border-gray-200/80 rounded-full pl-3.5 pr-1.5 py-1.5 flex items-center gap-2 focus-within:bg-white focus-within:border-gray-300 focus-within:ring-2 focus-within:ring-gray-200/70 transition-all shadow-2xs"
            >
              {/* Ícono clip / adjuntar como en imagen 2 */}
              <button
                type="button"
                onClick={() => openDirectWhatsApp()}
                title="Adjuntar o consultar por WhatsApp"
                className="text-gray-400 hover:text-gray-600 p-1 transition-colors cursor-pointer flex-shrink-0"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder={
                  bookingStep === "nombre"
                    ? "Escribe tu nombre completo..."
                    : bookingStep === "telefono"
                    ? "Escribe tu teléfono móvil..."
                    : "Type Your Message..."
                }
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 py-1"
              />

              {/* Botón circular oscuro con avión inclinado como en imagen 2 */}
              <button
                type="submit"
                disabled={!inputVal.trim()}
                aria-label="Enviar mensaje"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#161D2B] hover:bg-black text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-[#161D2B] cursor-pointer shadow-sm flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white -rotate-12 translate-x-[-1px]" />
              </button>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
}
