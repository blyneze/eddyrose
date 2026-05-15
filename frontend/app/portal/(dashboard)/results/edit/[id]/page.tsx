import { auth } from "@/lib/auth"
import { backendResults } from "@/lib/backend"
import { redirect } from "next/navigation"
import EditScoresClient from "@/components/portal/EditScoresClient"

export default async function EditScoresPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (session?.user?.role !== "TEACHER") redirect("/portal/results")

  const { id } = await params
  
  try {
    const sheet = await backendResults.getById(session.user, id)

    if (sheet.status !== "DRAFT" && sheet.status !== "REJECTED") redirect("/portal/results")

    const mappedEntries = sheet.entries.map((e: any) => ({
      id: e.id,
      subjectName: e.classSubject.subject.name,
      testScore: e.testScore,
      examScore: e.examScore,
    }))

    return (
      <EditScoresClient
        resultSheetId={sheet.id}
        studentName={sheet.student.name}
        className={sheet.class.name}
        status={sheet.status}
        rejectionFeedback={sheet.rejectionFeedback}
        initialEntries={mappedEntries}
      />
    )
  } catch (error) {
    redirect("/portal/results")
  }
}
