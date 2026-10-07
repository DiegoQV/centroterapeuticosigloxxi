-- ==============================================================================
-- SUITE DE PRUEBAS DE AISLAMIENTO Y SEGURIDAD RLS (7 TESTS OFICIALES F1)
-- Archivo: supabase/tests/20260301000002_rls_isolation_tests.sql
-- ==============================================================================
-- Este script ejecuta pruebas en una transacción con ROLLBACK final,
-- simulando diferentes identidades con `SET LOCAL request.jwt.claims`.

BEGIN;

-- 0. CREACIÓN DE DATOS DE PRUEBA
DO $$
DECLARE
    c1 UUID := '11111111-1111-1111-1111-111111111111';
    c2 UUID := '22222222-2222-2222-2222-222222222222';
    
    -- Usuarios Auth ficticios
    u_admin_c1 UUID := 'a1111111-1111-1111-1111-111111111111';
    u_prof1_c1 UUID := 'b1111111-1111-1111-1111-111111111111';
    u_prof2_c1 UUID := 'c1111111-1111-1111-1111-111111111111';
    u_pacA_c1  UUID := 'd1111111-1111-1111-1111-111111111111';
    u_pacB_c1  UUID := 'e1111111-1111-1111-1111-111111111111';
    
    u_prof_c2  UUID := 'f2222222-2222-2222-2222-222222222222';
    u_admin_c2 UUID := 'a2222222-2222-2222-2222-222222222222';

    p_pacA_id UUID := 'aaaa0001-0000-0000-0000-000000000000';
    p_pacB_id UUID := 'bbbb0002-0000-0000-0000-000000000000';
    
    ep_pacA_id UUID := 'eeee0001-0000-0000-0000-000000000000';
    ep_pacB_id UUID := 'eeee0002-0000-0000-0000-000000000000';

    plan_pacA_id UUID := '10000001-0000-0000-0000-000000000000';
    plan_pacB_id UUID := '10000002-0000-0000-0000-000000000000';

    presc_pacA_id UUID := '20000001-0000-0000-0000-000000000000';
    presc_pacB_id UUID := '20000002-0000-0000-0000-000000000000';

    ej_id UUID := '30000001-0000-0000-0000-000000000000';
    ses_prof1_id UUID := '40000001-0000-0000-0000-000000000000';
    eval_id UUID := '50000001-0000-0000-0000-000000000000';
BEGIN
    -- 1. Insertar Clínicas
    INSERT INTO public.clinicas (id, nombre, direccion, telefono) VALUES
        (c1, 'Clínica 1 Siglo XXI', 'Jr. Sociego 123', '+51941996388'),
        (c2, 'Clínica 2 Externa', 'Av. Principal 456', '+51999999999');

    -- Insertar usuarios en auth.users simulados (en entorno de test)
    -- Si auth.users existe:
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') THEN
        INSERT INTO auth.users (id, email) VALUES
            (u_admin_c1, 'admin1@sigloxxi.pe'),
            (u_prof1_c1, 'prof1@sigloxxi.pe'),
            (u_prof2_c1, 'prof2@sigloxxi.pe'),
            (u_pacA_c1,  'paca@sigloxxi.pe'),
            (u_pacB_c1,  'pacb@sigloxxi.pe'),
            (u_prof_c2,  'prof@clinica2.pe'),
            (u_admin_c2, 'admin@clinica2.pe')
        ON CONFLICT (id) DO NOTHING;
    END IF;

    -- 2. Insertar Perfiles
    INSERT INTO public.perfiles_usuarios (id, clinica_id, rol, nombre_completo) VALUES
        (u_admin_c1, c1, 'admin', 'Admin Clínica 1'),
        (u_prof1_c1, c1, 'profesional', 'Lic. Terapeuta 1'),
        (u_prof2_c1, c1, 'profesional', 'Lic. Terapeuta 2'),
        (u_pacA_c1,  c1, 'paciente', 'Paciente A'),
        (u_pacB_c1,  c1, 'paciente', 'Paciente B'),
        (u_prof_c2,  c2, 'profesional', 'Terapeuta Clínica 2'),
        (u_admin_c2, c2, 'admin', 'Admin Clínica 2');

    -- 3. Insertar Pacientes
    INSERT INTO public.pacientes (id, clinica_id, perfil_id, dni, fecha_nacimiento) VALUES
        (p_pacA_id, c1, u_pacA_c1, '10000001', '1985-05-10'),
        (p_pacB_id, c1, u_pacB_c1, '20000002', '1990-08-20');

    -- 4. Episodios
    INSERT INTO public.episodios_clinicos (id, clinica_id, paciente_id, profesional_responsable_id, motivo_consulta) VALUES
        (ep_pacA_id, c1, p_pacA_id, u_prof1_c1, 'Dolor Lumbar Agudo'),
        (ep_pacB_id, c1, p_pacB_id, u_prof2_c1, 'Cervicalgia Severa');

    -- 5. Evaluación
    INSERT INTO public.evaluaciones (id, clinica_id, episodio_id, profesional_id, tipo, eva_dolor, hallazgos_clinicos, impresion_diagnostica) VALUES
        (eval_id, c1, ep_pacA_id, u_prof1_c1, 'inicial', 8, 'Limitación en flexión lumbar', 'Lumbalgia mecánica');

    -- 6. Planes
    INSERT INTO public.planes_terapeuticos (id, clinica_id, episodio_id, objetivo_funcional, sesiones_estimadas) VALUES
        (plan_pacA_id, c1, ep_pacA_id, 'Caminar sin dolor', 6),
        (plan_pacB_id, c1, ep_pacB_id, 'Mover cuello libremente', 4);

    -- 7. Ejercicio y Prescripciones
    INSERT INTO public.biblioteca_ejercicios (id, clinica_id, nombre, zona_cuerpo, video_path, instrucciones_paciente) VALUES
        (ej_id, c1, 'Puente Glúteo', 'lumbar', 'videos/puente.mp4', 'Elevar cadera y respirar');

    INSERT INTO public.prescripciones_ejercicios (id, plan_id, ejercicio_id, series, repeticiones) VALUES
        (presc_pacA_id, plan_pacA_id, ej_id, 3, 10),
        (presc_pacB_id, plan_pacB_id, ej_id, 2, 8);

    -- 8. Sesión creada por Profesional 1
    INSERT INTO public.sesiones (id, clinica_id, plan_id, profesional_id, eva_ingreso, fecha) VALUES
        (ses_prof1_id, c1, plan_pacA_id, u_prof1_c1, 7, now() - INTERVAL '1 hour');

