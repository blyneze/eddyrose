import prisma from '../lib/prisma'

export async function getFullAcademicData() {
  const [classes, sessions, terms, subjects, teacherUsers] = await Promise.all([
    // Rich class data needed by AcademicPanel
    prisma.class.findMany({
      orderBy: { orderIndex: 'asc' },
      include: {
        _count: { select: { enrollments: true } },
        teacherAssigns: { include: { teacherProfile: { include: { user: true } } } },
        subjects: { include: { subject: true } },
      },
    }),
    prisma.session.findMany({ orderBy: { name: 'desc' } }),
    prisma.term.findMany({ orderBy: { name: 'asc' } }),
    prisma.subject.findMany({ orderBy: { name: 'asc' } }),
    // Teachers as User objects with teacherProfile (matches frontend shape)
    prisma.user.findMany({
      where: { role: 'TEACHER' },
      include: { teacherProfile: true },
      orderBy: { name: 'asc' },
    }),
  ])
  const teachers = teacherUsers.filter((t: any) => t.teacherProfile)
  return { classes, sessions, terms, subjects, teachers }
}

export async function createClass(name: string) {
  return prisma.class.create({ data: { name } })
}

export async function createSession(name: string) {
  return prisma.session.create({ data: { name } })
}

export async function createTerm(name: string) {
  return prisma.term.create({ data: { name } })
}

export async function createSubject(name: string) {
  return prisma.subject.create({ data: { name } })
}

export async function setAsCurrent(id: string, type: 'SESSION' | 'TERM') {
  await prisma.$transaction(async (tx: any) => {
    if (type === 'SESSION') {
      await tx.session.updateMany({ data: { isCurrent: false } })
      await tx.session.update({ where: { id }, data: { isCurrent: true } })
    } else {
      await tx.term.updateMany({ data: { isCurrent: false } })
      await tx.term.update({ where: { id }, data: { isCurrent: true } })
    }
  })
}

export async function assignTeacher(classId: string, teacherProfileId: string) {
  return prisma.teacherClassAssignment.create({ data: { classId, teacherProfileId } })
}

export async function linkSubjectToClass(classId: string, subjectId: string) {
  return prisma.classSubject.create({ data: { classId, subjectId } })
}
