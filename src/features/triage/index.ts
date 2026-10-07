/**
 * Módulo de Triage Clínico Desacoplado — Centro Terapéutico Siglo XXI
 *
 * Expone el motor de ejecución, el protocolo versionado por defecto (triage_v1.json),
 * esquemas de validación Zod y funciones de evaluación de respuestas.
 */

import defaultProtocolJson from "./triage_v1.json";
import type { TriageProtocol } from "./types";

export const triageProtocolV1 = defaultProtocolJson as TriageProtocol;

export { default as TriageEngine } from "./TriageEngine";
export * from "./types";
export * from "./validation";
