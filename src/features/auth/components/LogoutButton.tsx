"use client";

import { useTransition } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { logoutAction, logoutPatientAction } from "../actions";

interface LogoutButtonProps {
  className?: string;
  variant?: "pro" | "portal";
  iconOnly?: boolean;
}

export function LogoutButton({
  className,
  variant = "pro",
  iconOnly = false,
}: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      if (variant === "portal") {
        await logoutPatientAction();
      } else {
        await logoutAction();
      }
    });
  };

  if (iconOnly || variant === "portal") {
    return (
      <button
        type="button"
        onClick={handleLogout}
        disabled={isPending}
        className={`text-slate-400 hover:text-white p-1 rounded-lg transition-colors disabled:opacity-50 cursor-pointer ${className ?? ""}`}
        title="Cerrar sesión clínica"
        aria-label="Cerrar sesión clínica"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
        ) : (
          <LogOut className="w-4 h-4" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className={`w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors text-xs font-semibold disabled:opacity-50 text-left cursor-pointer ${className ?? ""}`}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
      <span>{isPending ? "Cerrando sesión..." : "Cerrar Sesión"}</span>
    </button>
  );
}
