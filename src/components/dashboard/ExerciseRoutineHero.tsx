"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

interface ExerciseItem {
  id: string;
  name: string;
  category: string;
  phase: string;
  sets: string;
  durationSec: number;
  image: string;
  description: string;
  targetMuscles: string[];
  stages: string[];
}

const EXERCISES: ExerciseItem[] = [
  {
    id: "reverse-plank",
    name: "Puente Glúteo con Descompresión Lumbar",
    category: "Cadena Posterior & Estabilización Core",
    phase: "Fase 2 de 3 · Fortalecimiento Isométrico",
    sets: "3 series × 12 repeticiones",
    durationSec: 275, // 04:35
    image: "/images/anatomy/exercise-main-plank.jpg",
    description:
      "Contracción isométrica mantenida de 5 a 8 segundos con báscula pélvica neutra. Activa el glúteo mayor y musculatura paravertebral profunda sin sobrecargar la charnela lumbosacra.",
    targetMuscles: [
      "Glúteo Mayor & Medio",
      "Erectores Espinales",
      "Transverso Abdominal",
      "Multífidos Raquídeos",
    ],
    stages: [
      "Posición Supina",
      "Retroversión Pélvica",
      "Elevación Isométrica",
      "Sostén 6s",
      "Descenso Controlado",
    ],
  },
  {
    id: "cobra",
    name: "Cobra - Descompresión Lumbar McKenzie",
    category: "Movilidad Raquídea & Extensión Pasiva",
    phase: "Fase 1 de 3 · Descarga Discal",
    sets: "2 series × 15 repeticiones",
    durationSec: 180, // 03:00
    image: "/images/anatomy/exercise-cobra.jpg",
    description:
      "Extensión suave de tronco apoyado en antebrazos o palmas para centralizar el dolor discal y descomprimir el espacio intervertebral L4-L5 y L5-S1.",
    targetMuscles: [
      "Ligamento Longitudinal Anterior",
      "Psoas Ilíaco",
      "Recto Abdominal",
      "Erectores Torácicos",
    ],
    stages: [
      "Decúbito Prono",
      "Apoyo Palmar",
      "Extensión Gradual",
      "Respiración Diafragmática",
      "Retorno Neutro",
    ],
  },
  {
    id: "bird-dog",
    name: "Bird-Dog - Control Motor Cuadrupedia",
    category: "Control Neuromuscular & Antirrotación",
    phase: "Fase 2 de 3 · Estabilidad Dinámica",
    sets: "3 series × 10 reps por lado",
    durationSec: 240, // 04:00
    image: "/images/anatomy/exercise-bird-dog.jpg",
    description:
      "Extensión contralateral simultánea de extremidades manteniendo el raquis lumbar en rigidez neutral. Evita la hiperlordosis y entrena la propriocepción.",
    targetMuscles: [
      "Multífidos Contralaterales",
      "Glúteo Mayor",
      "Deltoides Posterior",
      "Dorsal Ancho",
    ],
    stages: [
      "Cuadrupedia Neutra",
      "Extensión Cruzada",
      "Alineación Raquis",
      "Pausa Isométrica 3s",
      "Alternancia de Lado",
    ],
  },
  {
    id: "triangle-stretch",
    name: "Estiramiento Activo de Cadena Lateral",
    category: "Flexibilidad Miofascial & Apertura Costal",
    phase: "Fase 3 de 3 · Flexibilidad Funcional",
    sets: "2 series × 30 segundos de sostén",
    durationSec: 150, // 02:30
    image: "/images/anatomy/exercise-triangle.jpg",
    description:
      "Inclinación lateral sostenida en bipedestación para elongación del cuadrado lumbar, fascia toracolumbar y complejo iliocostal.",
    targetMuscles: [
      "Cuadrado Lumbar",
      "Oblicuos Interno y Externo",
      "Tensor de la Fascia Lata",
      "Dorsal Ancho",
    ],
    stages: [
      "Bipedestación Abierta",
      "Inclinación Pura",
      "Apertura Costal",
      "Respiración Profunda",
      "Recuperación del Eje",
    ],
  },
];

