import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Activity } from "lucide-react";
import { getCurrentSessionUser } from "@/features/auth";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionUser = await getCurrentSessionUser();
  const cookieStore = await cookies();
  const patientCookie = cookieStore.get("patient_session_token")?.value;

  // Si no está autenticado como usuario de sesión ni tiene cookie válida de pauta de paciente
  if (!sessionUser && !patientCookie) {
    redirect("/acceder");
  }

  // Si está autenticado con sesión de staff, permitir o mostrar contexto
  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 max-w-md mx-auto shadow-xl border-x border-slate-200">
      {/* Top Header móvil */}
      <header className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-tight block leading-tight">
              Siglo XXI • Mi Pauta
            </span>
            <span className="text-[9px] text-emerald-400 font-medium">
              Sede Jr. Sociego, Chachapoyas
            </span>
          </div>
        </div>
        <LogoutButton variant="portal" />
      </header>

      {/* Main móvil */}
      <main className="flex-1 p-4 overflow-y-auto">{children}</main>
    </div>
  );
}
