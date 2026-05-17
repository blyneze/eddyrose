import { auth } from "@/lib/auth"
import { backendStudents, backendAcademic } from "@/lib/backend"
import { redirect } from "next/navigation"
import { Plus } from "lucide-react"
import Link from "next/link"
import StudentList from "@/components/students/StudentList"

export default async function StudentsPage() {
  const session = await auth()
  if (!session?.user?.role || !["SUPERADMIN", "TEACHER"].includes(session.user.role)) redirect("/")

  const [students, academicData] = await Promise.all([
    backendStudents.list(session.user),
    backendAcademic.getData(session.user)
  ])

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Student Management</h1>
          <p className="text-zinc-500 text-sm">Manage student enrollment, profiles, and records.</p>
        </div>
        <div className="flex items-center gap-3">
          {session.user.role === "SUPERADMIN" && (
            <Link
              href="/portal/students/new"
              className="bg-eddyrose-deep hover:bg-eddyrose-light text-white px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-eddyrose-deep/20 active:scale-95"
            >
              <Plus size={18} />
              Enroll New Student
            </Link>
          )}
        </div>
      </div>

      <StudentList initialStudents={students} classes={academicData.classes || []} userRole={session.user.role as string} />
    </div>
  )
}
