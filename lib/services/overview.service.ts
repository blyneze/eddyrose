import prisma from "@/lib/prisma"

/**
 * Fetch all dashboard summary counts in a single parallel query.
 * Used by the Overview page to populate stat cards.
 */
export async function getDashboardStats() {
  const [studentCount, classCount, draftCount, eventCount] = await Promise.all([
    prisma.student.count(),
    prisma.class.count(),
    prisma.resultSheet.count({ where: { status: "DRAFT" } }),
    prisma.event.count(),
  ])

  return { studentCount, classCount, draftCount, eventCount }
}