export default function ExerciseRoutineHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(EXERCISES[0].durationSec);
  const [currentStage, setCurrentStage] = useState(2); // 0-indexed stage (Paso 3 activo)

  const activeExercise = EXERCISES[currentIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, timeLeft]);

  const selectExercise = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(false);
    setTimeLeft(EXERCISES[index].durationSec);
    setCurrentStage(2);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const nextExercises = EXERCISES.map((ex, idx) => ({
    ...ex,
    originalIndex: idx,
  })).filter((_, idx) => idx !== currentIndex);

  return (
    <div className="space-y-6 font-sans">
      {/* 1. MÓDULO PROTAGONISTA INDISCUTIBLE: EJERCICIO ACTIVO */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs">
        
        {/* Encabezado del Ejercicio Activo */}
        <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#0B3B32] font-black text-sm leading-none">•</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {activeExercise.category}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {activeExercise.name}
            </h2>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                {activeExercise.sets}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500">{activeExercise.phase}</span>
            </div>
          </div>

          {/* Temporizador y Control Operativo */}
          <div className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 bg-slate-50/60">
            <div className="px-2.5 text-right">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block -mb-0.5">
                Tiempo
              </span>
              <span className="font-mono text-lg font-bold text-slate-900">
                {formatTime(timeLeft)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-md font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                isPlaying
                  ? "bg-amber-600 hover:bg-amber-700 text-white"
                  : "bg-[#0B3B32] hover:bg-[#062620] text-white"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pausa</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Iniciar</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setTimeLeft(activeExercise.durationSec);
              }}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              title="Reiniciar tiempo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sección Central: Especificaciones Clínicas + Lámina Biomecánica 3D */}
        <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Lado Izquierdo: Descripción y Cadenas Diana en Formato Continuo */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                Criterio y Prescripción Técnica
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeExercise.description}
              </p>
            </div>

            {/* Cadenas Diana como Texto Semántico Continuo (Sin Chips) */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                Musculatura Diana Principal:
              </span>
              <p className="text-xs text-slate-700 font-medium">
                {activeExercise.targetMuscles.join(" · ")}
              </p>
            </div>
          </div>

          {/* Lado Derecho: Lámina Biomecánica Protagonista */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-[420px] aspect-4/3 rounded-lg overflow-hidden border border-slate-200 bg-slate-950 relative shadow-2xs">
              <Image
                src={activeExercise.image}
                alt={activeExercise.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-2 block font-normal">
              Figura Biomecánica · Referencia Anatómica Tridimensional
            </span>
          </div>

        </div>

        {/* Stepper Continuo de 5 Fases Clínicas (Sin Cajas Individuales) */}
        <div className="pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-semibold text-slate-700">
              Secuencia de Fases Clínicas
            </span>
            <span className="text-slate-500">
              Paso {currentStage + 1} de {activeExercise.stages.length}:{" "}
              <strong className="text-[#0B3B32]">{activeExercise.stages[currentStage]}</strong>
            </span>
          </div>

          {/* Línea de Pasos Conectada */}
          <div className="grid grid-cols-5 gap-1.5">
            {activeExercise.stages.map((stage, idx) => {
              const isCompleted = idx < currentStage;
              const isCurrent = idx === currentStage;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentStage(idx)}
                  className={`text-left p-2 rounded-md transition-colors cursor-pointer border ${
                    isCurrent
                      ? "border-[#0B3B32] bg-emerald-50/50"
                      : isCompleted
                      ? "border-slate-200 bg-slate-50/70 text-slate-700"
                      : "border-slate-100 bg-white text-slate-400 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className={`w-3.5 h-3.5 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? "bg-[#0B3B32] text-white"
                          : isCompleted
                          ? "bg-slate-400 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isCompleted ? <Check className="w-2 h-2 stroke-[3]" /> : idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-semibold truncate ${
                        isCurrent ? "text-[#0B3B32]" : "text-slate-500"
                      }`}
                    >
                      Paso {idx + 1}
                    </span>
                  </div>

                  <span
                    className={`text-[11px] block truncate ${
                      isCurrent
                        ? "text-slate-900 font-semibold"
                        : isCompleted
                        ? "text-slate-600 font-medium"
                        : "text-slate-400"
                    }`}
                  >
                    {stage}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 2. SIGUIENTES EJERCICIOS EN LA PAUTA (Foco Secundario) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[#0B3B32] font-black text-sm leading-none">•</span>
            <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-900">
              Siguientes Ejercicios en la Pauta
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                const prevIdx =
                  (currentIndex - 1 + EXERCISES.length) % EXERCISES.length;
                selectExercise(prevIdx);
              }}
              className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
              title="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                const nextIdx = (currentIndex + 1) % EXERCISES.length;
                selectExercise(nextIdx);
              }}
              className="p-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
              title="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Tarjetas de Previsualización */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {nextExercises.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => selectExercise(exercise.originalIndex)}
              className="bg-white rounded-lg border border-slate-200 hover:border-slate-300 p-3 transition-colors cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-16/10 rounded overflow-hidden bg-slate-950 mb-2 border border-slate-100">
                  <Image
                    src={exercise.image}
                    alt={exercise.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-slate-900/80 text-[10px] font-mono text-slate-200">
                    {formatTime(exercise.durationSec)}
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-[#0B3B32] block truncate">
                  {exercise.category}
                </span>
                <h4 className="font-semibold text-xs text-slate-900 line-clamp-1 mt-0.5">
                  {exercise.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {exercise.sets}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] font-semibold text-[#0B3B32] text-right">
                Cargar en sesión →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
