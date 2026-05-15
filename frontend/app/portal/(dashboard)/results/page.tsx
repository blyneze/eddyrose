import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { backendResults } from "@/lib/backend"
import PublishButton from "@/components/portal/PublishButton"
import SubmitDraftsButton from "@/components/portal/SubmitDraftsButton"
import DownloadResultButton from "@/components/portal/DownloadResultButton"

export default async function ResultsPage() {
  const session = await auth()
  if (!session?.user) redirect("/portal")

  const role = session.user.role

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Academic Results</h1>
          <p className="text-zinc-500 text-sm">
            {role === "SUPERADMIN" && "Review and Publish Academic Results."}
            {role === "TEACHER" && "Enter and submit subject scores for your assigned class."}
            {role === "PARENT" && "View published comprehensive results for your children."}
          </p>
        </div>
      </div>

      {role === "SUPERADMIN" && <AdminResultView user={session.user} />}
      {role === "TEACHER" && <TeacherResultView user={session.user} />}
      {role === "PARENT" && <ParentResultView user={session.user} />}
    </div>
  )
}

// ---------------------------------------------------------
// SUPER ADMIN VIEW
// ---------------------------------------------------------
async function AdminResultView({ user }: { user: any }) {
  const resultSheets = await backendResults.forAdmin(user)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
      <table className="w-full text-left text-sm text-zinc-600">
        <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider text-xs">
          <tr>
            <th className="px-6 py-4">Student Name</th>
            <th className="px-6 py-4 text-center">Class</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-right">Admin Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {resultSheets.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-zinc-400">
                No academic results loaded for the current session.
              </td>
            </tr>
          ) : (
            resultSheets.map((sheet) => (
              <tr key={sheet.id} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-zinc-900">{sheet.student.name}</td>
                <td className="px-6 py-4 text-center">{sheet.class.name}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    sheet.status === "PUBLISHED" ? "bg-green-100 text-green-800" :
                    sheet.status === "SUBMITTED" ? "bg-blue-100 text-blue-800" :
                    "bg-zinc-100 text-zinc-800"
                  }`}>
                    {sheet.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    {sheet.status === "PUBLISHED" && (
                      <DownloadResultButton 
                        studentId={sheet.studentId}
                        sessionId={sheet.sessionId}
                        termId={sheet.termId}
                        studentName={sheet.student.name}
                        variant="secondary"
                      />
                    )}
                    {(sheet.status === "SUBMITTED" || sheet.status === "REJECTED") && (
                      <a href={`/portal/results/review/${sheet.id}`} className="bg-eddyrose-deep text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-eddyrose-light transition-colors inline-flex items-center gap-1">
                        Review & Publish
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

// ---------------------------------------------------------
// TEACHER VIEW
// ---------------------------------------------------------
async function TeacherResultView({ user }: { user: any }) {
  const { assignedClass, resultSheets } = await backendResults.forTeacher(user)

  if (!assignedClass) {
    return (
      <div className="p-8 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl">
        You have not been assigned a class yet.
      </div>
    )
  }

  const hasDrafts = resultSheets.some((s) => s.status === "DRAFT")

  return (
    <div className="space-y-6">
      <div className="bg-eddyrose-light/10 p-4 rounded-xl border border-eddyrose-light/20 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-eddyrose-deep font-medium">
        <span>Assigned Class: <span className="font-bold">{assignedClass.name}</span></span>
        {hasDrafts && <SubmitDraftsButton classId={assignedClass.id} />}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-600">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-semibold uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {resultSheets.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-zinc-400">
                  No students found in your class.
                </td>
              </tr>
            ) : (
              resultSheets.map((sheet) => (
                <tr key={sheet.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900">{sheet.student.name}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      sheet.status === "DRAFT" ? "bg-amber-100 text-amber-800" : 
                      sheet.status === "REJECTED" ? "bg-red-100 text-red-800" :
                      sheet.status === "PUBLISHED" ? "bg-green-100 text-green-800" :
                      "bg-zinc-100 text-zinc-800"
                    }`}>
                      {sheet.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {sheet.status === "PUBLISHED" && (
                        <DownloadResultButton 
                          studentId={sheet.studentId}
                          sessionId={sheet.sessionId}
                          termId={sheet.termId}
                          studentName={sheet.student.name}
                          variant="secondary"
                        />
                      )}
                      {(sheet.status === "DRAFT" || sheet.status === "REJECTED") ? (
                        <a href={`/portal/results/edit/${sheet.id}`} className="text-eddyrose-light font-medium hover:underline text-sm">Edit Scores</a>
                      ) : (
                        sheet.status !== "PUBLISHED" && <span className="text-zinc-400 text-xs">Awaiting Admin</span>
                      )}
                    </div>
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

// ---------------------------------------------------------
// PARENT VIEW
// ---------------------------------------------------------
async function ParentResultView({ user }: { user: any }) {
  const publishedResults = await backendResults.forParent(user)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {publishedResults.length === 0 ? (
        <div className="col-span-2 p-12 text-center bg-white border border-zinc-200 rounded-2xl shadow-sm">
          <p className="text-zinc-500 font-medium">No published results available for your children at this time.</p>
        </div>
      ) : (
        publishedResults.map((sheet) => (
          <div key={sheet.id} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-zinc-900">{sheet.student.name}</h3>
            <p className="text-sm text-zinc-500 mb-4">{sheet.class.name}</p>
            <DownloadResultButton 
              studentId={sheet.studentId}
              sessionId={sheet.sessionId}
              termId={sheet.termId}
              studentName={sheet.student.name}
            />
          </div>
        ))
      )}
    </div>
  )
}

