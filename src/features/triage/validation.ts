import { z } from "zod";

export const TriageOptionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  description: z.string().optional(),
  es_criterio_alarma: z.boolean(),
  category: z
    .enum(["cervical", "lumbar", "articular", "muscular", "general"])
    .optional(),
});

export const TriageQuestionSchema = z.object({
  id: z.string().min(1),
  order: z.number().int().positive(),
  question_text: z.string().min(3),
  helper_text: z.string().optional(),
  type: z.enum(["single_choice", "scale_eva"]),
  options: z.array(TriageOptionSchema).min(1),
});

export const TriageResultMessagesSchema = z.object({
  orientativo: z.object({
    title: z.string(),
    badge: z.string(),
    summary: z.string(),
    disclaimer: z.string(),
    cta_label: z.string(),
  }),
  alerta: z.object({
    title: z.string(),
    badge: z.string(),
    summary: z.string(),
    recommendation: z.string(),
    emergency_notice: z.string(),
    emergency_phone: z.string(),
  }),
});

export const TriageProtocolSchema = z.object({
  version: z.string(),
  approved_by: z.string().nullable(),
  approved_at: z.string().nullable(),
  clinical_status: z.enum(["PENDIENTE DE VALIDACIÓN CLÍNICA", "APROBADO"]),
  disclaimer_initial: z.string(),
  questions: z.array(TriageQuestionSchema).min(1),
  result_messages: TriageResultMessagesSchema,
});

export function validateTriageProtocol(protocol: unknown) {
  return TriageProtocolSchema.safeParse(protocol);
}

import type {
  TriageProtocol,
  TriageAnswers,
  TriageEvaluationResult,
} from "./types";

export function evaluateTriageAnswers(
  protocol: TriageProtocol,
  answers: TriageAnswers
): TriageEvaluationResult {
  const alarmReasons: string[] = [];
  const summaryParts: string[] = [];

  for (const question of protocol.questions) {
    const answer = answers[question.id];
    if (answer === undefined) continue;

    if (question.type === "single_choice") {
      const selectedOption = question.options.find((opt) => opt.id === answer);
      if (selectedOption) {
        if (selectedOption.es_criterio_alarma) {
          alarmReasons.push(
            `Criterio de alarma en "${question.question_text}": ${selectedOption.label}`
          );
        }
        summaryParts.push(`${question.question_text}: ${selectedOption.label}`);
      }
    } else if (question.type === "scale_eva") {
      const evaValue = Number(answer);
      summaryParts.push(`Intensidad de molestia (Escala EVA): ${evaValue}/10`);
    }
  }

  return {
    has_alarm: alarmReasons.length > 0,
    alarm_reasons: alarmReasons,
    answers,
    protocol_version: protocol.version,
    summary_text: summaryParts.join(" | "),
  };
}

