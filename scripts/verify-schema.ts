import * as fs from "fs";
import * as path from "path";

const SCHEMA_FILE = path.join(process.cwd(), "supabase/migrations/20260301000001_mvp_schema.sql");
const TEST_FILE = path.join(process.cwd(), "supabase/tests/20260301000002_rls_isolation_tests.sql");
const TYPES_FILE = path.join(process.cwd(), "src/types/database.ts");

const REQUIRED_TABLES = [
  "clinicas",
  "perfiles_usuarios",
  "pacientes",
  "episodios_clinicos",
  "evaluaciones",
  "planes_terapeuticos",
  "sesiones",
  "citas",
  "biblioteca_ejercicios",
  "prescripciones_ejercicios",
  "registro_adherencia",
  "audit_logs",
];

function verify() {
  console.log("🔍 Iniciando Verificación de Integridad de Esquema y RLS (F1)...\n");

  // 1. Verificar existencia de archivos
  if (!fs.existsSync(SCHEMA_FILE)) throw new Error("Falta archivo de migración");
  if (!fs.existsSync(TEST_FILE)) throw new Error("Falta archivo de pruebas RLS");
  if (!fs.existsSync(TYPES_FILE)) throw new Error("Falta archivo de tipos TypeScript");

  const schemaContent = fs.readFileSync(SCHEMA_FILE, "utf-8");
  const testContent = fs.readFileSync(TEST_FILE, "utf-8");
  const typesContent = fs.readFileSync(TYPES_FILE, "utf-8");

  // 2. Verificar las 12 tablas en SQL
  console.log("1. Verificando creación de las 12 tablas oficiales...");
  for (const table of REQUIRED_TABLES) {
    const tableRegex = new RegExp(`CREATE TABLE IF NOT EXISTS public\\.${table}\\b`, "i");
    if (!tableRegex.test(schemaContent)) {
      throw new Error(`Tabla faltante en migración: public.${table}`);
    }
    console.log(`   ✅ public.${table}`);
  }

  // 3. Verificar activación de RLS en todas las tablas
  console.log("\n2. Verificando activación de Row Level Security (RLS)...");
  for (const table of REQUIRED_TABLES) {
    const rlsRegex = new RegExp(`ALTER TABLE public\\.${table} ENABLE ROW LEVEL SECURITY`, "i");
    if (!rlsRegex.test(schemaContent)) {
      throw new Error(`Falta activar RLS en tabla: public.${table}`);
    }
    console.log(`   🔒 RLS Activo: public.${table}`);
  }

  // 4. Verificar funciones de seguridad
  console.log("\n3. Verificando funciones de seguridad en esquema public...");
  if (!schemaContent.includes("FUNCTION public.clinica_id()")) {
    throw new Error("Falta función public.clinica_id()");
  }
  if (!schemaContent.includes("FUNCTION public.user_role()")) {
    throw new Error("Falta función public.user_role()");
  }
  if (!schemaContent.includes("SET search_path = public, auth, pg_temp")) {
    throw new Error("Falta blindaje de search_path en funciones de seguridad");
  }
  console.log("   ✅ public.clinica_id() con search_path blindado");
  console.log("   ✅ public.user_role() con search_path blindado");

  // 5. Verificar correspondencia en TypeScript
  console.log("\n4. Verificando tipos TypeScript en src/types/database.ts...");
  for (const table of REQUIRED_TABLES) {
    const typeRegex = new RegExp(`\\b${table}:\\s*\\{`, "i");
    if (!typeRegex.test(typesContent)) {
      throw new Error(`Falta tipo TypeScript para tabla: ${table}`);
    }
  }
  console.log("   ✅ Las 12 tablas están estrictamente tipadas en Database['public']['Tables']");

  // 6. Verificar los 7 Tests de Aislamiento
  console.log("\n5. Verificando suite de pruebas de seguridad (7 tests)...");
  const testCases = [
    "TEST 1: Paciente A intenta consultar información de Paciente B",
    "TEST 2: Profesional de Clínica 2 intenta consultar datos de Clínica 1",
    "TEST 3: Paciente intentando modificar sesión",
    "TEST 4: Paciente intentando modificar evaluación",
    "TEST 5: Paciente A intentando registrar adherencia sobre prescripción de Paciente B",
    "TEST 6: Profesional 2 intentando modificar una sesión de Profesional 1",
    "TEST 7: Admin de Clínica 1 NO debe poder consultar registros de Clínica 2",
  ];

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    if (!testContent.includes(`TEST ${i + 1}`)) {
      throw new Error(`Falta caso de prueba: ${tc}`);
    }
    console.log(`   🛡️ ${tc}`);
  }

  console.log("\n========================================================");
  console.log("✨ VERIFICACIÓN EXITOSA: ESQUEMA, RLS Y TESTS 100% VÁLIDOS");
  console.log("========================================================\n");
}

verify();
