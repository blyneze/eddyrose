import { auth } from "@/lib/auth"
import { backendAcademic } from "@/lib/backend"
import { redirect } from "next/navigation"
import AcademicPanel from "@/components/portal/AcademicPanel"

export default async function AcademicPage() {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") redirect("/")

  const { classes, sessions, terms, subjects, teachers } = await backendAcademic.getData(session.user)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Academic Infrastructure</h1>
          <p className="text-zinc-500 text-sm">Manage classes, sessions, terms, and subject allocations.</p>
        </div>
      </div>

      <AcademicPanel 
        classes={classes}
        sessions={sessions}
        terms={terms}
        subjects={subjects}
        teachers={teachers}
      />
    </div>
  )
}
