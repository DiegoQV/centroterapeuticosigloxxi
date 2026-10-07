-- ==============================================================================
-- CENTRO TERAPÉUTICO SIGLO XXI — ESQUEMA DEFINITIVO DEL MVP (12 TABLAS + RLS)
-- Migración: 20260301000001_mvp_schema.sql
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS Y TIPOS PERSONALIZADOS
DO $$ BEGIN
    CREATE TYPE public.user_role_type AS ENUM ('admin', 'profesional', 'paciente');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.episodio_estado_type AS ENUM ('active', 'paused', 'discharged', 'abandoned');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.evaluacion_tipo_type AS ENUM ('inicial', 'reevaluacion', 'alta');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.cita_estado_type AS ENUM ('pendiente', 'confirmada', 'atendida', 'cancelada', 'no_asistio');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.zona_cuerpo_type AS ENUM ('cervical', 'lumbar', 'hombro', 'rodilla', 'tobillo', 'general');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.tolerancia_sesion_type AS ENUM ('buena', 'regular', 'molestia');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. TABLAS OFICIALES (12 TABLAS)

-- 3.1. CLINICAS (Multi-tenant base)
CREATE TABLE IF NOT EXISTS public.clinicas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL,
    direccion TEXT NOT NULL,
    telefono TEXT NOT NULL,
    creado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
    actualizado_en TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.2. PERFILES DE USUARIOS (Extiende auth.users)
CREATE TABLE IF NOT EXISTS public.perfiles_usuarios (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    clinica_id UUID NOT NULL REFERENCES public.clinicas(id) ON DELETE RESTRICT,
    rol public.user_role_type NOT NULL DEFAULT 'paciente',
    nombre_completo TEXT NOT NULL,
    telefono TEXT,
    colegio_profesional TEXT,
    creado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
    actualizado_en TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.3. PACIENTES
CREATE TABLE IF NOT EXISTS public.pacientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinica_id UUID NOT NULL REFERENCES public.clinicas(id) ON DELETE RESTRICT,
    perfil_id UUID UNIQUE REFERENCES public.perfiles_usuarios(id) ON DELETE SET NULL,
    dni TEXT NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    contacto_emergencia TEXT,
    token_version INT NOT NULL DEFAULT 1,
    creado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
    actualizado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_pacientes_clinica_dni UNIQUE (clinica_id, dni)
);

-- 3.4. EPISODIOS CLÍNICOS
CREATE TABLE IF NOT EXISTS public.episodios_clinicos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinica_id UUID NOT NULL REFERENCES public.clinicas(id) ON DELETE RESTRICT,
    paciente_id UUID NOT NULL REFERENCES public.pacientes(id) ON DELETE CASCADE,
    profesional_responsable_id UUID NOT NULL REFERENCES public.perfiles_usuarios(id) ON DELETE RESTRICT,
    motivo_consulta TEXT NOT NULL,
    fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    estado public.episodio_estado_type NOT NULL DEFAULT 'active',
    creado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
    actualizado_en TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.5. EVALUACIONES
CREATE TABLE IF NOT EXISTS public.evaluaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinica_id UUID NOT NULL REFERENCES public.clinicas(id) ON DELETE RESTRICT,
    episodio_id UUID NOT NULL REFERENCES public.episodios_clinicos(id) ON DELETE CASCADE,
    profesional_id UUID NOT NULL REFERENCES public.perfiles_usuarios(id) ON DELETE RESTRICT,
    tipo public.evaluacion_tipo_type NOT NULL,
    eva_dolor INT NOT NULL CHECK (eva_dolor BETWEEN 1 AND 10),
    hallazgos_clinicos TEXT NOT NULL,
    impresion_diagnostica TEXT NOT NULL,
    fecha TIMESTAMPTZ NOT NULL DEFAULT now(),
    creado_en TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.6. PLANES TERAPÉUTICOS
