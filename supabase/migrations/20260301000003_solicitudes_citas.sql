-- ==============================================================================
-- CENTRO TERAPÉUTICO SIGLO XXI — SOLICITUDES DE CITA Y EVALUACIÓN (WEB)
-- Migración: 20260301000003_solicitudes_citas.sql
-- ==============================================================================

-- 1. TABLA SOLICITUDES DE CITA (Leads de evaluación desde formularios web)
CREATE TABLE IF NOT EXISTS public.solicitudes_citas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinica_id UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000001'::uuid REFERENCES public.clinicas(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    afeccion TEXT NOT NULL,
    sede TEXT NOT NULL DEFAULT 'Sede Chachapoyas (Jr. Sociego 357)',
    turno TEXT NOT NULL DEFAULT 'Mañana',
    mensaje TEXT,
    origen TEXT NOT NULL DEFAULT 'modal', -- 'modal' | 'landing_sede'
    estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'contactado', 'agendado', 'cancelado')),
    creado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
    actualizado_en TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.solicitudes_citas ENABLE ROW LEVEL SECURITY;

-- 3. POLÍTICAS DE ACCESO
-- Permitir registro público anónimo y autenticado desde la landing page
DROP POLICY IF EXISTS "solicitudes_citas_insert_public" ON public.solicitudes_citas;
CREATE POLICY "solicitudes_citas_insert_public" ON public.solicitudes_citas
FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- Permitir lectura únicamente al staff clínico de la clínica
DROP POLICY IF EXISTS "solicitudes_citas_staff_select" ON public.solicitudes_citas;
CREATE POLICY "solicitudes_citas_staff_select" ON public.solicitudes_citas
FOR SELECT TO authenticated
USING (
    clinica_id = public.clinica_id() 
    AND public.user_role() IN ('admin', 'profesional')
);

-- Permitir actualización de estado únicamente al staff clínico
DROP POLICY IF EXISTS "solicitudes_citas_staff_update" ON public.solicitudes_citas;
CREATE POLICY "solicitudes_citas_staff_update" ON public.solicitudes_citas
FOR UPDATE TO authenticated
USING (
    clinica_id = public.clinica_id() 
    AND public.user_role() IN ('admin', 'profesional')
)
WITH CHECK (
    clinica_id = public.clinica_id() 
    AND public.user_role() IN ('admin', 'profesional')
);

-- 4. ÍNDICES
CREATE INDEX IF NOT EXISTS idx_solicitudes_citas_clinica_estado ON public.solicitudes_citas(clinica_id, estado, creado_en DESC);

-- 5. TRIGGER DE ACTUALIZACIÓN AUTOMÁTICA DE TIMESTAMP
DO $$ BEGIN
    CREATE TRIGGER tr_solicitudes_citas_updated_at 
    BEFORE UPDATE ON public.solicitudes_citas 
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;
