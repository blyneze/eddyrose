import prisma from '../lib/prisma'

const STUDENT_SELECT = { id: true, name: true, registrationNumber: true } as const
const CLASS_SELECT = { id: true, name: true } as const

export async function getAdminResults() {
  return prisma.resultSheet.findMany({
    orderBy: { student: { name: 'asc' } },
    select: {
      id: true,
      status: true,
      studentId: true,
      sessionId: true,
      termId: true,
      student: { select: STUDENT_SELECT },
      class: { select: CLASS_SELECT },
    },
  })
}

export async function getTeacherResults(userId: string) {
  const teacher = await prisma.teacherProfile.findUnique({
    where: { userId },
    include: { assignments: { include: { class: true } } },
  })
  if (!teacher || teacher.assignments.length === 0) {
    return { teacher: null, assignedClass: null, resultSheets: [] }
  }
  const assignedClass = teacher.assignments[0].class
  const resultSheets = await prisma.resultSheet.findMany({
    where: { classId: assignedClass.id },
    orderBy: { student: { name: 'asc' } },
    select: {
      id: true,
      status: true,
      studentId: true,
      sessionId: true,
      termId: true,
      student: { select: STUDENT_SELECT },
    },
  })
  return { teacher, assignedClass, resultSheets }
}

export async function getStudentResults(userId: string) {
  const student = await prisma.student.findUnique({
    where: { userId },
  })
  if (!student) return []

  return prisma.resultSheet.findMany({
    where: { studentId: student.id, status: 'PUBLISHED' },
    select: {
      id: true,
      status: true,
      studentId: true,
      sessionId: true,
      termId: true,
      student: { select: STUDENT_SELECT },
      class: { select: CLASS_SELECT },
    },
  })
}

export async function publishResult(resultSheetId: string) {
  const sheet = await prisma.resultSheet.findUnique({ where: { id: resultSheetId } })
  if (!sheet) throw new Error('Result sheet not found.')
  if (sheet.status !== 'SUBMITTED' && sheet.status !== 'REJECTED')
    throw new Error('Only SUBMITTED or REJECTED results can be published.')
  return prisma.resultSheet.update({
    where: { id: resultSheetId },
    data: { status: 'PUBLISHED' },
    select: { id: true, status: true },
  })
}

export async function rejectResult(resultSheetId: string, feedback: string) {
  const sheet = await prisma.resultSheet.findUnique({ where: { id: resultSheetId } })
  if (!sheet) throw new Error('Result sheet not found.')
  if (sheet.status !== 'SUBMITTED') throw new Error('Only SUBMITTED results can be rejected.')
  return prisma.resultSheet.update({
    where: { id: resultSheetId },
    data: { status: 'REJECTED', rejectionFeedback: feedback },
    select: { id: true, status: true },
  })
}

export async function submitClassDrafts(classId: string) {
  return prisma.resultSheet.updateMany({
    where: { classId, status: { in: ['DRAFT', 'REJECTED'] } },
    data: { status: 'SUBMITTED' },
  })
}

export async function getResultForEdit(id: string) {
  return prisma.resultSheet.findUnique({
    where: { id },
    include: {
      student: { select: STUDENT_SELECT },
      class: { select: CLASS_SELECT },
      entries: { include: { classSubject: { include: { subject: true } } } },
    },
  })
}

export async function updateResultScores(
  resultSheetId: string,
  scores: Record<string, { test: number | null; exam: number | null }>,
  details?: {
    teacherComment?: string | null
    closingDate?: string | null
    resumptionDate?: string | null
    affectiveDomain?: Record<string, number> | null
  }
) {
  const sheet = await prisma.resultSheet.findUnique({ where: { id: resultSheetId } })
  if (!sheet) throw new Error('Result sheet not found.')
  if (sheet.status !== 'DRAFT' && sheet.status !== 'REJECTED')
    throw new Error('Only DRAFT or REJECTED results can be edited.')

  await prisma.$transaction([
    ...Object.entries(scores).map(([entryId, score]) =>
      prisma.resultEntry.update({
        where: { id: entryId },
        data: {
          testScore: score.test !== null ? Math.max(0, Math.min(30, score.test)) : null,
          examScore: score.exam !== null ? Math.max(0, Math.min(70, score.exam)) : null,
        },
      })
    ),
    prisma.resultSheet.update({
      where: { id: resultSheetId },
      data: {
        status: sheet.status === 'REJECTED' ? 'DRAFT' : undefined,
        ...(details?.teacherComment !== undefined && { teacherComment: details.teacherComment }),
        ...(details?.closingDate !== undefined && { closingDate: details.closingDate ? new Date(details.closingDate) : null }),
        ...(details?.resumptionDate !== undefined && { resumptionDate: details.resumptionDate ? new Date(details.resumptionDate) : null }),
        ...(details?.affectiveDomain !== undefined && { affectiveDomain: details.affectiveDomain as any }),
      }
    })
  ])
}

export async function getResultSheetByStudentSessionTerm(
  studentId: string,
  sessionId: string,
  termId: string
) {
  return prisma.resultSheet.findFirst({ where: { studentId, sessionId, termId } })
}