CREATE TABLE IF NOT EXISTS public.planes_terapeuticos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinica_id UUID NOT NULL REFERENCES public.clinicas(id) ON DELETE RESTRICT,
    episodio_id UUID NOT NULL REFERENCES public.episodios_clinicos(id) ON DELETE CASCADE,
    objetivo_funcional TEXT NOT NULL,
    sesiones_estimadas INT NOT NULL CHECK (sesiones_estimadas > 0),
    activo BOOLEAN NOT NULL DEFAULT true,
    creado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
    actualizado_en TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.7. SESIONES EN BOX
CREATE TABLE IF NOT EXISTS public.sesiones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinica_id UUID NOT NULL REFERENCES public.clinicas(id) ON DELETE RESTRICT,
    plan_id UUID NOT NULL REFERENCES public.planes_terapeuticos(id) ON DELETE CASCADE,
    profesional_id UUID NOT NULL REFERENCES public.perfiles_usuarios(id) ON DELETE RESTRICT,
    fecha TIMESTAMPTZ NOT NULL DEFAULT now(),
    eva_ingreso INT NOT NULL CHECK (eva_ingreso BETWEEN 1 AND 10),
    agentes_aplicados JSONB NOT NULL DEFAULT '[]'::jsonb,
    tolerancia public.tolerancia_sesion_type NOT NULL DEFAULT 'buena',
    observaciones TEXT,
    creado_en TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.8. CITAS
CREATE TABLE IF NOT EXISTS public.citas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinica_id UUID NOT NULL REFERENCES public.clinicas(id) ON DELETE RESTRICT,
    paciente_id UUID NOT NULL REFERENCES public.pacientes(id) ON DELETE CASCADE,
    profesional_id UUID NOT NULL REFERENCES public.perfiles_usuarios(id) ON DELETE RESTRICT,
    fecha_hora TIMESTAMPTZ NOT NULL,
    estado public.cita_estado_type NOT NULL DEFAULT 'pendiente',
    notas TEXT,
    creado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
    actualizado_en TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.9. BIBLIOTECA DE EJERCICIOS
CREATE TABLE IF NOT EXISTS public.biblioteca_ejercicios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinica_id UUID NOT NULL REFERENCES public.clinicas(id) ON DELETE RESTRICT,
    nombre TEXT NOT NULL,
    zona_cuerpo public.zona_cuerpo_type NOT NULL,
    video_path TEXT NOT NULL,
    instrucciones_paciente TEXT NOT NULL,
    criterio_interno TEXT,
    activo BOOLEAN NOT NULL DEFAULT true,
    creado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
    actualizado_en TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3.10. PRESCRIPCIONES DE EJERCICIOS
CREATE TABLE IF NOT EXISTS public.prescripciones_ejercicios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_id UUID NOT NULL REFERENCES public.planes_terapeuticos(id) ON DELETE CASCADE,
    ejercicio_id UUID NOT NULL REFERENCES public.biblioteca_ejercicios(id) ON DELETE RESTRICT,
    series INT NOT NULL DEFAULT 3 CHECK (series > 0),
    repeticiones INT NOT NULL DEFAULT 10 CHECK (repeticiones > 0),
    duracion_segundos INT CHECK (duracion_segundos IS NULL OR duracion_segundos > 0),
    frecuencia TEXT NOT NULL DEFAULT 'diario',
    orden INT NOT NULL DEFAULT 1,
    activo BOOLEAN NOT NULL DEFAULT true,
    creado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_plan_ejercicio UNIQUE (plan_id, ejercicio_id)
);

-- 3.11. REGISTRO DE ADHERENCIA (Paciente)
CREATE TABLE IF NOT EXISTS public.registro_adherencia (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prescripcion_id UUID NOT NULL REFERENCES public.prescripciones_ejercicios(id) ON DELETE CASCADE,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    completado BOOLEAN NOT NULL DEFAULT true,
    tuvo_molestia BOOLEAN NOT NULL DEFAULT false,
    creado_en TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_adherencia_prescripcion_fecha UNIQUE (prescripcion_id, fecha)
);

