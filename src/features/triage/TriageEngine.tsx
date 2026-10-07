"use client";

import { useState, useId } from "react";
import {
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ShieldCheck,
  Send,
  PhoneCall,
  Activity,
  Flame,
  FileText,
  AlertCircle,
} from "lucide-react";
import type {
  TriageProtocol,
  TriageAnswers,
  TriageEvaluationResult,
} from "./types";
import { evaluateTriageAnswers } from "./validation";
import defaultProtocolJson from "./triage_v1.json";

const defaultProtocol = defaultProtocolJson as TriageProtocol;

export const NEUTRAL_WHATSAPP_MESSAGE =
  "Hola, quiero solicitar una evaluación. Completé la orientación inicial en la web.";

interface TriageEngineProps {
  protocol?: TriageProtocol;
  onComplete?: (result: TriageEvaluationResult) => void;
  className?: string;
}

export default function TriageEngine({
  protocol = defaultProtocol,
  onComplete,
  className = "",
}: TriageEngineProps) {
  const sliderId = useId();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<TriageAnswers>({
    // Default EVA value to 5 for comfortable baseline slider interaction
    q_escala_eva: 5,
  });
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const isDemoOrPending =
    protocol.clinical_status === "PENDIENTE DE VALIDACIÓN CLÍNICA" ||
    protocol.approved_by === null;

  const questions = protocol.questions;
  const currentQuestion = questions[currentStep];
  const totalSteps = questions.length;

  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const isStepValid = currentAnswer !== undefined;

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleEvaChange = (val: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: val,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      if (onComplete) {
        onComplete(evaluateTriageAnswers(protocol, answers));
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({ q_escala_eva: 5 });
    setIsCompleted(false);
  };

  // Evaluate final state locally without any remote DB storage
  const evaluationResult: TriageEvaluationResult = evaluateTriageAnswers(
    protocol,
    answers
  );

  // Helper for EVA scale details (purely descriptive calibration, zero diagnostic claims)
  const getEvaVisuals = (evaScore: number) => {
    if (evaScore <= 3) {
      return {
        label: "Leve / Molestia tolerable",
        desc: "Permite realizar actividades cotidianas con ligero esfuerzo o incomodidad transitoria.",
        bgBadge: "bg-emerald-100 text-emerald-800 border-emerald-300",
        sliderColor: "#059669",
        btnColor: "bg-emerald-600 text-white",
      };
    }
    if (evaScore <= 6) {
      return {
        label: "Moderado / Dificulta tareas diarias",
        desc: "Interfiere con el descanso o la jornada laboral; rigidez o incomodidad persistente.",
        bgBadge: "bg-amber-100 text-amber-800 border-amber-300",
        sliderColor: "#d97706",
        btnColor: "bg-amber-600 text-white",
      };
    }
    return {
      label: "Severo / Dolor intenso o limitante",
      desc: "Dificulta severamente el movimiento, conciliar el sueño o mantener posturas habituales.",
      bgBadge: "bg-rose-100 text-rose-800 border-rose-300",
      sliderColor: "#e11d48",
      btnColor: "bg-rose-600 text-white",
    };
  };

  const evaValue = Number(answers.q_escala_eva ?? 5);
  const evaVisuals = getEvaVisuals(evaValue);

  // Strictly neutral administrative WhatsApp referral (NO clinical or diagnostic data in URL)
  const buildNeutralWhatsAppUrl = () => {
    const phoneNumber = "51941996388";
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      NEUTRAL_WHATSAPP_MESSAGE
    )}`;
  };

  return (
    <div
      className={`bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden ${className}`}
    >
      {/* Top Protocol Status Banner */}
      <div className="bg-slate-900 text-slate-300 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-bold text-white tracking-wide">
            Triage Orientativo
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">Versión {protocol.version}</span>
        </div>

        <div className="flex items-center gap-2">
          {isDemoOrPending ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/50 uppercase tracking-wide">
              DEMO / PENDIENTE DE VALIDACIÓN CLÍNICA
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
              {protocol.clinical_status}
            </span>
          )}
        </div>
      </div>

      {/* Explicit Notice when in DEMO / PENDING status */}
      {isDemoOrPending && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 text-xs text-amber-950 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5 leading-relaxed">
            <strong className="font-bold text-amber-900">
              AVISO: Versión DEMO preliminar (no validada oficialmente)
            </strong>
            <p className="text-amber-900/90">
              Este cuestionario y sus filtros de alarma corresponden a una versión técnica de prueba.
              <strong> NO constituye un protocolo clínico oficial</strong>, NO emite diagnósticos ni prescribe tratamientos. Toda valoración física debe ser realizada presencialmente por el profesional titulado en Jr. Sociego.
            </p>
          </div>
        </div>
      )}

      {/* Initial Clinical Disclaimer Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 text-xs text-slate-700 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Propósito de orientación:</strong> {protocol.disclaimer_initial}
        </p>
      </div>

      {/* Main Wizard Area */}
      {!isCompleted ? (
        <div className="p-6 sm:p-8 lg:p-10 space-y-8">
          {/* Progress Bar & Counter */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span className="text-emerald-700 font-bold uppercase tracking-wider">
                Paso {currentStep + 1} de {totalSteps}
              </span>
              <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% completado</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                style={{
                  width: `${((currentStep + 1) / totalSteps) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Current Question Block */}
          {currentQuestion && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {currentQuestion.question_text}
                </h3>
                {currentQuestion.helper_text && (
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                    {currentQuestion.helper_text}
                  </p>
                )}
              </div>

              {/* Single Choice Options */}
              {currentQuestion.type === "single_choice" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentQuestion.options.map((option) => {
                    const isSelected = currentAnswer === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          handleSelectOption(currentQuestion.id, option.id)
                        }
                        className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? option.es_criterio_alarma
                              ? "bg-rose-50/70 border-rose-500 ring-2 ring-rose-500/20 shadow-xs"
                              : "bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs"
                            : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-sm font-bold ${
                                isSelected
                                  ? option.es_criterio_alarma
                                    ? "text-rose-900"
                                    : "text-emerald-950"
                                  : "text-slate-900"
                              }`}
                            >
                              {option.label}
                            </span>
                            {isSelected && (
                              <CheckCircle
                                className={`w-4 h-4 shrink-0 ${
                                  option.es_criterio_alarma
                                    ? "text-rose-600"
                                    : "text-emerald-600"
                                }`}
                              />
                            )}
                          </div>
                          {option.description && (
                            <p className="text-xs text-slate-500 leading-relaxed">
                              {option.description}
                            </p>
                          )}
                        </div>

                        {option.es_criterio_alarma && (
                          <div className="mt-2 pt-2 border-t border-rose-100 text-[11px] font-semibold text-rose-700 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                            <span>Criterio de Alarma (Contenido DEMO - Pendiente de Aprobación)</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Scale EVA Option */}
              {currentQuestion.type === "scale_eva" && (
                <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                        Calibración Numérica
                      </span>
                      <h4 className="text-lg font-bold text-slate-900">
                        Intensidad: {evaValue} de 10
                      </h4>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${evaVisuals.bgBadge}`}
                    >
                      <Flame className="w-4 h-4" />
                      <span>{evaVisuals.label}</span>
                    </div>
                  </div>

                  {/* Range slider */}
                  <div>
                    <input
                      id={sliderId}
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={evaValue}
                      onChange={(e) =>
                        handleEvaChange(parseInt(e.target.value, 10))
                      }
                      className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 transition-all"
                      style={{ accentColor: evaVisuals.sliderColor }}
                      aria-label="Escala de dolor de 1 a 10"
                    />
                  </div>

                  {/* 10 number button grid */}
                  <div className="grid grid-cols-10 gap-1.5 text-center">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => {
                      const isCurrent = val === evaValue;
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleEvaChange(val)}
                          className={`py-2 text-xs sm:text-sm rounded-xl transition-all cursor-pointer font-bold ${
                            isCurrent
                              ? `${evaVisuals.btnColor} shadow-md scale-105 ring-2 ring-slate-900/10`
                              : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-xs text-slate-600 italic bg-white p-3 rounded-xl border border-slate-200">
                    &ldquo;{evaVisuals.desc}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                title="Reiniciar cuestionario"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reiniciar</span>
              </button>
            </div>

            <button
              type="button"
              disabled={!isStepValid}
              onClick={handleNext}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                isStepValid
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/20 hover:scale-[1.02]"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              <span>
                {currentStep === totalSteps - 1
                  ? "Finalizar Orientación"
                  : "Siguiente Pregunta"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results View (Decoupled between Alert vs Safe Orientative) */
        <div className="p-6 sm:p-8 lg:p-10">
          {evaluationResult.has_alarm ? (
            /* Emergency / Medical Alert Outcome */
            <div className="space-y-6">
              <div className="bg-rose-50 border border-rose-300 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-600/30">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-200 text-rose-900 mb-1">
                      {protocol.result_messages.alerta.badge} (Filtro DEMO)
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-rose-950">
                      {protocol.result_messages.alerta.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-rose-900 leading-relaxed font-medium">
                  {protocol.result_messages.alerta.summary}
                </p>

                <div className="bg-white p-4 rounded-xl border border-rose-200 text-xs sm:text-sm text-slate-800 space-y-2">
                  <strong className="text-rose-700 block uppercase font-bold text-[11px] tracking-wider">
                    Recomendación de Seguridad Inmediata:
                  </strong>
                  <p className="leading-relaxed">
                    {protocol.result_messages.alerta.recommendation}
                  </p>
                  <p className="text-xs text-slate-500 pt-1 border-t border-slate-100 italic">
                    {protocol.result_messages.alerta.emergency_notice}
                  </p>
                </div>

                <div className="p-3 bg-rose-100/70 rounded-xl border border-rose-200 text-xs text-rose-900">
                  <strong>Aviso de versión DEMO:</strong> Este filtro de alarma opera como validación técnica preliminar. No sustituye la valoración médica ni descarta urgencias reales.
                </div>

                {/* Emergency Contact Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:106"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Llamar a Emergencias (SAMU 106)</span>
                  </a>
                  <a
                    href={`tel:${protocol.result_messages.alerta.emergency_phone.replace(
                      /\s+/g,
                      ""
                    )}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 transition-all"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-600" />
                    <span>Consultar al Centro ({protocol.result_messages.alerta.emergency_phone})</span>
                  </a>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 py-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Volver a completar el formulario</span>
                </button>
              </div>
            </div>
          ) : (
            /* Safe Orientative Outcome */
            <div className="space-y-8">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-700/20">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 mb-1">
                      {protocol.result_messages.orientativo.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-950">
                      {protocol.result_messages.orientativo.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {protocol.result_messages.orientativo.summary}
                </p>

                {/* Patient Summary Recap (Strictly observational, zero diagnostic claims) */}
                <div className="bg-white p-4 rounded-xl border border-slate-200/90 text-xs sm:text-sm text-slate-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider pb-1 border-b border-slate-100">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Resumen de tu Información Reportada (Uso Administrativo Local)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="bg-slate-50 p-2.5 rounded-lg">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Zona Indicada
                      </span>
                      <span className="text-xs font-semibold text-slate-900">
                        {questions
                          .find((q) => q.id === "q_zona_molestia")
                          ?.options.find((o) => o.id === answers.q_zona_molestia)
                          ?.label || "No especificada"}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Escala EVA
                      </span>
                      <span className="text-xs font-semibold text-slate-900">
                        {evaValue}/10 ({evaVisuals.label})
                      </span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Actividad Afectada
                      </span>
                      <span className="text-xs font-semibold text-slate-900">
                        {questions
                          .find((q) => q.id === "q_impacto_cotidiano")
                          ?.options.find((o) => o.id === answers.q_impacto_cotidiano)
                          ?.label || "No especificada"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Important Clinical Disclaimer */}
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <strong className="block font-bold">
                    Aviso Importante ({protocol.clinical_status}):
                  </strong>
                  <p className="leading-relaxed">
                    {protocol.result_messages.orientativo.disclaimer}
                  </p>
                </div>
              </div>

              {/* Conversion CTA to WhatsApp Coordination with Strictly Neutral Administrative Message */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-1.5 text-center sm:text-left">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                    Paso Siguiente: Evaluación Presencial
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    Solicita tu cita en Jr. Sociego, Chachapoyas
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md">
                    El enlace abre un mensaje administrativo neutral para coordinar fecha y hora, sin enviar diagnósticos ni datos clínicos en la URL.
                  </p>
                </div>

                <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
                  <a
                    href={buildNeutralWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 transition-all shadow-lg shadow-emerald-400/25 hover:scale-[1.02] w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4" />
                    <span>{protocol.result_messages.orientativo.cta_label}</span>
                  </a>
                  <span className="text-[11px] text-slate-400 mt-2 text-center sm:text-right">
                    Mensaje neutral vía WhatsApp (+51 941 996 388)
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 py-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Volver a realizar el cuestionario</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
