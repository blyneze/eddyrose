import prisma from '../lib/prisma'
import bcrypt from 'bcryptjs'
import { generateDefaultPassword } from '../lib/auth-utils'
import { CreateStudentInput, UpdateStudentInput } from '../validation/student.schema'

export async function getStudents() {
  return prisma.student.findMany({
    orderBy: { name: 'asc' },
    take: 500,
    include: {
      user: {
        select: { id: true, name: true, loginId: true, role: true },
      },
      enrollments: { include: { class: true } },
    },
  })
}

export async function getStudentById(id: string) {
  return prisma.student.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, name: true, loginId: true, role: true },
      },
      enrollments: {
        where: { session: { isCurrent: true }, term: { isCurrent: true } },
        include: { class: true }
      }
    }
  })
}

export async function createStudent(data: CreateStudentInput) {
  const { classId, ...studentData } = data
  const defaultPassword = generateDefaultPassword()
  const hashedPassword = await bcrypt.hash(defaultPassword, 10)

  try {
    const result = await prisma.$transaction(async (tx: any) => {
      // 1. Create the User record for student login
      const user = await tx.user.create({
        data: {
          loginId: studentData.registrationNumber, // Reg Number is the Login ID
          password: hashedPassword,
          role: 'STUDENT',
          name: studentData.name,
        }
      })

      // 2. Create the Student record linked to the User
      const student = await tx.student.create({
        data: {
          ...studentData,
          userId: user.id,
          dateOfBirth: studentData.dateOfBirth ? new Date(studentData.dateOfBirth) : null,
        }
      })

      // 3. Handle enrollment if classId is provided
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

    // Return the student data PLUS the plain text password so admin can show it
    return { ...result, generatedPassword: defaultPassword }
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

      // Sync the user's name and loginId (registration number)
      await tx.user.update({
        where: { id: student.userId },
        data: {
          name: studentData.name,
          loginId: studentData.registrationNumber,
        }
      })

      if (classId) {
        const currentSession = await tx.session.findFirst({ where: { isCurrent: true } })
        const currentTerm = await tx.term.findFirst({ where: { isCurrent: true } })
        
        if (currentSession && currentTerm) {
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

