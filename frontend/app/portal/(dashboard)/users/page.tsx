import { auth } from "@/lib/auth"
import { backendUsers } from "@/lib/backend"
import { redirect } from "next/navigation"
import UsersTable from "@/components/portal/UsersTable"

export default async function UsersPage() {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") redirect("/")

  const users = await backendUsers.list(session.user)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">User Management</h1>
          <p className="text-zinc-500 text-sm">Manage staff and parent access across the portal.</p>
        </div>
      </div>

      {/* Client component handles search + table rendering */}
      <UsersTable users={users} />
    </div>
  )
}
