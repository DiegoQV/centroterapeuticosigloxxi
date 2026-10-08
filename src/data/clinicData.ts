export const clinicData = {
  brand: {
    name: "Siglo XXI",
    subname: "CENTRO TERAPÉUTICO",
    fullName: "Centro Terapéutico Siglo XXI",
    tagline: "Tu recuperación merece un equipo de verdad.",
    slogan: "Fisioterapia colegiada, equipamiento biomédico y abordaje integral del dolor.",
    logoCompact: "/brand/logo-compact.png",
    logoFull: "/brand/logo-full.png",
    logoEmblem: "/brand/logo-emblem.png",
    logoOfficial: "/brand/logo-official-2lines.png",
  },
  nav: {
    links: [
      { name: "Servicios", href: "#services" },
      { name: "Método", href: "#about" },
      { name: "Especialistas", href: "#doctors" },
      { name: "Contacto", href: "#contact" },
    ],
    cta: "Portal Paciente",
  },
  hero: {
    tag: "• CENTRO TERAPÉUTICO ESPECIALIZADO •",
    titleLine1: "Tu recuperación",
    titleLine2: "merece un equipo",
    titleLine3: "de verdad.",
    subtitle:
      "Fisioterapia colegiada, equipamiento biomédico y un abordaje integral del dolor en un solo lugar.",
    ctaPrimary: "Agendar evaluación",
    ctaSecondary: "Ver afecciones",
    doctorBadge: {
      name: "Lic. Terapeuta Físico",
      specialty: "Colegiado CTMP 8412",
      rating: "4.9 (128 evaluaciones)",
      image:
        "https://images.unsplash.com/photo-1594824813589-914df166f240?auto=format&fit=crop&w=300&q=80",
    },
    stats: [
      { icon: "User", value: "1 a 1", label: "Atención en Camilla" },
      { icon: "Shield", value: "CTMP", label: "Especialistas Colegiados" },
      { icon: "Clock", value: "100%", label: "Tecnología Biomédica" },
    ],
  },
  services: {
    tag: "• ¿QUÉ AFECCIONES TRATAMOS? •",
    title: "Tratamientos especializados para cada tipo de dolor",
    subtitle:
      "Abordaje individualizado y riguroso para devolverte la movilidad y bienestar motriz.",
    subtitleLaptop: "Abordaje individualizado y riguroso para devolverte la movilidad y bienestar.",
    linkText: "Consultar todas las afecciones",
    items: [
      {
        id: "dolor-ciatico-lumbar",
        icon: "Activity",
        title: "Dolor Ciático y Lumbar",
        therapyMatch: "Dolor Ciático y Lumbar",
        description:
          "Alivio de compresión del nervio ciático, lumbago agudo, discopatías y hernias discales.",
        image: "/images/services/lumbar.webp",
        remoteImage:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "cuello-hombros",
        icon: "UserCheck",
        title: "Cuello y Hombros",
        therapyMatch: "Cuello y Hombros",
        description:
          "Cervicalgias, contracturas posturales, tortícolis y síndrome de pinzamiento del manguito rotador.",
        image: "/images/services/cuello.webp",
        remoteImage:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "esguinces-articulaciones",
        icon: "HeartPulse",
        title: "Esguinces y Articulaciones",
        therapyMatch: "Esguinces y Articulaciones",
        description:
          "Recuperación de estabilidad ligamentosa en tobillo, rodilla, muñeca y reeducación propioceptiva.",
        image: "/images/services/esguinces.webp",
        remoteImage:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "lesiones-deportivas",
        icon: "Dumbbell",
        title: "Lesiones Deportivas",
        therapyMatch: "Lesiones Deportivas",
        description:
          "Desgarros musculares, tendinopatías, sobrecargas y readaptación funcional para retorno seguro.",
        image: "/images/services/deportivas.webp",
        remoteImage:
          "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "contracturas-tension",
        icon: "Bone",
        title: "Contracturas y Tensión",
        therapyMatch: "Contracturas y Tensión",
        description:
          "Terapia manual profunda, desactivación de puntos gatillo y liberación miofascial para alivio sostenido.",
        image: "/images/services/contracturas.webp",
        remoteImage:
          "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80",
      },
      {
        id: "rigidez-articular-artrosis",
        icon: "Brain",
        title: "Rigidez Articular y Artrosis",
        therapyMatch: "Rigidez Articular y Artrosis",
        description:
          "Disminución de inflamación, preservación del cartílago articular y fortalecimiento para artrosis de cadera y rodilla.",
        image: "/images/services/artrosis.webp",
        remoteImage:
          "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  whyChoose: {
    tag: "• NUESTRA METODOLOGÍA •",
    title: "No solo aliviamos el dolor: recuperamos tu movilidad.",
    description:
      "Combinamos evaluación biomecánica, tecnología médica y terapia manual 1 a 1 para sanar sin fármacos dependientes.",
    points: [
      "01. Diagnóstico Funcional Riguroso",
      "02. Tecnología Biomédica de Apoyo",
      "03. Terapia Manual & Movilidad Activa",
      "04. Acompañamiento en Psicología del Dolor",
    ],
    details: [
      {
        title: "01. Diagnóstico Funcional Riguroso",
        desc: "Evaluamos el origen real del dolor y disfunción biomecánica antes de iniciar cualquier tratamiento.",
      },
      {
        title: "02. Tecnología Biomédica de Apoyo",
        desc: "Magnetoterapia Ecam Magnet, TENS 7000 de modulación neuromuscular y agentes físicos avanzados para acelerar la regeneración tisular.",
      },
      {
        title: "03. Terapia Manual & Movilidad Activa",
        desc: "Técnicas articulares, liberación miofascial y prescripción de ejercicio terapéutico guiado en camilla.",
      },
      {
        title: "04. Acompañamiento en Psicología del Dolor",
        desc: "Herramientas de modulación biopsicosocial para superar la kinesiofobia y el dolor persistente.",
      },
    ],
    cta: "Solicitar cita de valoración",
    clinicalBadge: "Atención 1 a 1 en camilla",
  },
  facilities: {
    tag: "• TECNOLOGÍA BIOMÉDICA DE APOYO •",
    title: "Equipamiento especializado",
    titleLine1: "Equipamiento especializado",
    titleLine2: "al servicio de tu bienestar.",
    subtitle:
      "Tecnología no invasiva y criterio clínico para modular el dolor y devolverte la función.",
    cta: "Conocer equipamiento",
    tabs: [
      {
        id: "ecam-magnet",
        name: "Ecam Magnet",
        badgeIcon: "Zap",
        category: "MAGNETOTERAPIA CLÍNICA",
        title: "Ecam Magnet",
        description:
          "Campos electromagnéticos pulsátiles que aceleran la osteogénesis y regeneración de tejidos y desinflaman articulaciones profundas sin dolor ni calor.",
        image: "/images/equipment-magnet.jpg",
        remoteImage:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
        specs: [
          { icon: "Clock", text: "20 a 30 min" },
          { icon: "ShieldCheck", text: "100% Indoloro" },
          { icon: "Activity", text: "Articular y óseo" },
        ],
        indicationsTitle: "INDICADO HABITUALMENTE PARA:",
        indications: [
          "Artrosis y desgaste articular",
          "Dolor lumbar y cervical",
          "Edemas óseos y contusiones",
          "Recuperación post-inmovilización",
        ],
        footerNote: "Indicado tras evaluación clínica previa",
        ctaText: "Consultar este equipo",
      },
      {
        id: "tem-7000",
        name: "TENS 7000",
        badgeIcon: "Zap",
        category: "ELECTROTERAPIA ANALGÉSICA",
        title: "TENS 7000",
        description:
          "Corrientes analgésicas de precisión que bloquean el impulso doloroso en la médula espinal (Teoría de la Compuerta) y relajan espasmos musculares severos.",
        image: "/images/equipment-tens.jpg",
        remoteImage:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
        specs: [
          { icon: "Clock", text: "15 a 20 min" },
          { icon: "ShieldCheck", text: "Sensación Suave" },
          { icon: "Activity", text: "Muscular y nervioso" },
        ],
        indicationsTitle: "INDICADO HABITUALMENTE PARA:",
        indications: [
          "Contracturas agudas y crónicas",
          "Dolor ciático y radiculopatías",
          "Sobrecarga y espasmo postural",
          "Alivio del dolor antes de movilizar",
        ],
        footerNote: "Indicado tras evaluación clínica previa",
        ctaText: "Consultar este equipo",
      },
      {
        id: "terapia-percursion",
        name: "Terapia de Percusión",
        badgeIcon: "Target",
        category: "TERAPIA MIOFASCIAL ACTIVA",
        title: "Terapia de Percusión Miofascial",
        description:
          "Vibración mecánica focalizada para descompresión de la fascia profunda, aumento del flujo sanguíneo local y desactivación de puntos gatillo.",
        image: "/images/equipment-percussion.jpg",
        remoteImage:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
        specs: [
          { icon: "Clock", text: "10 a 15 min" },
          { icon: "ShieldCheck", text: "Fuerza Gradual" },
          { icon: "Activity", text: "Tejido blando y fascia" },
        ],
        indicationsTitle: "INDICADO HABITUALMENTE PARA:",
        indications: [
          "Sobrecargas y fatiga deportiva",
          "Puntos gatillo (nudos musculares)",
          "Rigidez en hombros, glúteos y piernas",
          "Preparación para el ejercicio activo",
        ],
        footerNote: "Indicado tras evaluación clínica previa",
        ctaText: "Consultar este equipo",
      },
    ],
  },
  doctors: {
    tag: "• EQUIPO CLÍNICO INTERDISCIPLINARIO •",
    title: "Profesionales colegiados comprometidos contigo.",
    titleLine1: "Profesionales colegiados",
    titleLine2: "comprometidos contigo.",
    subtitle:
      "Equipo multidisciplinario certificado con registro colegiado CTMP y vocación de servicio en Chachapoyas.",
    linkText: "Solicitar cita de evaluación",
    list: [
      {
        name: "Lic. Terapeuta Físico",
        role: "Fisioterapia & Rehabilitación",
        therapyRole: "Colegiado CTMP N° 8412",
        rating: "4.9 (128 evaluaciones)",
        image: "/images/doctor-1.jpg",
        remoteImage:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Lic. en Psicología",
        role: "Psicología Clínica del Dolor",
        therapyRole: "Abordaje Biopsicosocial & Kinesiofobia",
        rating: "4.9 (94 evaluaciones)",
        image: "/images/doctor-2.jpg",
        remoteImage:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
      },
      {
        name: "Técnico en Fisioterapia",
        role: "Readaptación Funcional",
        therapyRole: "Asistencia Continua & Soporte en Camilla",
        rating: "4.8 (87 evaluaciones)",
        image: "/images/doctor-3.jpg",
        remoteImage:
          "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  bannerCta: {
    tag: "• AGENDA TU EVALUACIÓN •",
    title: "Da el primer paso hacia una vida sin dolor",
    subtitle:
      "Agenda tu consulta de evaluación con nuestros especialistas colegiados y recibe un diagnóstico biomecánico preciso y un plan a tu medida.",
    cta: "Solicitar cita de evaluación",
    quickBooking: {
      title: "Reserva Rápida",
      steps: [
        "Elige tu Afección o Especialista",
        "Selecciona Turno Mañana o Tarde",
        "Confirmación Inmediata por WhatsApp",
      ],
    },
  },
  locationContact: {
    tag: "UBICACIÓN Y CONTACTO",
    title: "Visítanos o agenda tu evaluación",
    subtitle: "Atención programada con el tiempo y rigor clínico que mereces.",
    sede: {
      name: "Centro Terapéutico Siglo XXI",
      title: "Nuestra Sede Física",
      subtitle:
        "Espacio clínico acondicionado para tu comodidad, privacidad y recuperación.",
      address: "Jr. Sociego 357, Barrio La Laguna, Chachapoyas 01001",
      city: "Chachapoyas, Amazonas - Perú",
      shortAddress: "Jr. Sociego 357 · Chachapoyas, Amazonas",
      googleMapsUrl: "https://maps.google.com/?q=Jr.+Sociego+357,+Chachapoyas+01001",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.109726170238!2d-77.86878650164955!3d-6.2347773780610245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91b6ab11e3e4d7f3%3A0x1aec33dcb7480663!2s357%2C%20Chachapoyas%2001001!5e0!3m2!1ses!2spe!4v1789596773278!5m2!1ses!2spe",
      whatsapp: "(+51) 941 996 388",
      whatsappRaw: "51941996388",
      schedule: "L-V 8:00 - 13:00 y 15:00 - 20:00 | Sábados 8:30 - 13:30",
    },
    form: {
      title: "Coordina tu evaluación",
      subtitle:
        "Déjanos tus datos y coordinaremos contigo el horario más conveniente.",
      cta: "Solicitar mi evaluación →",
      note: "Coordinaremos tu cita por WhatsApp",
    },
  },
  footer: {
    brand: "Siglo XXI",
    subname: "CENTRO TERAPÉUTICO",
    fullName: "Centro Terapéutico Siglo XXI",
    tagline: "Tu recuperación merece un equipo de verdad.",
    description:
      "Centro especializado en fisioterapia, terapia manual y rehabilitación motriz. Atención personalizada y tecnología biomédica avanzada en Chachapoyas.",
    certification: "Especialistas Colegiados CTMP",
    socialLinks: [
      { name: "Facebook", href: "https://facebook.com", icon: "Facebook" },
      {
        name: "WhatsApp",
        href: "https://wa.me/51941996388?text=Hola%20Centro%20Terap%C3%A9utico%20Siglo%20XXI%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n",
        icon: "Phone",
      },
      { name: "Instagram", href: "https://instagram.com", icon: "Instagram" },
    ],
    columns: {
      quickLinks: [
        { label: "Inicio", href: "#home" },
        { label: "¿Qué tratamos?", href: "#services" },
        { label: "Nuestro Método", href: "#about" },
        { label: "Equipamiento", href: "#facilities" },
        { label: "Especialistas", href: "#doctors" },
        { label: "Sede y Contacto", href: "#contact" },
      ],
      ourServices: [
        { label: "Dolor Ciático y Lumbar", href: "#services" },
        { label: "Cuello y Hombros", href: "#services" },
        { label: "Esguinces y Articulaciones", href: "#services" },
        { label: "Lesiones Deportivas", href: "#services" },
        { label: "Contracturas y Tensión", href: "#services" },
        { label: "Rigidez Articular y Artrosis", href: "#services" },
      ],
      support: [
        { label: "Portal Paciente (Pauta)", href: "/acceder" },
        { label: "Acceso Profesional / Staff", href: "/login" },
        { label: "Horarios de Atención", href: "#horario-atencion" },
        { label: "Colegiatura CTMP", href: "#doctors" },
        { label: "Sede Chachapoyas", href: "#contact" },
      ],
      contactUs: {
        phone: "(+51) 941 996 388",
        phoneRaw: "51941996388",
        email: "citas@centroterapeutico.pe",
        address: "Jr. Sociego 357, Barrio La Laguna, Chachapoyas 01001",
        city: "Chachapoyas, Amazonas - Perú",
        scheduleWeekday: "Lun - Vie: 8:00 - 13:00 y 15:00 - 20:00",
        scheduleSaturday: "Sábados: 8:30 - 13:30",
      },
    },
    copyright: "© 2026 Centro Terapéutico Siglo XXI. Todos los derechos reservados.",
  },
};
