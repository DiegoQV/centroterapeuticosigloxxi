/**
 * Script de Verificación y Pruebas Unitarias del Motor de Triage — F2
 *
 * Ejecutar con: npx tsx scripts/verify-triage.ts
 */

import defaultProtocolJson from "../src/features/triage/triage_v1.json";
import {
  validateTriageProtocol,
  evaluateTriageAnswers,
} from "../src/features/triage/validation";
import { NEUTRAL_WHATSAPP_MESSAGE } from "../src/features/triage/TriageEngine";
import type { TriageProtocol, TriageAnswers } from "../src/features/triage/types";

function runTests() {
  console.log("=================================================");
  console.log("  VERIFICACIÓN DEL MOTOR DE TRIAGE ORIENTATIVO  ");
  console.log("=================================================\n");

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`);
      process.exitCode = 1;
    }
  }

  // 1. Validar esquema del protocolo triage_v1.json y estado no validado
  console.log("1. Validación del Protocolo JSON y Estado DEMO");
  const validationResult = validateTriageProtocol(defaultProtocolJson);
  assert(validationResult.success, "El protocolo cumple estrictamente el esquema Zod");

  if (!validationResult.success) {
    console.error("Detalle del error Zod:", validationResult.error);
    process.exit(1);
  }

  const protocol: TriageProtocol = validationResult.data;
  assert(
    protocol.clinical_status === "PENDIENTE DE VALIDACIÓN CLÍNICA",
    "El protocolo mantiene explícito el estado 'PENDIENTE DE VALIDACIÓN CLÍNICA'"
  );
  assert(
    protocol.approved_by === null,
    "approved_by es estrictamente null (pendiente de validación oficial)"
  );
  assert(
    protocol.questions.length >= 3,
    `El protocolo incluye suficientes preguntas de filtro (preguntas registradas: ${protocol.questions.length})`
  );

  const firstQuestion = protocol.questions[0];
  assert(
    firstQuestion.id === "q_seguridad_demo" &&
      firstQuestion.question_text.includes("prueba"),
    "La primera pregunta de seguridad está explícitamente identificada como de prueba DEMO"
  );

  const hasEvaQuestion = protocol.questions.some((q) => q.type === "scale_eva");
  assert(hasEvaQuestion, "El protocolo incluye al menos una pregunta de escala EVA (1-10)");

  // 2. Probar flujo sin criterios de alarma (camino orientativo seguro)
  console.log("\n2. Evaluación de Respuestas sin Criterio de Alarma (Orientativo)");
  const safeAnswers: TriageAnswers = {
    q_seguridad_demo: "opt_sin_alarma",
    q_zona_molestia: "opt_lumbar",
    q_impacto_cotidiano: "opt_movilidad",
    q_escala_eva: 5,
  };

  const safeEvaluation = evaluateTriageAnswers(protocol, safeAnswers);
  assert(!safeEvaluation.has_alarm, "has_alarm debe ser falso para respuestas sin alarma");
  assert(
    safeEvaluation.alarm_reasons.length === 0,
    "alarm_reasons debe estar vacío para respuestas seguras"
  );
  assert(
    safeEvaluation.summary_text.includes("Escala EVA"),
    "El resumen incluye la calibración de la escala EVA como dato descriptivo"
  );

  // 3. Probar flujo con criterio de alarma (derivación médica prioritaria)
  console.log("\n3. Evaluación de Respuestas con Criterio de Alarma (Emergencia/Alerta)");
  const alarmAnswers: TriageAnswers = {
    q_seguridad_demo: "opt_con_alarma_demo",
    q_zona_molestia: "opt_lumbar",
    q_impacto_cotidiano: "opt_dormir",
    q_escala_eva: 9,
  };

  const alarmEvaluation = evaluateTriageAnswers(protocol, alarmAnswers);
  assert(alarmEvaluation.has_alarm, "has_alarm debe ser verdadero al activar opción de alarma");
  assert(
    alarmEvaluation.alarm_reasons.length > 0,
    `Se registra al menos un motivo de alarma explícito (motivos: ${alarmEvaluation.alarm_reasons.length})`
  );
  assert(
    alarmEvaluation.alarm_reasons[0].includes("Criterio de alarma"),
    "El motivo describe claramente la presencia del criterio de alarma"
  );

  // 4. Verificación de mensaje neutral de WhatsApp y privacidad
  console.log("\n4. Verificación de Mensaje de WhatsApp Administrativo Neutral");
  assert(
    NEUTRAL_WHATSAPP_MESSAGE ===
      "Hola, quiero solicitar una evaluación. Completé la orientación inicial en la web.",
    "El mensaje de WhatsApp es estrictamente el texto administrativo neutral requerido"
  );
  assert(
    !NEUTRAL_WHATSAPP_MESSAGE.toLowerCase().includes("dolor") &&
      !/\beva\b/i.test(NEUTRAL_WHATSAPP_MESSAGE) &&
      !NEUTRAL_WHATSAPP_MESSAGE.toLowerCase().includes("ciática") &&
      !NEUTRAL_WHATSAPP_MESSAGE.toLowerCase().includes("diagnóstico"),
    "El mensaje de WhatsApp no transmite síntomas, escalas ni diagnósticos en los parámetros de la URL"
  );
  assert(
    protocol.result_messages.alerta.emergency_phone.includes("941 996 388"),
    "El teléfono de soporte del centro coincide con el oficial (+51 941 996 388)"
  );
  assert(
    protocol.result_messages.alerta.recommendation.includes("Hospital Regional Virgen de Fátima"),
    "La recomendación de derivación prioritaria incluye el hospital de referencia en Chachapoyas"
  );

  console.log(`\n-------------------------------------------------`);
  console.log(`Resumen de Pruebas: ${passedTests} de ${totalTests} aprobadas.`);
  console.log(`=================================================\n`);
}

runTests();