END $$;

-- -----------------------------------------------------------------------------
-- TEST 1: Paciente A intenta consultar información de Paciente B (SELECT)
-- Resultado esperado: 0 filas devueltas
-- -----------------------------------------------------------------------------
DO $$
DECLARE
    cnt INT;
    u_pacA_c1 UUID := 'd1111111-1111-1111-1111-111111111111';
    ep_pacB_id UUID := 'eeee0002-0000-0000-0000-000000000000';
BEGIN
    EXECUTE 'SET LOCAL ROLE authenticated';
    PERFORM set_config('request.jwt.claims', json_build_object('sub', u_pacA_c1, 'role', 'authenticated')::text, true);

    SELECT count(*) INTO cnt FROM public.episodios_clinicos WHERE id = ep_pacB_id;
    IF cnt <> 0 THEN
        RAISE EXCEPTION 'FALLO TEST 1: Paciente A pudo leer datos del Paciente B (filas: %)', cnt;
    END IF;
    RAISE NOTICE 'ÉXITO TEST 1: Paciente A no puede leer episodios de Paciente B (filas: 0)';
END $$;

-- -----------------------------------------------------------------------------
-- TEST 2: Profesional de Clínica 2 intenta consultar datos de Clínica 1 (SELECT)
-- Resultado esperado: 0 filas devueltas
-- -----------------------------------------------------------------------------
DO $$
DECLARE
    cnt INT;
    u_prof_c2 UUID := 'f2222222-2222-2222-2222-222222222222';
    c1 UUID := '11111111-1111-1111-1111-111111111111';
BEGIN
    EXECUTE 'SET LOCAL ROLE authenticated';
    PERFORM set_config('request.jwt.claims', json_build_object('sub', u_prof_c2, 'role', 'authenticated')::text, true);

    SELECT count(*) INTO cnt FROM public.pacientes WHERE clinica_id = c1;
    IF cnt <> 0 THEN
        RAISE EXCEPTION 'FALLO TEST 2: Profesional de Clínica 2 pudo leer pacientes de Clínica 1 (filas: %)', cnt;
    END IF;
    RAISE NOTICE 'ÉXITO TEST 2: Aislamiento inter-clínica verificado (filas: 0)';
END $$;

-- -----------------------------------------------------------------------------
-- TEST 3: Paciente intentando modificar sesión (UPDATE)
-- Resultado esperado: Excepción de RLS o 0 filas modificadas
-- -----------------------------------------------------------------------------
DO $$
DECLARE
    rows_affected INT;
    u_pacA_c1 UUID := 'd1111111-1111-1111-1111-111111111111';
    ses_prof1_id UUID := '40000001-0000-0000-0000-000000000000';
BEGIN
    EXECUTE 'SET LOCAL ROLE authenticated';
    PERFORM set_config('request.jwt.claims', json_build_object('sub', u_pacA_c1, 'role', 'authenticated')::text, true);

    UPDATE public.sesiones SET eva_ingreso = 1 WHERE id = ses_prof1_id;
    GET DIAGNOSTICS rows_affected = ROW_COUNT;
    
    IF rows_affected <> 0 THEN
        RAISE EXCEPTION 'FALLO TEST 3: Paciente pudo modificar registro de sesión clínica';
    END IF;
    RAISE NOTICE 'ÉXITO TEST 3: Paciente no puede modificar sesiones (filas modificadas: 0)';
