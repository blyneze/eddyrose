import prisma from "@/lib/prisma"

/**
 * Fetch all announcements and upcoming events in a single parallel query.
 * Used by the Content Management dashboard page.
 */
export async function getContent() {
  const [announcements, events] = await Promise.all([
    prisma.announcement.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.event.findMany({ orderBy: { date: "asc" } }),
  ])

  return { announcements, events }
}

export interface CreateAnnouncementInput {
  title: string
  summary?: string
  content: string
  createdById: string
}

export async function createAnnouncement(data: CreateAnnouncementInput) {
  return prisma.announcement.create({ data })
}

export async function deleteAnnouncement(id: string) {
  return prisma.announcement.delete({ where: { id } })
}

export interface CreateEventInput {
  title: string
  description?: string
  date: Date
  time?: string
  venue?: string
  createdById: string
}

export async function createEvent(data: CreateEventInput) {
  return prisma.event.create({ data })
}

export async function deleteEvent(id: string) {
  return prisma.event.delete({ where: { id } })
}
