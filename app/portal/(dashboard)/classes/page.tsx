import { auth } from "@/lib/auth"
import { getClasses } from "@/lib/services/class.service"
import { redirect } from "next/navigation"
import { Plus } from "lucide-react"

export default async function ClassesPage() {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") redirect("/")

  const classes = await getClasses()

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Manage Classes</h1>
          <p className="text-zinc-500 text-sm">Configure class structures and assignments.</p>
        </div>
        <button className="bg-eddyrose-deep hover:bg-eddyrose-light text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
          <Plus size={16} />
          Add Class
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-600">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4">Class Name</th>
              <th className="px-6 py-4 text-center">Assigned Teachers</th>
              <th className="px-6 py-4 text-center">Enrolled Students</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {classes.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-zinc-400">
                  No classes configured. Run the initial setup seed.
                </td>
              </tr>
            ) : (
              classes.map((cls) => (
                <tr key={cls.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900">{cls.name}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-zinc-100 font-medium">
                      {cls._count.teacherAssigns}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                      {cls._count.enrollments}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-eddyrose-light hover:text-eddyrose-deep font-medium transition-colors mr-4">Manage</button>
                    <button className="text-zinc-400 hover:text-zinc-800 font-medium transition-colors">Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
