import { auth } from "@/lib/auth"
import { backendResults } from "@/lib/backend"
import { redirect } from "next/navigation"
import ReviewResultClient from "@/components/portal/ReviewResultClient"

export default async function ReviewResultPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") redirect("/portal/results")

  const { id } = await params
  
  try {
    const calculatedResult = await backendResults.review(session.user, id)
    
    return (
      <ReviewResultClient
        resultSheetId={id}
        result={calculatedResult}
      />
    )
  } catch (error) {
    // Backend returns 404 or 403 if it's not found or not in a reviewable state
    redirect("/portal/results")
  }
}
