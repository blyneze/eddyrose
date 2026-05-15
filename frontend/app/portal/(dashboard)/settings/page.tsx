import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { backendUsers } from "@/lib/backend";
import SettingsPanel from "@/components/portal/SettingsPanel";
import Link from "next/link";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/portal");

  const user = await backendUsers.getById(session.user, session.user.id);
  if (!user) redirect("/portal");

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
          Portal Settings
        </h1>
        <p className="text-zinc-500 text-sm">
          Manage your account preferences and security.
        </p>
      </div>

      {/* Tabbed profile + password forms */}
      <SettingsPanel initialName={user.name} loginId={user.loginId} />

      {/* Superadmin-only section */}
      {session.user?.role === "SUPERADMIN" && (
        <div className="pt-4 border-t border-zinc-100">
          <h2 className="text-lg font-bold text-zinc-800 mb-4 flex items-center gap-2">
            System Administration
          </h2>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl">
            <p className="text-sm text-amber-800 font-medium leading-relaxed">
              As a Superadmin, you have full control over the academic portal.
              Ensure that academic sessions and terms are correctly configured
              before teachers begin entering results.
            </p>
            <Link
              href="/portal/classes"
              className="mt-4 inline-block px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-bold hover:bg-amber-700 transition-colors"
            >
              Manage Academic Infrastructure
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
