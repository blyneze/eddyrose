import { auth } from "@/lib/auth"
import { backendStudents } from "@/lib/backend"
import { redirect } from "next/navigation"
import { Plus, User, Edit2 } from "lucide-react"
import Link from "next/link"
import { calculateAge } from "@/lib/utils/age"

export default async function StudentsPage() {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") redirect("/")

  const students = await backendStudents.list(session.user)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Student Management</h1>
          <p className="text-zinc-500 text-sm">Manage student enrollment, profiles, and parent links.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/portal/students/new"
            className="bg-eddyrose-deep hover:bg-eddyrose-light text-white px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-eddyrose-deep/20 active:scale-95"
          >
            <Plus size={18} />
            Enroll New Student
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-[1.5rem] shadow-sm border border-zinc-200 overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-600">
          <thead className="bg-zinc-50/50 border-b border-zinc-100 text-zinc-400 font-bold uppercase tracking-[0.1em] text-[10px]">
            <tr>
              <th className="px-6 py-5">Student</th>
              <th className="px-6 py-5">Reg Number</th>
              <th className="px-6 py-5">Age</th>
              <th className="px-6 py-5">Academic Class</th>
              <th className="px-6 py-5">Parents</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {students.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                   <div className="flex flex-col items-center gap-2 opacity-30">
                     <User size={48} />
                     <p className="font-bold text-zinc-900 uppercase tracking-widest text-xs">No Students Enrolled</p>
                   </div>
                </td>
              </tr>
            ) : (
              students.map((student: any) => {
                const enrollment = student.enrollments?.[0];
                const age = calculateAge(student.dateOfBirth);
                
                return (
                  <tr key={student.id} className="hover:bg-zinc-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden flex items-center justify-center">
                          {student.image ? (
                            <img src={student.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <User size={20} className="text-zinc-300" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-zinc-900">{student.name}</div>
                          <div className="text-[10px] text-zinc-400 uppercase font-black tracking-wider">
                            {student.religion || "Religion Not Added"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-[11px] bg-zinc-100 text-zinc-600 px-2 py-1 rounded">
                        {student.registrationNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium">
                        {age || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {enrollment ? (
                        <div className="flex flex-col">
                          <span className="text-zinc-900 font-bold">{enrollment.class.level}</span>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wide font-medium">{enrollment.class.name}</span>
                        </div>
                      ) : (
                        <span className="text-zinc-400 italic text-xs">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {student.parents.length > 0 ? (
                          student.parents.map((p: any) => (
                            <div
                              key={p.id}
                              className="w-8 h-8 rounded-full bg-eddyrose-light border-2 border-white flex items-center justify-center text-[10px] font-black text-white shadow-sm"
                              title={p.parentProfile.user.name}
                            >
                              {p.parentProfile.user.name.charAt(0)}
                            </div>
                          ))
                        ) : (
                          <span className="text-zinc-300 text-xs">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/portal/students/${student.id}/edit`}
                        className="inline-flex items-center gap-2 text-eddyrose-light hover:text-eddyrose-deep font-bold text-xs uppercase tracking-widest transition-colors group-hover:scale-105"
                      >
                        <Edit2 size={14} />
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