-- 3.12. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinica_id UUID NOT NULL REFERENCES public.clinicas(id) ON DELETE RESTRICT,
    usuario_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    accion TEXT NOT NULL CHECK (accion IN (
        'EVALUACION_CREADA',
        'PLAN_CREADO',
        'PLAN_MODIFICADO',
        'SESION_REGISTRADA',
        'ACCESO_PACIENTE_EMITIDO',
        'ACCESO_PACIENTE_REVOCADO',
        'PDF_CLINICO_DESCARGADO',
        'ROL_MODIFICADO',
        'TRIAGE_VERSION_ACTIVADA'
    )),
    recurso_tipo TEXT NOT NULL,
    recurso_id TEXT NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    fecha TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. ÍNDICES ESTRATÉGICOS
CREATE INDEX IF NOT EXISTS idx_perfiles_clinica ON public.perfiles_usuarios(clinica_id, rol);
CREATE INDEX IF NOT EXISTS idx_pacientes_clinica_dni ON public.pacientes(clinica_id, dni);
CREATE INDEX IF NOT EXISTS idx_pacientes_perfil ON public.pacientes(perfil_id);
CREATE INDEX IF NOT EXISTS idx_episodios_paciente ON public.episodios_clinicos(paciente_id, estado);
CREATE INDEX IF NOT EXISTS idx_episodios_profesional ON public.episodios_clinicos(profesional_responsable_id);
CREATE INDEX IF NOT EXISTS idx_evaluaciones_episodio ON public.evaluaciones(episodio_id, fecha);
CREATE INDEX IF NOT EXISTS idx_planes_episodio_activo ON public.planes_terapeuticos(episodio_id, activo);
CREATE INDEX IF NOT EXISTS idx_sesiones_plan_fecha ON public.sesiones(plan_id, fecha DESC);
CREATE INDEX IF NOT EXISTS idx_citas_clinica_fecha ON public.citas(clinica_id, fecha_hora);
CREATE INDEX IF NOT EXISTS idx_citas_paciente ON public.citas(paciente_id, estado);
CREATE INDEX IF NOT EXISTS idx_citas_profesional ON public.citas(profesional_id, fecha_hora);
CREATE INDEX IF NOT EXISTS idx_biblioteca_clinica_zona ON public.biblioteca_ejercicios(clinica_id, zona_cuerpo, activo);
CREATE INDEX IF NOT EXISTS idx_prescripciones_plan ON public.prescripciones_ejercicios(plan_id, activo);
CREATE INDEX IF NOT EXISTS idx_adherencia_prescripcion_fecha ON public.registro_adherencia(prescripcion_id, fecha);
CREATE INDEX IF NOT EXISTS idx_audit_logs_clinica_fecha ON public.audit_logs(clinica_id, fecha DESC);

-- 5. TRIGGER HANDLE_UPDATED_AT
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.actualizado_en = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
    CREATE TRIGGER tr_clinicas_updated_at BEFORE UPDATE ON public.clinicas FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TRIGGER tr_perfiles_updated_at BEFORE UPDATE ON public.perfiles_usuarios FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TRIGGER tr_pacientes_updated_at BEFORE UPDATE ON public.pacientes FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TRIGGER tr_episodios_updated_at BEFORE UPDATE ON public.episodios_clinicos FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TRIGGER tr_planes_updated_at BEFORE UPDATE ON public.planes_terapeuticos FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TRIGGER tr_citas_updated_at BEFORE UPDATE ON public.citas FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TRIGGER tr_biblioteca_updated_at BEFORE UPDATE ON public.biblioteca_ejercicios FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 6. FUNCIONES DE SEGURIDAD EN SCHEMA PUBLIC
CREATE OR REPLACE FUNCTION public.clinica_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
  SELECT clinica_id FROM public.perfiles_usuarios WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.user_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
  SELECT rol::TEXT FROM public.perfiles_usuarios WHERE id = auth.uid();
$$;

REVOKE EXECUTE ON FUNCTION public.clinica_id() FROM public;
GRANT EXECUTE ON FUNCTION public.clinica_id() TO authenticated, anon;

REVOKE EXECUTE ON FUNCTION public.user_role() FROM public;
GRANT EXECUTE ON FUNCTION public.user_role() TO authenticated, anon;

-- 7. ACTIVACIÓN DE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.clinicas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.perfiles_usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pacientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.episodios_clinicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planes_terapeuticos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sesiones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.citas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.biblioteca_ejercicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescripciones_ejercicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registro_adherencia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 8. POLÍTICAS DE ACCESO RLS

