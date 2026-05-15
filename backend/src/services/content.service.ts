import prisma from '../lib/prisma'

export async function getContent() {
  const [announcements, events] = await Promise.all([
    prisma.announcement.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.event.findMany({ orderBy: { date: 'asc' } }),
  ])
  return { announcements, events }
}

export async function createAnnouncement(data: {
  title: string
  summary?: string
  content: string
  createdById: string
}) {
  return prisma.announcement.create({ data })
}

export async function deleteAnnouncement(id: string) {
  return prisma.announcement.delete({ where: { id } })
}

export async function createEvent(data: {
  title: string
  description?: string
  date: Date
  time?: string
  venue?: string
  createdById: string
}) {
  return prisma.event.create({ data })
}

export async function deleteEvent(id: string) {
  return prisma.event.delete({ where: { id } })
}
