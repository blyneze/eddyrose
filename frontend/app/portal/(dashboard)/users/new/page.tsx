import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createUserAction } from "@/app/actions/user";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default async function NewUserPage() {
  const session = await auth();
  if (session?.user?.role !== "SUPERADMIN") redirect("/");

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/portal/users" 
          className="p-2 bg-white border border-zinc-200 rounded-lg text-zinc-500 hover:text-eddyrose-deep transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Create New User</h1>
          <p className="text-zinc-500 text-sm">Add a new staff member or parent to the system.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8">
        <form action={createUserAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1">
                Full Name
              </label>
              <input 
                name="name"
                type="text" 
                required
                placeholder="e.g. John Doe"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1">
                Role
              </label>
              <select 
                name="role"
                required
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm"
              >
                <option value="TEACHER">Teacher</option>
                <option value="PARENT">Parent</option>
                <option value="SUPERADMIN">Super Admin</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1">
                Login ID
              </label>
              <input 
                name="loginId"
                type="text" 
                required
                placeholder="e.g. TCH-001 or parent email"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 uppercase tracking-wide ml-1">
                Temporary Password
              </label>
              <input 
                name="password"
                type="password" 
                required
                placeholder="••••••••"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-eddyrose-light/20 focus:border-eddyrose-light transition-all text-sm"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 flex justify-end">
            <button 
              type="submit"
              className="bg-eddyrose-deep hover:bg-eddyrose-light text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-md shadow-eddyrose-deep/10 active:scale-[0.98]"
            >
              <Save size={18} />
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