-- 8.1. CLINICAS
DROP POLICY IF EXISTS "clinicas_select" ON public.clinicas;
CREATE POLICY "clinicas_select" ON public.clinicas
FOR SELECT TO authenticated
USING (id = public.clinica_id());

DROP POLICY IF EXISTS "clinicas_admin_manage" ON public.clinicas;
CREATE POLICY "clinicas_admin_manage" ON public.clinicas
FOR ALL TO authenticated
USING (id = public.clinica_id() AND public.user_role() = 'admin')
WITH CHECK (id = public.clinica_id() AND public.user_role() = 'admin');

-- 8.2. PERFILES USUARIOS
DROP POLICY IF EXISTS "perfiles_select" ON public.perfiles_usuarios;
CREATE POLICY "perfiles_select" ON public.perfiles_usuarios
FOR SELECT TO authenticated
USING (
  (public.user_role() IN ('admin', 'profesional') AND clinica_id = public.clinica_id())
  OR (id = auth.uid())
);

DROP POLICY IF EXISTS "perfiles_admin_manage" ON public.perfiles_usuarios;
CREATE POLICY "perfiles_admin_manage" ON public.perfiles_usuarios
FOR ALL TO authenticated
USING (clinica_id = public.clinica_id() AND public.user_role() = 'admin')
WITH CHECK (clinica_id = public.clinica_id() AND public.user_role() = 'admin');

DROP POLICY IF EXISTS "perfiles_user_update_self" ON public.perfiles_usuarios;
CREATE POLICY "perfiles_user_update_self" ON public.perfiles_usuarios
FOR UPDATE TO authenticated
USING (id = auth.uid())
WITH CHECK (
    id = auth.uid()
    AND clinica_id = public.clinica_id()
    AND rol = public.user_role()::public.user_role_type
);

