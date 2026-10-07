-- ==============================================================================
-- CENTRO TERAPÉUTICO SIGLO XXI — REFUERZO DE SEGURIDAD RLS (F3)
-- Migración: 20260301000002_harden_perfiles_rls.sql
-- ==============================================================================

-- Blindaje contra escalada de privilegios y cambio de clínica (clinic hopping)
-- Asegura que un usuario autenticado solo pueda actualizar sus datos de contacto (nombre, teléfono, colegio)
-- pero jamás pueda alterar su rol ni su asignación de clinica_id.

DROP POLICY IF EXISTS "perfiles_user_update_self" ON public.perfiles_usuarios;

CREATE POLICY "perfiles_user_update_self" ON public.perfiles_usuarios
FOR UPDATE TO authenticated
USING (id = auth.uid())
WITH CHECK (
    id = auth.uid()
    AND clinica_id = public.clinica_id()
    AND rol = public.user_role()::public.user_role_type
);
