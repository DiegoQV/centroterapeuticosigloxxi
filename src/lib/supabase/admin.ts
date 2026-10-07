import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Cliente de Administración de Supabase (Privilegiado).
 *
 * Utiliza exclusivamente SUPABASE_SERVICE_ROLE_KEY o SUPABASE_SECRET_KEY.
 * Este cliente está protegido por el paquete 'server-only': si algún archivo
 * de cliente ("use client") intenta importarlo, la compilación de Next.js fallará.
 *
 * REGLA DE SEGURIDAD:
 * Nunca debe usarse como sustituto de RLS en operaciones de usuario final.
 * Solo se permite en tareas del sistema estrictas (ej. provisión controlada de usuarios).
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Variables de entorno críticas no configuradas: NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
