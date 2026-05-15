import { auth } from "@/lib/auth"
import { backendStudents } from "@/lib/backend"
import { redirect } from "next/navigation"

export default async function ParentChildrenPage() {
  const session = await auth()
  if (session?.user?.role !== "PARENT") redirect("/portal")

  let parentProfile
  try {
    parentProfile = await backendStudents.children(session.user)
  } catch (error) {
    // 404 or backend issue
    parentProfile = null
  }

  if (!parentProfile) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center bg-white border border-zinc-200 rounded-2xl shadow-sm">
        <p className="text-zinc-500 font-medium">Your parent profile is not properly set up. Please contact administration.</p>
      </div>
    )
  }

  const children = parentProfile.students.map((link: any) => link.student)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">My Children</h1>
        <p className="text-zinc-500 text-sm">Students enrolled at Eddyrose Academy linked to your account.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children.length === 0 ? (
          <div className="col-span-2 p-12 text-center bg-white border border-zinc-200 rounded-2xl shadow-sm">
            <p className="text-zinc-500 font-medium">No students are currently linked to your account.</p>
            <p className="text-zinc-400 text-sm mt-1">If this is a mistake, please contact the administrative office.</p>
          </div>
        ) : (
          children.map((student: any) => {
            const currentClass = student.enrollments[0]?.class?.name || "Unassigned"
            
            return (
              <div key={student.id} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-eddyrose-light/10 text-eddyrose-deep flex items-center justify-center font-bold text-xl uppercase">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 text-lg leading-tight">{student.name}</h3>
                    <p className="text-sm text-zinc-500 font-mono mt-0.5">{student.registrationNumber}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-zinc-100 grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wide">Current Class</span>
                    <span className="font-medium text-zinc-800">{currentClass}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wide">Status</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-800 mt-0.5">
                      Enrolled
                    </span>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
