import prisma from '../lib/prisma'

export async function getDashboardStats() {
  const [studentCount, classCount, draftCount, eventCount] = await Promise.all([
    prisma.student.count(),
    prisma.class.count(),
    prisma.resultSheet.count({ where: { status: 'DRAFT' } }),
    prisma.event.count(),
  ])
  return { studentCount, classCount, draftCount, eventCount }
}
