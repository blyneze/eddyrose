"use server"

import { auth } from "@/lib/auth"
import { publishResult, submitClassDrafts } from "@/lib/services/result.service"
import { getTeacherResults } from "@/lib/services/result.service"
import { revalidatePath } from "next/cache"
import { idSchema } from "@/lib/validation/content.schema"

/**
 * SUPERADMIN: publish a submitted result sheet.
 *
 * Security fixes:
 * - C4: validate resultSheetId is a non-empty, bounded string before any DB call.
 * - Auth guard confirmed SUPERADMIN only.
 */
export async function publishResultAction(resultSheetId: string) {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") {
    throw new Error("Unauthorized")
  }

  // C4 FIX: validate ID format before DB call
  const parsed = idSchema.safeParse(resultSheetId)
  if (!parsed.success) throw new Error("Invalid result sheet ID.")

  await publishResult(parsed.data)
  revalidatePath("/portal/results")
}

/**
 * TEACHER: submit all DRAFT result sheets for their assigned class.
 *
 * Security fixes:
 * - C3: verify the requesting teacher is actually assigned to the given classId.
 *   A teacher cannot submit drafts for a class they do not own.
 * - C4: validate classId format before any DB call.
 */
export async function submitDraftsAction(classId: string) {
  const session = await auth()
  if (session?.user?.role !== "TEACHER") {
    throw new Error("Unauthorized")
  }

  // C4 FIX: validate ID format
  const parsed = idSchema.safeParse(classId)
  if (!parsed.success) throw new Error("Invalid class ID.")

  // C3 FIX: verify ownership — teacher must be assigned to this exact class
  const { assignedClass } = await getTeacherResults(session.user.id)
  if (!assignedClass || assignedClass.id !== parsed.data) {
    throw new Error("Forbidden: you are not assigned to this class.")
  }

  await submitClassDrafts(parsed.data)
  revalidatePath("/portal/results")
}
