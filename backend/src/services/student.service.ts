import prisma from '../lib/prisma'

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

export async function createStudent(data: { name: string; registrationNumber: string }) {
  try {
    return await prisma.student.create({ data })
  } catch (error: any) {
    if (error.code === 'P2002') throw new Error('A student with this Registration Number already exists.')
    throw new Error('Failed to create student.')
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
