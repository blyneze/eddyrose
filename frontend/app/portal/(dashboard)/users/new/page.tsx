import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createUserAction } from "@/app/actions/user";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import UserForm from "@/components/portal/UserForm";

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
          <p className="text-zinc-500 text-sm">Add a new staff member or administrator to the system.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8">
        <UserForm action={createUserAction} />
      </div>
    </div>
  );
}
