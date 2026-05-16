import prisma from '../lib/prisma'

import { CreateStudentInput, UpdateStudentInput } from '../validation/student.schema'

export async function getStudents() {
  return prisma.student.findMany({
    orderBy: { name: 'asc' },
    take: 500,
    include: {
      parents: {
        include: {
          parentProfile: {
            include: {
              user: {
                select: { id: true, name: true, loginId: true, role: true },
              },
            },
          },
        },
      },
      enrollments: { include: { class: true } },
    },
  })
}

export async function getStudentById(id: string) {
  return prisma.student.findUnique({
    where: { id },
    include: {
      enrollments: {
        where: { session: { isCurrent: true }, term: { isCurrent: true } },
        include: { class: true }
      }
    }
  })
}

export async function createStudent(data: CreateStudentInput) {
  const { classId, ...studentData } = data
  try {
    return await prisma.$transaction(async (tx: any) => {
      const student = await tx.student.create({
        data: {
          ...studentData,
          dateOfBirth: studentData.dateOfBirth ? new Date(studentData.dateOfBirth) : null,
        }
      })

      // If classId is provided, also create an enrollment for the current session/term
      if (classId) {
        const currentSession = await tx.session.findFirst({ where: { isCurrent: true } })
        const currentTerm = await tx.term.findFirst({ where: { isCurrent: true } })
        
        if (currentSession && currentTerm) {
          await tx.studentEnrollment.create({
            data: {
              studentId: student.id,
              classId,
              sessionId: currentSession.id,
              termId: currentTerm.id,
            }
          })
        }
      }

      return student
    })
  } catch (error: any) {
    if (error.code === 'P2002') throw new Error('A student with this Registration Number already exists.')
    throw new Error('Failed to create student.')
  }
}

export async function updateStudent(id: string, data: UpdateStudentInput) {
  const { classId, ...studentData } = data
  try {
    return await prisma.$transaction(async (tx: any) => {
      const student = await tx.student.update({
        where: { id },
        data: {
          ...studentData,
          dateOfBirth: studentData.dateOfBirth ? new Date(studentData.dateOfBirth) : null,
        }
      })

      if (classId) {
        const currentSession = await tx.session.findFirst({ where: { isCurrent: true } })
        const currentTerm = await tx.term.findFirst({ where: { isCurrent: true } })
        
        if (currentSession && currentTerm) {
          // Update or create enrollment for the current term
          await tx.studentEnrollment.upsert({
            where: {
              studentId_sessionId_termId: {
                studentId: id,
                sessionId: currentSession.id,
                termId: currentTerm.id,
              }
            },
            update: { classId },
            create: {
              studentId: id,
              classId,
              sessionId: currentSession.id,
              termId: currentTerm.id,
            }
          })
        }
      }

      return student
    })
  } catch (error: any) {
    if (error.code === 'P2002') throw new Error('A student with this Registration Number already exists.')
    throw new Error('Failed to update student.')
  }
}

/** Returns the parent's linked children with enrollments for the /portal/children page. */
export async function getChildrenForParent(userId: string) {
  return prisma.parentProfile.findUnique({
    where: { userId },
    include: {
      students: {
        include: {
          student: {
            include: {
              enrollments: { include: { class: true } },
            },
          },
        },
      },
    },
  })
}
