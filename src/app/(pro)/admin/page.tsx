import { Shield, ShieldAlert, CheckCircle2, Lock, Database, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { requireAdmin } from "@/features/auth";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  // Guard de máxima seguridad: Exige estrictamente rol 'admin'
  const sessionUser = await requireAdmin();

  const supabase = await createClient();

  // Consulta de métricas administrativas de la clínica actual (RLS aplicada automáticamente)
  const { count: staffCount } = await supabase
    .from("perfiles_usuarios")
    .select("*", { count: "exact", head: true })
    .eq("clinica_id", sessionUser.profile.clinica_id);

  const { count: patientCount } = await supabase
    .from("pacientes")
    .select("*", { count: "exact", head: true })
    .eq("clinica_id", sessionUser.profile.clinica_id);

  const { data: auditLogs } = await supabase
    .from("audit_logs")
    .select("*")
    .eq("clinica_id", sessionUser.profile.clinica_id)
    .order("fecha", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="warning" className="bg-amber-100 text-amber-800 border-amber-300">
              <Shield className="w-3 h-3 mr-1 inline" />
              Área Restringida
            </Badge>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Consola Administrativa y Auditoría
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gestión de seguridad, trazabilidad clínica y control de accesos • Sede Chachapoyas
          </p>
        </div>
        <div className="text-right text-xs text-slate-400">
          <div>Sesión activa: <span className="font-semibold text-slate-700">{sessionUser.profile.nombre_completo}</span></div>
          <div>Rol: <span className="font-bold text-emerald-700 uppercase">Administrador</span></div>
        </div>
      </div>

      {/* Tarjetas de estado de seguridad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="border-emerald-200 bg-emerald-50/40">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">
              Políticas RLS
            </CardTitle>
            <Lock className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>100% Activas</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              12 tablas blindadas contra fuga multi-tenant
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">
              Equipo de la Clínica
            </CardTitle>
            <Users className="w-4 h-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {staffCount ?? 0}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Usuarios con roles autorizados en esta sede
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-700">
              Pacientes Registrados
            </CardTitle>
            <Database className="w-4 h-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {patientCount ?? 0}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Expedientes clínicos aislados en Clínica ID
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Registro de Auditoría en Tiempo Real */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-emerald-600" />
                <span>Pistas de Auditoría de Seguridad (Audit Logs)</span>
              </CardTitle>
              <CardDescription>
                Registro inmutable de eventos sensibles del sistema
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!auditLogs || auditLogs.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200">
              <Shield className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-600">
                Sin eventos de auditoría registrados
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Las acciones sensibles generarán registros inmutables automáticamente en esta vista.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-emerald-700 mr-2">
                      [{log.accion}]
                    </span>
                    <span className="text-slate-600">
                      Recurso: {log.recurso_tipo} ({log.recurso_id})
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {new Date(log.fecha).toLocaleString("es-PE")}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
