"use server"

import { auth } from "@/lib/auth"
import { backendResults } from "@/lib/backend"
import { revalidatePath } from "next/cache"
import { idSchema } from "@/lib/validation/content.schema"

export async function publishResultAction(resultSheetId: string) {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") {
    throw new Error("Unauthorized")
  }

  const parsed = idSchema.safeParse(resultSheetId)
  if (!parsed.success) throw new Error("Invalid result sheet ID.")

  await backendResults.publish(session.user, parsed.data)
  revalidatePath("/portal/results")
}

export async function submitDraftsAction(classId: string) {
  const session = await auth()
  if (session?.user?.role !== "TEACHER") {
    throw new Error("Unauthorized")
  }

  const parsed = idSchema.safeParse(classId)
  if (!parsed.success) throw new Error("Invalid class ID.")

  await backendResults.submitClassDrafts(session.user, parsed.data)
  revalidatePath("/portal/results")
}

export async function rejectResultAction(resultSheetId: string, feedback: string) {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") throw new Error("Unauthorized")

  const parsedId = idSchema.safeParse(resultSheetId)
  if (!parsedId.success) throw new Error("Invalid ID.")

  if (!feedback.trim()) throw new Error("Feedback is required.")

  await backendResults.reject(session.user, parsedId.data, feedback)
  revalidatePath("/portal/results")
}

export async function updateScoresAction(resultSheetId: string, scores: Record<string, { test: number | null; exam: number | null }>) {
  const session = await auth()
  if (session?.user?.role !== "TEACHER") throw new Error("Unauthorized")

  const parsedId = idSchema.safeParse(resultSheetId)
  if (!parsedId.success) throw new Error("Invalid ID.")

  await backendResults.updateScores(session.user, parsedId.data, scores)
  
  revalidatePath(`/portal/results/edit/${parsedId.data}`)
  revalidatePath("/portal/results")
}
