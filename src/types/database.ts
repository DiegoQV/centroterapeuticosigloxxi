/**
 * Tipos Oficiales de Base de Datos para Supabase — Centro Terapéutico Siglo XXI
 *
 * Corresponde fielmente al esquema migrado en `20260301000001_mvp_schema.sql` (12 Tablas).
 */

export type UserRole = "admin" | "profesional" | "paciente";
export type EpisodioEstado = "active" | "paused" | "discharged" | "abandoned";
export type EvaluacionTipo = "inicial" | "reevaluacion" | "alta";
export type CitaEstado = "pendiente" | "confirmada" | "atendida" | "cancelada" | "no_asistio";
export type ZonaCuerpo = "cervical" | "lumbar" | "hombro" | "rodilla" | "tobillo" | "general";
export type ToleranciaSesion = "buena" | "regular" | "molestia";
export type AuditAccion =
  | "EVALUACION_CREADA"
  | "PLAN_CREADO"
  | "PLAN_MODIFICADO"
  | "SESION_REGISTRADA"
  | "ACCESO_PACIENTE_EMITIDO"
  | "ACCESO_PACIENTE_REVOCADO"
  | "PDF_CLINICO_DESCARGADO"
  | "ROL_MODIFICADO"
  | "TRIAGE_VERSION_ACTIVADA";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      clinicas: {
        Row: {
          id: string;
          nombre: string;
          direccion: string;
          telefono: string;
          creado_en: string;
          actualizado_en: string;
        };
        Insert: {
          id?: string;
          nombre: string;
          direccion: string;
          telefono: string;
          creado_en?: string;
          actualizado_en?: string;
        };
        Update: {
          id?: string;
          nombre?: string;
          direccion?: string;
          telefono?: string;
          creado_en?: string;
          actualizado_en?: string;
        };
        Relationships: [];
      };
      perfiles_usuarios: {
        Row: {
          id: string;
          clinica_id: string;
          rol: UserRole;
          nombre_completo: string;
          telefono: string | null;
          colegio_profesional: string | null;
          creado_en: string;
          actualizado_en: string;
        };
        Insert: {
          id: string;
          clinica_id: string;
          rol?: UserRole;
          nombre_completo: string;
          telefono?: string | null;
          colegio_profesional?: string | null;
          creado_en?: string;
          actualizado_en?: string;
        };
        Update: {
          id?: string;
          clinica_id?: string;
          rol?: UserRole;
          nombre_completo?: string;
          telefono?: string | null;
          colegio_profesional?: string | null;
          creado_en?: string;
          actualizado_en?: string;
        };
        Relationships: [
          {
            foreignKeyName: "perfiles_usuarios_clinica_id_fkey";
            columns: ["clinica_id"];
            isOneToOne: false;
            referencedRelation: "clinicas";
            referencedColumns: ["id"];
          }
        ];
      };
      pacientes: {
        Row: {
          id: string;
          clinica_id: string;
          perfil_id: string | null;
          dni: string;
          fecha_nacimiento: string;
          contacto_emergencia: string | null;
          token_version: number;
          creado_en: string;
          actualizado_en: string;
        };
        Insert: {
          id?: string;
          clinica_id: string;
          perfil_id?: string | null;
          dni: string;
          fecha_nacimiento: string;
          contacto_emergencia?: string | null;
          token_version?: number;
          creado_en?: string;
          actualizado_en?: string;
        };
        Update: {
          id?: string;
          clinica_id?: string;
          perfil_id?: string | null;
          dni?: string;
          fecha_nacimiento?: string;
          contacto_emergencia?: string | null;
          token_version?: number;
          creado_en?: string;
          actualizado_en?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pacientes_clinica_id_fkey";
            columns: ["clinica_id"];
            isOneToOne: false;
            referencedRelation: "clinicas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pacientes_perfil_id_fkey";
            columns: ["perfil_id"];
            isOneToOne: true;
            referencedRelation: "perfiles_usuarios";
            referencedColumns: ["id"];
          }
        ];
      };
      episodios_clinicos: {
        Row: {
          id: string;
          clinica_id: string;
          paciente_id: string;
          profesional_responsable_id: string;
          motivo_consulta: string;
          fecha_inicio: string;
          estado: EpisodioEstado;
          creado_en: string;
          actualizado_en: string;
        };
        Insert: {
          id?: string;
          clinica_id: string;
          paciente_id: string;
          profesional_responsable_id: string;
          motivo_consulta: string;
          fecha_inicio?: string;
          estado?: EpisodioEstado;
          creado_en?: string;
          actualizado_en?: string;
        };
        Update: {
          id?: string;
          clinica_id?: string;
          paciente_id?: string;
          profesional_responsable_id?: string;
          motivo_consulta?: string;
          fecha_inicio?: string;
          estado?: EpisodioEstado;
          creado_en?: string;
          actualizado_en?: string;
        };
        Relationships: [
          {
            foreignKeyName: "episodios_clinicos_clinica_id_fkey";
            columns: ["clinica_id"];
            isOneToOne: false;
            referencedRelation: "clinicas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "episodios_clinicos_paciente_id_fkey";
            columns: ["paciente_id"];
            isOneToOne: false;
            referencedRelation: "pacientes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "episodios_clinicos_profesional_responsable_id_fkey";
            columns: ["profesional_responsable_id"];
            isOneToOne: false;
            referencedRelation: "perfiles_usuarios";
            referencedColumns: ["id"];
          }
        ];
      };
      evaluaciones: {
        Row: {
          id: string;
          clinica_id: string;
          episodio_id: string;
          profesional_id: string;
          tipo: EvaluacionTipo;
          eva_dolor: number;
          hallazgos_clinicos: string;
          impresion_diagnostica: string;
          fecha: string;
          creado_en: string;
        };
        Insert: {
          id?: string;
          clinica_id: string;
          episodio_id: string;
          profesional_id: string;
          tipo: EvaluacionTipo;
          eva_dolor: number;
          hallazgos_clinicos: string;
          impresion_diagnostica: string;
          fecha?: string;
          creado_en?: string;
        };
        Update: {
          id?: string;
          clinica_id?: string;
          episodio_id?: string;
          profesional_id?: string;
          tipo?: EvaluacionTipo;
          eva_dolor?: number;
          hallazgos_clinicos?: string;
          impresion_diagnostica?: string;
          fecha?: string;
          creado_en?: string;
        };
        Relationships: [
          {
            foreignKeyName: "evaluaciones_clinica_id_fkey";
            columns: ["clinica_id"];
            isOneToOne: false;
            referencedRelation: "clinicas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "evaluaciones_episodio_id_fkey";
            columns: ["episodio_id"];
            isOneToOne: false;
            referencedRelation: "episodios_clinicos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "evaluaciones_profesional_id_fkey";
            columns: ["profesional_id"];
            isOneToOne: false;
            referencedRelation: "perfiles_usuarios";
            referencedColumns: ["id"];
          }
        ];
      };
      planes_terapeuticos: {
        Row: {
          id: string;
          clinica_id: string;
          episodio_id: string;
          objetivo_funcional: string;
          sesiones_estimadas: number;
          activo: boolean;
          creado_en: string;
          actualizado_en: string;
        };
        Insert: {
          id?: string;
          clinica_id: string;
          episodio_id: string;
          objetivo_funcional: string;
          sesiones_estimadas: number;
          activo?: boolean;
          creado_en?: string;
          actualizado_en?: string;
        };
        Update: {
          id?: string;
          clinica_id?: string;
          episodio_id?: string;
          objetivo_funcional?: string;
          sesiones_estimadas?: number;
          activo?: boolean;
          creado_en?: string;
          actualizado_en?: string;
        };
        Relationships: [
          {
            foreignKeyName: "planes_terapeuticos_clinica_id_fkey";
            columns: ["clinica_id"];
            isOneToOne: false;
            referencedRelation: "clinicas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "planes_terapeuticos_episodio_id_fkey";
            columns: ["episodio_id"];
            isOneToOne: false;
            referencedRelation: "episodios_clinicos";
            referencedColumns: ["id"];
          }
        ];
      };
      sesiones: {
        Row: {
          id: string;
          clinica_id: string;
          plan_id: string;
          profesional_id: string;
          fecha: string;
          eva_ingreso: number;
          agentes_aplicados: Json;
          tolerancia: ToleranciaSesion;
          observaciones: string | null;
          creado_en: string;
        };
        Insert: {
          id?: string;
          clinica_id: string;
          plan_id: string;
          profesional_id: string;
          fecha?: string;
          eva_ingreso: number;
          agentes_aplicados?: Json;
          tolerancia?: ToleranciaSesion;
          observaciones?: string | null;
          creado_en?: string;
        };
        Update: {
          id?: string;
          clinica_id?: string;
          plan_id?: string;
          profesional_id?: string;
          fecha?: string;
          eva_ingreso?: number;
          agentes_aplicados?: Json;
          tolerancia?: ToleranciaSesion;
          observaciones?: string | null;
          creado_en?: string;
        };
        Relationships: [
          {
            foreignKeyName: "sesiones_clinica_id_fkey";
            columns: ["clinica_id"];
            isOneToOne: false;
            referencedRelation: "clinicas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sesiones_plan_id_fkey";
            columns: ["plan_id"];
            isOneToOne: false;
            referencedRelation: "planes_terapeuticos";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "sesiones_profesional_id_fkey";
            columns: ["profesional_id"];
            isOneToOne: false;
            referencedRelation: "perfiles_usuarios";
            referencedColumns: ["id"];
          }
        ];
      };
      citas: {
        Row: {
          id: string;
          clinica_id: string;
          paciente_id: string;
          profesional_id: string;
          fecha_hora: string;
          estado: CitaEstado;
          notas: string | null;
          creado_en: string;
          actualizado_en: string;
        };
        Insert: {
          id?: string;
          clinica_id: string;
          paciente_id: string;
          profesional_id: string;
          fecha_hora: string;
          estado?: CitaEstado;
          notas?: string | null;
          creado_en?: string;
          actualizado_en?: string;
        };
        Update: {
          id?: string;
          clinica_id?: string;
          paciente_id?: string;
          profesional_id?: string;
          fecha_hora?: string;
          estado?: CitaEstado;
          notas?: string | null;
          creado_en?: string;
          actualizado_en?: string;
        };
        Relationships: [
          {
            foreignKeyName: "citas_clinica_id_fkey";
            columns: ["clinica_id"];
            isOneToOne: false;
            referencedRelation: "clinicas";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "citas_paciente_id_fkey";
            columns: ["paciente_id"];
            isOneToOne: false;
            referencedRelation: "pacientes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "citas_profesional_id_fkey";
            columns: ["profesional_id"];
            isOneToOne: false;
            referencedRelation: "perfiles_usuarios";
            referencedColumns: ["id"];
          }
        ];
      };
      biblioteca_ejercicios: {
        Row: {
          id: string;
          clinica_id: string;
          nombre: string;
          zona_cuerpo: ZonaCuerpo;
          video_path: string;
          instrucciones_paciente: string;
          criterio_interno: string | null;
          activo: boolean;
          creado_en: string;
          actualizado_en: string;
        };
        Insert: {
          id?: string;
          clinica_id: string;
          nombre: string;
          zona_cuerpo: ZonaCuerpo;
          video_path: string;
          instrucciones_paciente: string;
          criterio_interno?: string | null;
          activo?: boolean;
          creado_en?: string;
          actualizado_en?: string;
        };
        Update: {
          id?: string;
          clinica_id?: string;
          nombre?: string;
          zona_cuerpo?: ZonaCuerpo;
          video_path?: string;
          instrucciones_paciente?: string;
          criterio_interno?: string | null;
          activo?: boolean;
          creado_en?: string;
          actualizado_en?: string;
        };
        Relationships: [
          {
            foreignKeyName: "biblioteca_ejercicios_clinica_id_fkey";
            columns: ["clinica_id"];
            isOneToOne: false;
            referencedRelation: "clinicas";
            referencedColumns: ["id"];
          }
        ];
      };
      prescripciones_ejercicios: {
        Row: {
          id: string;
          plan_id: string;
          ejercicio_id: string;
          series: number;
          repeticiones: number;
          duracion_segundos: number | null;
          frecuencia: string;
          orden: number;
          activo: boolean;
          creado_en: string;
        };
        Insert: {
          id?: string;
          plan_id: string;
          ejercicio_id: string;
          series?: number;
          repeticiones?: number;
          duracion_segundos?: number | null;
          frecuencia?: string;
          orden?: number;
          activo?: boolean;
          creado_en?: string;
        };
        Update: {
          id?: string;
          plan_id?: string;
          ejercicio_id?: string;
          series?: number;
          repeticiones?: number;
          duracion_segundos?: number | null;
          frecuencia?: string;
          orden?: number;
          activo?: boolean;
          creado_en?: string;
        };
        Relationships: [
          {
            foreignKeyName: "prescripciones_ejercicios_ejercicio_id_fkey";
            columns: ["ejercicio_id"];
            isOneToOne: false;
            referencedRelation: "biblioteca_ejercicios";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "prescripciones_ejercicios_plan_id_fkey";
            columns: ["plan_id"];
            isOneToOne: false;
            referencedRelation: "planes_terapeuticos";
            referencedColumns: ["id"];
          }
        ];
      };
      registro_adherencia: {
        Row: {
          id: string;
          prescripcion_id: string;
          fecha: string;
          completado: boolean;
          tuvo_molestia: boolean;
          creado_en: string;
        };
        Insert: {
          id?: string;
          prescripcion_id: string;
          fecha?: string;
          completado?: boolean;
          tuvo_molestia?: boolean;
          creado_en?: string;
        };
        Update: {
          id?: string;
          prescripcion_id?: string;
          fecha?: string;
          completado?: boolean;
          tuvo_molestia?: boolean;
          creado_en?: string;
        };
        Relationships: [
          {
            foreignKeyName: "registro_adherencia_prescripcion_id_fkey";
            columns: ["prescripcion_id"];
            isOneToOne: false;
            referencedRelation: "prescripciones_ejercicios";
            referencedColumns: ["id"];
          }
        ];
      };
      audit_logs: {
        Row: {
          id: string;
          clinica_id: string;
          usuario_id: string | null;
          accion: AuditAccion;
          recurso_tipo: string;
          recurso_id: string;
          metadata: Json;
          fecha: string;
        };
        Insert: {
          id?: string;
          clinica_id: string;
          usuario_id?: string | null;
          accion: AuditAccion;
          recurso_tipo: string;
          recurso_id: string;
          metadata?: Json;
          fecha?: string;
        };
        Update: {
          id?: string;
          clinica_id?: string;
          usuario_id?: string | null;
          accion?: AuditAccion;
          recurso_tipo?: string;
          recurso_id?: string;
          metadata?: Json;
          fecha?: string;
        };
        Relationships: [
          {
            foreignKeyName: "audit_logs_clinica_id_fkey";
            columns: ["clinica_id"];
            isOneToOne: false;
            referencedRelation: "clinicas";
            referencedColumns: ["id"];
          }
        ];
      };
      solicitudes_citas: {
        Row: {
          id: string;
          clinica_id: string;
          nombre: string;
          telefono: string;
          afeccion: string;
          sede: string;
          turno: string;
          mensaje: string | null;
          origen: string;
          estado: "pendiente" | "contactado" | "agendado" | "cancelado";
          creado_en: string;
          actualizado_en: string;
        };
        Insert: {
          id?: string;
          clinica_id?: string;
          nombre: string;
          telefono: string;
          afeccion: string;
          sede?: string;
          turno?: string;
          mensaje?: string | null;
          origen?: string;
          estado?: "pendiente" | "contactado" | "agendado" | "cancelado";
          creado_en?: string;
          actualizado_en?: string;
        };
        Update: {
          id?: string;
          clinica_id?: string;
          nombre?: string;
          telefono?: string;
          afeccion?: string;
          sede?: string;
          turno?: string;
          mensaje?: string | null;
          origen?: string;
          estado?: "pendiente" | "contactado" | "agendado" | "cancelado";
          creado_en?: string;
          actualizado_en?: string;
        };
        Relationships: [
          {
            foreignKeyName: "solicitudes_citas_clinica_id_fkey";
            columns: ["clinica_id"];
            isOneToOne: false;
            referencedRelation: "clinicas";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      clinica_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      user_role: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      user_role_type: UserRole;
      episodio_estado_type: EpisodioEstado;
      evaluacion_tipo_type: EvaluacionTipo;
      cita_estado_type: CitaEstado;
      zona_cuerpo_type: ZonaCuerpo;
      tolerancia_sesion_type: ToleranciaSesion;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
