/**
 * Tipos del Motor de Triage Orientativo — Centro Terapéutico Siglo XXI
 *
 * Desacopla la lógica del motor de ejecución del contenido clínico versionado.
 */

export type QuestionType = "single_choice" | "scale_eva";

export interface TriageOption {
  id: string;
  label: string;
  description?: string;
  es_criterio_alarma: boolean;
  category?: "cervical" | "lumbar" | "articular" | "muscular" | "general";
}

export interface TriageQuestion {
  id: string;
  order: number;
  question_text: string;
  helper_text?: string;
  type: QuestionType;
  options: TriageOption[];
}

export interface TriageResultMessages {
  orientativo: {
    title: string;
    badge: string;
    summary: string;
    disclaimer: string;
    cta_label: string;
  };
  alerta: {
    title: string;
    badge: string;
    summary: string;
    recommendation: string;
    emergency_notice: string;
    emergency_phone: string;
  };
}

export interface TriageProtocol {
  version: string;
  approved_by: string | null;
  approved_at: string | null;
  clinical_status: "PENDIENTE DE VALIDACIÓN CLÍNICA" | "APROBADO";
  disclaimer_initial: string;
  questions: TriageQuestion[];
  result_messages: TriageResultMessages;
}

export type TriageAnswers = Record<string, string | number>;

export interface TriageEvaluationResult {
  has_alarm: boolean;
  alarm_reasons: string[];
  answers: TriageAnswers;
  protocol_version: string;
  summary_text: string;
}
