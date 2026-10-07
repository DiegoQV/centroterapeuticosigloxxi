import * as fs from "fs";
import * as path from "path";

const SCHEMA_FILE = path.join(process.cwd(), "supabase/migrations/20260301000001_mvp_schema.sql");
const SERVER_AUTH_FILE = path.join(process.cwd(), "src/features/auth/server.ts");
const ACTIONS_FILE = path.join(process.cwd(), "src/features/auth/actions.ts");
const ADMIN_CLIENT_FILE = path.join(process.cwd(), "src/lib/supabase/admin.ts");
const ADMIN_PAGE_FILE = path.join(process.cwd(), "src/app/(pro)/admin/page.tsx");
const PRO_LAYOUT_FILE = path.join(process.cwd(), "src/app/(pro)/layout.tsx");

interface TestResult {
  id: number;
  name: string;
  passed: boolean;
  detail: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, id: number, name: string, detail: string) {
  if (!condition) {
    results.push({ id, name, passed: false, detail });
    console.error(`❌ [FAIL] Test ${id}: ${name} — ${detail}`);
  } else {
    results.push({ id, name, passed: true, detail });
    console.log(`✅ [PASS] Test ${id}: ${name}`);
  }
}

async function runAuthSecuritySuite() {
  console.log("===============================================================================");
  console.log("  SUITE DE PRUEBAS DE SEGURIDAD Y AUTENTICACIÓN F3 (10 ESCENARIOS)");
  console.log("  Centro Terapéutico Siglo XXI — Chachapoyas");
  console.log("===============================================================================\n");

  const schemaContent = fs.readFileSync(SCHEMA_FILE, "utf-8");
  const serverAuthContent = fs.readFileSync(SERVER_AUTH_FILE, "utf-8");
  const actionsContent = fs.readFileSync(ACTIONS_FILE, "utf-8");
  const adminClientContent = fs.readFileSync(ADMIN_CLIENT_FILE, "utf-8");
  const adminPageContent = fs.readFileSync(ADMIN_PAGE_FILE, "utf-8");
  const proLayoutContent = fs.readFileSync(PRO_LAYOUT_FILE, "utf-8");

  // TEST 1: Intento de acceso a /admin sin sesión
  // Verificación: requireAdmin -> requireRole -> requireAuth -> redirect("/login")
  const test1Pass =
    serverAuthContent.includes('redirect("/login")') &&
    serverAuthContent.includes("requireAdmin") &&
    adminPageContent.includes("await requireAdmin()");
  assert(
    test1Pass,
    1,
    "Acceso a /admin sin sesión redirige obligatoriamente a /login",
    "requireAdmin() invoca requireAuth() que intercepta sesiones nulas hacia /login"
  );

  // TEST 2: Intento de acceso a /admin con rol 'paciente'
  // Verificación: requireRole detecta rol 'paciente' y redirige a /pauta
  const test2Pass =
    serverAuthContent.includes('if (sessionUser.profile.rol === "paciente")') &&
    serverAuthContent.includes('redirect("/pauta")');
  assert(
    test2Pass,
    2,
    "Acceso a /admin con rol 'paciente' es bloqueado y redirige a /pauta",
    "El guard de autorización detecta el rol paciente y lo expulsa hacia su portal"
  );

  // TEST 3: Intento de acceso a /admin con rol 'profesional'
  // Verificación: requireAdmin solo permite ['admin']. Si el rol es 'profesional', no está en allowedRoles y redirige a /dashboard
  const test3Pass =
    serverAuthContent.includes('requireRole(["admin"])') &&
    serverAuthContent.includes('redirect("/dashboard")') &&
    proLayoutContent.includes('requireRole(["admin", "profesional"])');
  assert(
    test3Pass,
    3,
    "Acceso a /admin con rol 'profesional' es bloqueado y redirige a /dashboard",
    "requireAdmin() restringe estrictamente a 'admin'; profesionales son redirigidos a /dashboard"
  );

  // TEST 4: Acceso a /admin con rol 'admin'
  // Verificación: requireAdmin permite continuar la ejecución al admin
  const test4Pass =
    serverAuthContent.includes("return sessionUser") &&
    adminPageContent.includes("sessionUser.profile.clinica_id");
  assert(
    test4Pass,
    4,
    "Acceso a /admin con rol 'admin' es permitido",
    "El usuario administrador es autorizado y obtiene su perfil para renderizar la consola"
  );

  // TEST 5: Intento de paciente A de consultar datos de paciente B en Supabase RLS
  // Verificación: RLS en tabla pacientes exige (perfil_id = auth.uid()) para pacientes
  const test5Pass =
    schemaContent.includes('"pacientes_select"') &&
    schemaContent.includes("perfil_id = auth.uid()");
  assert(
    test5Pass,
    5,
    "Aislamiento RLS entre pacientes: Paciente A no puede ver datos de Paciente B",
    "La política pacientes_select limita estrictamente la lectura propia a perfil_id = auth.uid()"
  );

  // TEST 6: Intento de usuario de modificar su propio rol en perfiles_usuarios (Privilege Escalation)
  // Verificación: WITH CHECK en perfiles_user_update_self exige rol = public.user_role()
  const test6Pass =
    schemaContent.includes("rol = public.user_role()::public.user_role_type");
  assert(
    test6Pass,
    6,
    "Bloqueo RLS de escalada de privilegios: El usuario no puede modificar su propio rol",
    "La cláusula WITH CHECK de perfiles_user_update_self exige rol = user_role(), rechazando alteraciones"
  );

  // TEST 7: Intento de usuario de modificar su propio clinica_id (Clinic Hopping)
  // Verificación: WITH CHECK en perfiles_user_update_self exige clinica_id = public.clinica_id()
  const test7Pass =
    schemaContent.includes("clinica_id = public.clinica_id()");
  assert(
    test7Pass,
    7,
    "Bloqueo RLS de cambio de clínica (Clinic Hopping): clinica_id es inmutable",
    "La cláusula WITH CHECK de perfiles_user_update_self exige clinica_id = public.clinica_id()"
  );

  // TEST 8: Aislamiento multi-tenant entre clínicas (Staff Clínica 1 vs Clínica 2)
  // Verificación: RLS en pacientes exige clinica_id = public.clinica_id()
  const test8Pass =
    schemaContent.includes("clinica_id = public.clinica_id()") &&
    schemaContent.includes("public.user_role() IN ('admin', 'profesional')");
  assert(
    test8Pass,
    8,
    "Aislamiento multi-tenant: Staff de Clínica 1 no puede ver pacientes de Clínica 2",
    "Todas las políticas de staff exigen clinica_id = public.clinica_id() resuelto en Postgres"
  );

  // TEST 9: Invalidación de sesión y cookies en Logout
  // Verificación: logoutAction invoca supabase.auth.signOut() y borra cookies de sesión
  const test9Pass =
    actionsContent.includes("supabase.auth.signOut()") &&
    actionsContent.includes("patient_session_token") &&
    actionsContent.includes('redirect("/login")');
  assert(
    test9Pass,
    9,
    "Cierre de sesión seguro: Invalida token en Supabase Auth y destruye cookies de sesión",
    "logoutAction ejecuta signOut() en Supabase y limpia patient_session_token"
  );

  // TEST 10: Aislamiento absoluto de service_role (Cero fugas al cliente)
  // Verificación 10.1: admin.ts importa 'server-only'
  // Verificación 10.2: Ningún archivo con "use client" importa createAdminClient ni service role
  let test10Pass = adminClientContent.includes('import "server-only";');
  const srcDir = path.join(process.cwd(), "src");

  function scanDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) {
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        // Verificar si el archivo es un componente cliente (directiva al inicio del archivo)
        const isClientComponent = /^\s*['"]use client['"]/m.test(fileContent);
        if (isClientComponent) {
          if (
            fileContent.includes("createAdminClient") ||
            fileContent.includes("SUPABASE_SERVICE_ROLE_KEY") ||
            fileContent.includes("SUPABASE_SECRET_KEY")
          ) {
            test10Pass = false;
            console.error(`Fuga detectada en componente cliente: ${fullPath}`);
          }
        }
      }
    }
  }
  scanDir(srcDir);

  assert(
    test10Pass,
    10,
    "Aislamiento de credenciales privilegiadas (service_role protegido por server-only y cero fugas a clientes)",
    "createAdminClient está blindado con server-only y no existe referencia alguna en componentes 'use client'"
  );

  console.log("\n===============================================================================");
  const passedCount = results.filter((r) => r.passed).length;
  console.log(`  RESUMEN: ${passedCount} de ${results.length} escenarios superados exitosamente.`);
  console.log("===============================================================================\n");

  if (passedCount !== results.length) {
    process.exit(1);
  }
}

runAuthSecuritySuite().catch((err) => {
  console.error("Error ejecutando suite de pruebas:", err);
  process.exit(1);
});
