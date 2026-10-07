import {
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Navigation,
  CalendarCheck,
} from "lucide-react";

export default function LocationContact() {
  return (
    <section id="ubicacion" className="py-16 lg:py-24 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sede Central en Amazonas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ubicación & Canales de Atención
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Estamos ubicados estratégicamente en Chachapoyas, en un entorno accesible, tranquilo y acondicionado para una experiencia terapéutica cómoda y segura.
          </p>
        </div>

        {/* 2-Column Info & Visual Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Contact & Operational Details */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
              
              {/* Address item */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Dirección de la Sede
                  </h3>
                  <p className="text-base font-semibold text-slate-800 mt-0.5">
                    Jr. Sociego, Chachapoyas
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                    Barrio La Laguna, Chachapoyas - Amazonas, Perú
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Zona céntrica, de fácil acceso peatonal y vehicular, con estacionamiento cercano.
                  </p>
                </div>
              </div>

              {/* Phone / WhatsApp item */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Contacto Directo & Citas
                  </h3>
                  <a
                    href="tel:+51941996388"
                    className="text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors block mt-0.5"
                  >
                    +51 941 996 388
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Llamadas directas y canal preferencial de WhatsApp para coordinación rápida de turnos.
                  </p>
                </div>
              </div>

              {/* Hours item */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Horarios de Atención
                  </h3>
                  <div className="mt-1 space-y-0.5 text-xs text-slate-700">
                    <p className="flex items-center justify-between gap-4">
                      <span className="font-semibold text-slate-900">Lunes a Viernes:</span>
                      <span>8:00 AM – 7:30 PM (Horario corrido)</span>
                    </p>
                    <p className="flex items-center justify-between gap-4">
                      <span className="font-semibold text-slate-900">Sábados:</span>
                      <span>8:30 AM – 2:00 PM</span>
                    </p>
                    <p className="flex items-center justify-between gap-4 text-slate-400 pt-1">
                      <span>Domingos y Feriados:</span>
                      <span>Previa coordinación de urgencias</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/51941996388?text=Hola%20Centro%20Terap%C3%A9utico%20Siglo%20XXI%2C%20deseo%20coordinar%20una%20cita%20presencial%20en%20Jr.%20Sociego."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Escribir al WhatsApp</span>
                </a>
                <a
                  href="https://maps.google.com/?q=Jr.+Sociego+Chachapoyas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-all"
                >
                  <Navigation className="w-4 h-4 text-emerald-600" />
                  <span>Ver en Google Maps</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right: Architectural & Facility Highlights */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-7 sm:p-9 text-white flex flex-col justify-between shadow-xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-4">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Protocolo de Calidad & Seguridad del Paciente</span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">
                Espacio Clínico Diseñado para tu Bienestar
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                En el Centro Terapéutico Siglo XXI priorizamos la privacidad, la ergonomía y la bioseguridad. Nuestras cabinas de tratamiento individualizadas garantizan una atención sin prisas ni aglomeraciones.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-300">
                    <CalendarCheck className="w-4 h-4" />
                    <span>Citas Programadas</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Cero tiempos muertos en sala de espera. Puntualidad garantizada.
                  </p>
                </div>

                <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-300">
                    <CheckCircle className="w-4 h-4" />
                    <span>Cabinas Individuales</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Privacidad y confort acústico durante la sesión fisioterapéutica y psicológica.
                  </p>
                </div>

                <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-300">
                    <CheckCircle className="w-4 h-4" />
                    <span>Desinfección Continua</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Camillas y equipamiento higienizados rigurosamente entre cada paciente.
                  </p>
                </div>

                <div className="p-3 bg-white/10 rounded-xl border border-white/10 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-300">
                    <CheckCircle className="w-4 h-4" />
                    <span>Atención 1 a 1</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    El profesional permanece a tu lado durante todo el protocolo de la sesión.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick footer link */}
            <div className="mt-8 pt-5 border-t border-white/15 flex items-center justify-between text-xs text-slate-400">
              <span>Jr. Sociego (Barrio La Laguna)</span>
              <a
                href="#triage"
                className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
              >
                <span>Iniciar Triage Orientativo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
