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

  // Proactively heal database state if multiple sessions/terms are active
  const activeSessions = sessions.filter((s: any) => s.isCurrent)
  if (activeSessions.length > 1) {
    const keepSession = activeSessions[0]
    await prisma.session.updateMany({
      where: { id: { not: keepSession.id } },
      data: { isCurrent: false }
    })
    sessions.forEach((s: any) => {
      if (s.id !== keepSession.id) s.isCurrent = false
    })
  }

  const activeTerms = terms.filter((t: any) => t.isCurrent)
  if (activeTerms.length > 1) {
    const keepTerm = activeTerms[0]
    await prisma.term.updateMany({
      where: { id: { not: keepTerm.id } },
      data: { isCurrent: false }
    })
    terms.forEach((t: any) => {
      if (t.id !== keepTerm.id) t.isCurrent = false
    })
  }

  const teachers = teacherUsers.filter((t: any) => t.teacherProfile)
  return { classes, sessions, terms, subjects, teachers }
}

export async function createClass(name: string) {
  return prisma.class.create({ data: { name } })
}

export async function createSession(name: string) {
  return prisma.session.create({ data: { name } })
}

export async function updateSession(id: string, name: string) {
  return prisma.session.update({
    where: { id },
    data: { name }
  })
}

export async function createTerm(name: string) {
  return prisma.term.create({ data: { name } })
}

export async function createSubject(name: string) {
  return prisma.subject.create({ data: { name } })
}

export async function deleteSubject(id: string) {
  return prisma.$transaction(async (tx: any) => {
    const classSubjects = await tx.classSubject.findMany({
      where: { subjectId: id },
      select: { id: true }
    })
    const classSubjectIds = classSubjects.map((cs: any) => cs.id)
    
    if (classSubjectIds.length > 0) {
      await tx.resultEntry.deleteMany({
        where: {
          classSubjectId: { in: classSubjectIds }
        }
      })
    }

    return tx.subject.delete({
      where: { id }
    })
  })
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
