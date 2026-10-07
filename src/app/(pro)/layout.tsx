import { requireRole } from "@/features/auth";

export default async function ProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Guard estricto: Solo roles 'admin' o 'profesional'
  const sessionUser = await requireRole(["admin", "profesional"]);

  return (
    <div className="min-h-screen bg-[#F4F7F6] font-sans antialiased text-slate-800">
      {children}
    </div>
  );
}