-- 8.3. PACIENTES
DROP POLICY IF EXISTS "pacientes_select" ON public.pacientes;
CREATE POLICY "pacientes_select" ON public.pacientes
FOR SELECT TO authenticated
USING (
  (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'))
  OR (perfil_id = auth.uid())
);

DROP POLICY IF EXISTS "pacientes_staff_insert" ON public.pacientes;
CREATE POLICY "pacientes_staff_insert" ON public.pacientes
FOR INSERT TO authenticated
WITH CHECK (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'));

DROP POLICY IF EXISTS "pacientes_staff_update" ON public.pacientes;
CREATE POLICY "pacientes_staff_update" ON public.pacientes
FOR UPDATE TO authenticated
USING (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'))
WITH CHECK (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'));

DROP POLICY IF EXISTS "pacientes_admin_delete" ON public.pacientes;
CREATE POLICY "pacientes_admin_delete" ON public.pacientes
FOR DELETE TO authenticated
USING (clinica_id = public.clinica_id() AND public.user_role() = 'admin');

-- 8.4. EPISODIOS CLÍNICOS
DROP POLICY IF EXISTS "episodios_select" ON public.episodios_clinicos;
CREATE POLICY "episodios_select" ON public.episodios_clinicos
FOR SELECT TO authenticated
USING (
  (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'))
  OR (paciente_id IN (SELECT id FROM public.pacientes WHERE perfil_id = auth.uid()))
);

DROP POLICY IF EXISTS "episodios_staff_insert" ON public.episodios_clinicos;
CREATE POLICY "episodios_staff_insert" ON public.episodios_clinicos
FOR INSERT TO authenticated
WITH CHECK (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'));

DROP POLICY IF EXISTS "episodios_staff_update" ON public.episodios_clinicos;
CREATE POLICY "episodios_staff_update" ON public.episodios_clinicos
FOR UPDATE TO authenticated
USING (clinica_id = public.clinica_id() AND (public.user_role() = 'admin' OR profesional_responsable_id = auth.uid()))
WITH CHECK (clinica_id = public.clinica_id() AND (public.user_role() = 'admin' OR profesional_responsable_id = auth.uid()));

-- 8.5. EVALUACIONES
DROP POLICY IF EXISTS "evaluaciones_select" ON public.evaluaciones;
CREATE POLICY "evaluaciones_select" ON public.evaluaciones
FOR SELECT TO authenticated
USING (
  (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'))
  OR (episodio_id IN (
    SELECT ec.id FROM public.episodios_clinicos ec
    JOIN public.pacientes p ON ec.paciente_id = p.id
    WHERE p.perfil_id = auth.uid()
  ))
);

DROP POLICY IF EXISTS "evaluaciones_staff_insert" ON public.evaluaciones;
CREATE POLICY "evaluaciones_staff_insert" ON public.evaluaciones
FOR INSERT TO authenticated
WITH CHECK (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'));

DROP POLICY IF EXISTS "evaluaciones_staff_update" ON public.evaluaciones;
CREATE POLICY "evaluaciones_staff_update" ON public.evaluaciones
FOR UPDATE TO authenticated
USING (clinica_id = public.clinica_id() AND (public.user_role() = 'admin' OR profesional_id = auth.uid()))
WITH CHECK (clinica_id = public.clinica_id() AND (public.user_role() = 'admin' OR profesional_id = auth.uid()));

-- 8.6. PLANES TERAPÉUTICOS
DROP POLICY IF EXISTS "planes_select" ON public.planes_terapeuticos;
CREATE POLICY "planes_select" ON public.planes_terapeuticos
FOR SELECT TO authenticated
USING (
  (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'))
  OR (episodio_id IN (
    SELECT ec.id FROM public.episodios_clinicos ec
    JOIN public.pacientes p ON ec.paciente_id = p.id
    WHERE p.perfil_id = auth.uid()
  ))
);

DROP POLICY IF EXISTS "planes_staff_insert" ON public.planes_terapeuticos;
CREATE POLICY "planes_staff_insert" ON public.planes_terapeuticos
FOR INSERT TO authenticated
WITH CHECK (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'));

DROP POLICY IF EXISTS "planes_staff_update" ON public.planes_terapeuticos;
CREATE POLICY "planes_staff_update" ON public.planes_terapeuticos
FOR UPDATE TO authenticated
USING (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'))
WITH CHECK (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'));

-- 8.7. SESIONES EN BOX
DROP POLICY IF EXISTS "sesiones_select" ON public.sesiones;
CREATE POLICY "sesiones_select" ON public.sesiones
FOR SELECT TO authenticated
USING (
  (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'))
  OR (plan_id IN (
    SELECT pt.id FROM public.planes_terapeuticos pt
    JOIN public.episodios_clinicos ec ON pt.episodio_id = ec.id
    JOIN public.pacientes p ON ec.paciente_id = p.id
    WHERE p.perfil_id = auth.uid()
  ))
);

DROP POLICY IF EXISTS "sesiones_staff_insert" ON public.sesiones;
CREATE POLICY "sesiones_staff_insert" ON public.sesiones
FOR INSERT TO authenticated
WITH CHECK (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'));

DROP POLICY IF EXISTS "sesiones_staff_update" ON public.sesiones;
CREATE POLICY "sesiones_staff_update" ON public.sesiones
FOR UPDATE TO authenticated
USING (
  clinica_id = public.clinica_id() 
  AND ((profesional_id = auth.uid() AND fecha > now() - INTERVAL '12 hours') OR public.user_role() = 'admin')
)
WITH CHECK (
  clinica_id = public.clinica_id() 
  AND ((profesional_id = auth.uid() AND fecha > now() - INTERVAL '12 hours') OR public.user_role() = 'admin')
);

-- 8.8. CITAS
DROP POLICY IF EXISTS "citas_select" ON public.citas;
CREATE POLICY "citas_select" ON public.citas
FOR SELECT TO authenticated
USING (
  (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'))
  OR (paciente_id IN (SELECT id FROM public.pacientes WHERE perfil_id = auth.uid()))
);

DROP POLICY IF EXISTS "citas_staff_manage" ON public.citas;
CREATE POLICY "citas_staff_manage" ON public.citas
FOR ALL TO authenticated
USING (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'))
WITH CHECK (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'));

-- 8.9. BIBLIOTECA DE EJERCICIOS
DROP POLICY IF EXISTS "biblioteca_select" ON public.biblioteca_ejercicios;
CREATE POLICY "biblioteca_select" ON public.biblioteca_ejercicios
FOR SELECT TO authenticated
USING (clinica_id = public.clinica_id());

DROP POLICY IF EXISTS "biblioteca_staff_manage" ON public.biblioteca_ejercicios;
CREATE POLICY "biblioteca_staff_manage" ON public.biblioteca_ejercicios
FOR ALL TO authenticated
USING (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'))
WITH CHECK (clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'));

-- 8.10. PRESCRIPCIONES DE EJERCICIOS
DROP POLICY IF EXISTS "prescripciones_select" ON public.prescripciones_ejercicios;
CREATE POLICY "prescripciones_select" ON public.prescripciones_ejercicios
FOR SELECT TO authenticated
USING (
  plan_id IN (SELECT id FROM public.planes_terapeuticos WHERE clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional'))
  OR plan_id IN (
    SELECT pt.id FROM public.planes_terapeuticos pt
    JOIN public.episodios_clinicos ec ON pt.episodio_id = ec.id
    JOIN public.pacientes p ON ec.paciente_id = p.id
    WHERE p.perfil_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "prescripciones_staff_manage" ON public.prescripciones_ejercicios;
CREATE POLICY "prescripciones_staff_manage" ON public.prescripciones_ejercicios
FOR ALL TO authenticated
USING (plan_id IN (SELECT id FROM public.planes_terapeuticos WHERE clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional')))
WITH CHECK (plan_id IN (SELECT id FROM public.planes_terapeuticos WHERE clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional')));

-- 8.11. REGISTRO DE ADHERENCIA
DROP POLICY IF EXISTS "adherencia_select" ON public.registro_adherencia;
CREATE POLICY "adherencia_select" ON public.registro_adherencia
FOR SELECT TO authenticated
USING (
  prescripcion_id IN (
    SELECT pe.id FROM public.prescripciones_ejercicios pe
    JOIN public.planes_terapeuticos pt ON pe.plan_id = pt.id
    WHERE pt.clinica_id = public.clinica_id() AND public.user_role() IN ('admin', 'profesional')
  )
  OR prescripcion_id IN (
    SELECT pe.id FROM public.prescripciones_ejercicios pe
    JOIN public.planes_terapeuticos pt ON pe.plan_id = pt.id
    JOIN public.episodios_clinicos ec ON pt.episodio_id = ec.id
    JOIN public.pacientes p ON ec.paciente_id = p.id
    WHERE p.perfil_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "adherencia_paciente_insert" ON public.registro_adherencia;
CREATE POLICY "adherencia_paciente_insert" ON public.registro_adherencia
FOR INSERT TO authenticated
WITH CHECK (
  public.user_role() = 'paciente'
  AND prescripcion_id IN (
    SELECT pe.id FROM public.prescripciones_ejercicios pe
    JOIN public.planes_terapeuticos pt ON pe.plan_id = pt.id
    JOIN public.episodios_clinicos ec ON pt.episodio_id = ec.id
    JOIN public.pacientes p ON ec.paciente_id = p.id
    WHERE p.perfil_id = auth.uid() AND pe.activo = true
  )
);

-- La adherencia es inmutable: no hay políticas de UPDATE ni DELETE para registro_adherencia.

-- 8.12. AUDIT LOGS
DROP POLICY IF EXISTS "audit_logs_admin_select" ON public.audit_logs;
CREATE POLICY "audit_logs_admin_select" ON public.audit_logs
FOR SELECT TO authenticated
USING (clinica_id = public.clinica_id() AND public.user_role() = 'admin');

DROP POLICY IF EXISTS "audit_logs_system_insert" ON public.audit_logs;
CREATE POLICY "audit_logs_system_insert" ON public.audit_logs
FOR INSERT TO authenticated
WITH CHECK (clinica_id = public.clinica_id());

-- Los logs son append-only: no hay políticas de UPDATE ni DELETE para audit_logs.