END $$;

-- -----------------------------------------------------------------------------
-- TEST 4: Paciente intentando modificar evaluación (UPDATE)
-- Resultado esperado: 0 filas modificadas
-- -----------------------------------------------------------------------------
DO $$
DECLARE
    rows_affected INT;
    u_pacA_c1 UUID := 'd1111111-1111-1111-1111-111111111111';
    eval_id UUID := '50000001-0000-0000-0000-000000000000';
BEGIN
    EXECUTE 'SET LOCAL ROLE authenticated';
    PERFORM set_config('request.jwt.claims', json_build_object('sub', u_pacA_c1, 'role', 'authenticated')::text, true);

    UPDATE public.evaluaciones SET eva_dolor = 1 WHERE id = eval_id;
    GET DIAGNOSTICS rows_affected = ROW_COUNT;
    
    IF rows_affected <> 0 THEN
        RAISE EXCEPTION 'FALLO TEST 4: Paciente pudo modificar registro de evaluación clínica';
    END IF;
    RAISE NOTICE 'ÉXITO TEST 4: Paciente no puede modificar evaluaciones (filas modificadas: 0)';
END $$;

-- -----------------------------------------------------------------------------
-- TEST 5: Paciente A intentando registrar adherencia sobre prescripción de Paciente B (INSERT)
-- Resultado esperado: Excepción de RLS
-- -----------------------------------------------------------------------------
DO $$
DECLARE
    u_pacA_c1 UUID := 'd1111111-1111-1111-1111-111111111111';
    presc_pacB_id UUID := '20000002-0000-0000-0000-000000000000';
    failed_as_expected BOOLEAN := false;
BEGIN
    EXECUTE 'SET LOCAL ROLE authenticated';
    PERFORM set_config('request.jwt.claims', json_build_object('sub', u_pacA_c1, 'role', 'authenticated')::text, true);

    BEGIN
        INSERT INTO public.registro_adherencia (prescripcion_id, fecha, completado)
        VALUES (presc_pacB_id, CURRENT_DATE, true);
    EXCEPTION WHEN OTHERS THEN
        failed_as_expected := true;
    END;

    IF NOT failed_as_expected THEN
        RAISE EXCEPTION 'FALLO TEST 5: Paciente A pudo insertar adherencia en prescripción ajena';
    END IF;
    RAISE NOTICE 'ÉXITO TEST 5: Inserción cruzada de adherencia bloqueada por RLS';
END $$;

-- -----------------------------------------------------------------------------
-- TEST 6: Profesional 2 intentando modificar una sesión de Profesional 1 (UPDATE)
-- Resultado esperado: 0 filas modificadas
-- -----------------------------------------------------------------------------
DO $$
DECLARE
    rows_affected INT;
    u_prof2_c1 UUID := 'c1111111-1111-1111-1111-111111111111';
    ses_prof1_id UUID := '40000001-0000-0000-0000-000000000000';
BEGIN
    EXECUTE 'SET LOCAL ROLE authenticated';
    PERFORM set_config('request.jwt.claims', json_build_object('sub', u_prof2_c1, 'role', 'authenticated')::text, true);

    UPDATE public.sesiones SET observaciones = 'Modificado indebidamente' WHERE id = ses_prof1_id;
    GET DIAGNOSTICS rows_affected = ROW_COUNT;
    
    IF rows_affected <> 0 THEN
        RAISE EXCEPTION 'FALLO TEST 6: Profesional 2 modificó sesión creada por Profesional 1';
    END IF;
    RAISE NOTICE 'ÉXITO TEST 6: Modificación cruzada de sesión entre profesionales bloqueada';
END $$;

-- -----------------------------------------------------------------------------
-- TEST 7: Admin de Clínica 1 NO debe poder consultar registros de Clínica 2 (SELECT)
-- Resultado esperado: 0 filas devueltas
-- -----------------------------------------------------------------------------
DO $$
DECLARE
    cnt INT;
    u_admin_c1 UUID := 'a1111111-1111-1111-1111-111111111111';
    c2 UUID := '22222222-2222-2222-2222-222222222222';
BEGIN
    EXECUTE 'SET LOCAL ROLE authenticated';
    PERFORM set_config('request.jwt.claims', json_build_object('sub', u_admin_c1, 'role', 'authenticated')::text, true);

    SELECT count(*) INTO cnt FROM public.clinicas WHERE id = c2;
    IF cnt <> 0 THEN
        RAISE EXCEPTION 'FALLO TEST 7: Admin de Clínica 1 pudo leer datos de Clínica 2 (filas: %)', cnt;
    END IF;
    RAISE NOTICE 'ÉXITO TEST 7: Aislamiento administrativo inter-clínica verificado (filas: 0)';
END $$;

-- Fin de la prueba (ROLLBACK para no dejar datos ficticios en la base)
ROLLBACK;
