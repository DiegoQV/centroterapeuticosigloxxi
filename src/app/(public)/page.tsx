"use client";

import React, { useState } from "react";
import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import ServicesSection from "@/components/public/ServicesSection";
import WhyChooseUs from "@/components/public/WhyChooseUs";
import FacilitiesSection from "@/components/public/FacilitiesSection";
import DoctorsSection from "@/components/public/DoctorsSection";
import TakeFirstStepBanner from "@/components/public/TakeFirstStepBanner";
import MissionBanner from "@/components/public/MissionBanner";
import Footer from "@/components/public/Footer";
import BookingModal from "@/components/public/BookingModal";
import ClinicalAssistantWidget from "@/components/public/ClinicalAssistantWidget";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOpenBooking = (service = "") => {
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111] font-sans selection:bg-emerald-100 selection:text-[#0B3B32]">
      {/* 1. Header Institucional con logo oficial y portal paciente */}
      <Navbar />

      <main className="flex-grow overflow-x-clip">
        {/* 2. Hero Section con carrusel de clínica y tipografía Garamond */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* 3. Servicios Clínicos Especializados (6 especialidades) */}
        <ServicesSection onOpenBooking={handleOpenBooking} />

        {/* 4. Metodología Clínica & Pilares del Tratamiento Funcional */}
        <WhyChooseUs onOpenBooking={handleOpenBooking} />

        {/* 5. Equipamiento Biomédico con tabs interactivos y corte asimétrico */}
        <FacilitiesSection onOpenBooking={handleOpenBooking} />

        {/* 6. Cuerpo Clínico Colegiado CTMP */}
        <DoctorsSection onOpenBooking={handleOpenBooking} />

        {/* 7. Banner Verde Quirúrgico con Proceso de Reserva Rápida */}
        <TakeFirstStepBanner onOpenBooking={handleOpenBooking} />

        {/* 8. Sede Chachapoyas Jr. Sociego 357 (mapa) + Formulario de Evaluación */}
        <MissionBanner />
      </main>

      {/* 9. Footer institucional con filigrana botánica de olivo/eucalipto */}
      <Footer />

      {/* Modal global de agendamiento interactivo conectado a Supabase y WhatsApp */}
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialAfeccion={selectedService}
      />

      {/* Asistente Virtual Clínico & Widget de Triage Flotante */}
      <ClinicalAssistantWidget onOpenBooking={handleOpenBooking} />
    </div>
  );
}
