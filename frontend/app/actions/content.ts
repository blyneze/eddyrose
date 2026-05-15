"use server"

import { auth } from "@/lib/auth"
import { backendContent } from "@/lib/backend"
import {
  createAnnouncementSchema,
  createEventSchema,
  idSchema,
} from "@/lib/validation/content.schema"
import { revalidatePath } from "next/cache"

/**
 * SUPERADMIN: create a new announcement.
 * Security: all fields validated via Zod schema with max-lengths (H1, L1).
 */
export async function createAnnouncementAction(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") throw new Error("Unauthorized")

  const raw = {
    title: formData.get("title"),
    summary: formData.get("summary") || undefined,
    content: formData.get("content"),
  }

  const parsed = createAnnouncementSchema.safeParse(raw)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid input.")
  }

  await backendContent.createAnnouncement(session.user, parsed.data)
  revalidatePath("/portal/content")
}

/**
 * SUPERADMIN: create a new school event.
 * Security: date validated for plausible range, all fields max-length bounded (H1, M2).
 */
export async function createEventAction(formData: FormData) {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") throw new Error("Unauthorized")

  const raw = {
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    date: formData.get("date"),
    time: formData.get("time") || undefined,
    venue: formData.get("venue") || undefined,
  }

  const parsed = createEventSchema.safeParse(raw)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid input.")
  }

  await backendContent.createEvent(session.user, parsed.data)
  revalidatePath("/portal/content")
}

/**
 * SUPERADMIN: delete an announcement by ID.
 * Security: ID validated before DB call (L1).
 */
export async function deleteAnnouncementAction(id: string) {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") throw new Error("Unauthorized")

  const parsed = idSchema.safeParse(id)
  if (!parsed.success) throw new Error("Invalid ID.")

  await backendContent.deleteAnnouncement(session.user, parsed.data)
  revalidatePath("/portal/content")
}

/**
 * SUPERADMIN: delete an event by ID.
 * Security: ID validated before DB call (L1).
 */
export async function deleteEventAction(id: string) {
  const session = await auth()
  if (session?.user?.role !== "SUPERADMIN") throw new Error("Unauthorized")

  const parsed = idSchema.safeParse(id)
  if (!parsed.success) throw new Error("Invalid ID.")

  await backendContent.deleteEvent(session.user, parsed.data)
  revalidatePath("/portal/content")
}
