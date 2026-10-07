import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Play } from "lucide-react";

export default function PautaPage() {
  return (
    <div className="space-y-4">
      <div>
        <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider block">
          Plan Activo
        </span>
        <h1 className="text-xl font-bold text-slate-900">Tu Rutina de Hoy</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Ejercicios indicados por tu terapeuta para realizar en casa
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Badge variant="success">Fase F0: Estructura</Badge>
            <span className="text-[10px] text-slate-400">~4 minutos</span>
          </div>
          <CardTitle className="text-sm mt-2">Módulo Mi Pauta</CardTitle>
          <CardDescription>
            Ruta preparada para visualización de micro-videos y check de adherencia en F5.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Play className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Video Demostrativo</h4>
                <p className="text-[10px] text-slate-500">2 series × 10 reps</p>
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-slate-300" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
