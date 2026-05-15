import { auth } from "@/lib/auth"
import { backendStudents } from "@/lib/backend"
import { redirect } from "next/navigation"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function StudentsPage() {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") redirect("/")

  const students = await backendStudents.list(session.user)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Student Management</h1>
          <p className="text-zinc-500 text-sm">Manage student enrollment and parent links.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/portal/students/new"
            className="bg-eddyrose-deep hover:bg-eddyrose-light text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Enroll Student
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-600">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Reg Number</th>
              <th className="px-6 py-4">Current Class</th>
              <th className="px-6 py-4">Parents</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-zinc-400">
                  No students enrolled in the system.
                </td>
              </tr>
            ) : (
              students.map((student: any) => (
                <tr key={student.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900">{student.name}</td>
                  <td className="px-6 py-4 font-mono text-xs">{student.registrationNumber}</td>
                  <td className="px-6 py-4">
                    {student.enrollments[0]?.class?.name || "Unassigned"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {student.parents.length > 0 ? (
                        student.parents.map((p: any) => (
                          <div
                            key={p.id}
                            className="w-7 h-7 rounded-full bg-zinc-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-zinc-600"
                            title={p.parentProfile.user.name}
                          >
                            {p.parentProfile.user.name.charAt(0)}
                          </div>
                        ))
                      ) : (
                        <span className="text-zinc-400 italic text-xs">None</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-eddyrose-light hover:text-eddyrose-deep font-medium transition-colors">Manage</button>
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
