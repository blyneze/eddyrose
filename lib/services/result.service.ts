import prisma from "@/lib/prisma"

/**
 * Safe student fields for result sheets — no sensitive data.
 */
const STUDENT_SELECT = { id: true, name: true, registrationNumber: true } as const
const CLASS_SELECT = { id: true, name: true } as const

/**
 * SUPERADMIN view: all result sheets across all students and classes.
 * H8 FIX: uses explicit select instead of include:true to prevent over-fetching.
 */
export async function getAdminResults() {
  return prisma.resultSheet.findMany({
    orderBy: { student: { name: "asc" } },
    select: {
      id: true,
      status: true,
      student: { select: STUDENT_SELECT },
      class: { select: CLASS_SELECT },
    },
  })
}

/**
 * TEACHER view: result sheets for the class assigned to this teacher.
 * Returns null if the teacher has no profile or no class assignment.
 */
export async function getTeacherResults(userId: string) {
  const teacher = await prisma.teacherProfile.findUnique({
    where: { userId },
    include: {
      assignments: { include: { class: true } },
    },
  })

  if (!teacher || teacher.assignments.length === 0) {
    return { teacher: null, assignedClass: null, resultSheets: [] }
  }

  const assignedClass = teacher.assignments[0].class

  const resultSheets = await prisma.resultSheet.findMany({
    where: { classId: assignedClass.id },
    orderBy: { student: { name: "asc" } },
    select: {
      id: true,
      status: true,
      student: { select: STUDENT_SELECT },
    },
  })

  return { teacher, assignedClass, resultSheets }
}

/**
 * PARENT view: only PUBLISHED results for the children linked to this parent.
 * Strict visibility rule — draft or submitted results are NEVER returned.
 */
export async function getParentResults(userId: string) {
  const parent = await prisma.parentProfile.findUnique({
    where: { userId },
    include: {
      students: { include: { student: true } },
    },
  })

  const studentIds = parent?.students.map((link) => link.studentId) ?? []

  // Prisma returns [] when studentIds is empty — single consistent return type
  return prisma.resultSheet.findMany({
    where: {
      studentId: { in: studentIds },
      status: "PUBLISHED",
    },
    select: {
      id: true,
      status: true,
      student: { select: STUDENT_SELECT },
      class: { select: CLASS_SELECT },
    },
  })
}

/**
 * SUPERADMIN: publish a submitted result sheet.
 * Only transitions SUBMITTED → PUBLISHED.
 */
export async function publishResult(resultSheetId: string) {
  const sheet = await prisma.resultSheet.findUnique({ where: { id: resultSheetId } })
  if (!sheet) throw new Error("Result sheet not found.")
  if (sheet.status !== "SUBMITTED") throw new Error("Only SUBMITTED results can be published.")

  return prisma.resultSheet.update({
    where: { id: resultSheetId },
    data: { status: "PUBLISHED" },
    select: { id: true, status: true },
  })
}

/**
 * TEACHER: submit all DRAFT result sheets for a given class.
 * Transitions DRAFT → SUBMITTED, leaving non-draft sheets untouched.
 */
export async function submitClassDrafts(classId: string) {
  return prisma.resultSheet.updateMany({
    where: { classId, status: "DRAFT" },
    data: { status: "SUBMITTED" },
  })
}
