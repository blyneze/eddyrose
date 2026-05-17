import { Router } from 'express'
import { requireApiSecret, requireRole, getActingUser } from '../middleware/apiAuth'
import { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } from '../services/student.service'
import { createStudentSchema, updateStudentSchema } from '../validation/student.schema'
import prisma from '../lib/prisma'

const router = Router()
router.use(requireApiSecret)

/** GET /api/students — list all students (SUPERADMIN or TEACHER) */
router.get('/', async (req, res) => {
  const actor = getActingUser(req)
  if (!actor) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  if (actor.role === 'SUPERADMIN') {
    const students = await getStudents()
    res.json(students)
    return
  }

  if (actor.role === 'TEACHER') {
    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId: actor.id },
      include: { assignments: true },
    })

    if (!teacherProfile || teacherProfile.assignments.length === 0) {
      res.json([])
      return
    }

    const classIds = teacherProfile.assignments.map(a => a.classId)

    const currentSession = await prisma.session.findFirst({ where: { isCurrent: true } })
    const currentTerm = await prisma.term.findFirst({ where: { isCurrent: true } })

    if (!currentSession || !currentTerm) {
      res.json([])
      return
    }

    const enrollments = await prisma.studentEnrollment.findMany({
      where: {
        classId: { in: classIds },
        sessionId: currentSession.id,
        termId: currentTerm.id,
      },
      include: {
        student: {
          include: {
            user: {
              select: { id: true, name: true, loginId: true, role: true },
            },
            enrollments: {
              where: {
                sessionId: currentSession.id,
                termId: currentTerm.id,
              },
              include: { class: true },
            },
          },
        },
      },
    })

    const students = enrollments.map(e => e.student)
    res.json(students)
    return
  }

  res.status(403).json({ error: 'Forbidden' })
})

/** GET /api/students/profile — get own profile (STUDENT only) */
router.get('/profile', requireRole('STUDENT'), async (req, res) => {
  const actor = getActingUser(req)!
  const student = await prisma.student.findUnique({
    where: { userId: actor.id },
    include: { enrollments: { include: { class: true } } }
  })
  if (!student) { res.status(404).json({ error: 'Student profile not found.' }); return }
  res.json(student)
})

/** GET /api/students/:id — get student details (SUPERADMIN only) */
router.get('/:id', requireRole('SUPERADMIN'), async (req, res) => {
  const student = await getStudentById(req.params.id as string)
  if (!student) { res.status(404).json({ error: 'Student not found.' }); return }
  res.json(student)
})

/** POST /api/students — create a new student (SUPERADMIN only) */
router.post('/', requireRole('SUPERADMIN'), async (req, res) => {
  const parsed = createStudentSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Invalid input.' })
    return
  }
  try {
    const student = await createStudent(parsed.data)
    res.status(201).json(student)
  } catch (err: any) {
    if (err.message?.includes('already exists')) {
      res.status(409).json({ error: err.message })
      return
    }
    res.status(500).json({ error: 'Internal server error.' })
  }
})

/** PUT /api/students/:id — update student details (SUPERADMIN only) */
router.put('/:id', requireRole('SUPERADMIN'), async (req, res) => {
  const parsed = updateStudentSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Invalid input.' })
    return
  }
  try {
    const student = await updateStudent(req.params.id as string, parsed.data)
    res.json(student)
  } catch (err: any) {
    if (err.message?.includes('already exists')) {
      res.status(409).json({ error: err.message })
      return
    }
    res.status(500).json({ error: 'Internal server error.' })
  }
})

/** DELETE /api/students/:id — delete a student (SUPERADMIN only) */
router.delete('/:id', requireRole('SUPERADMIN'), async (req, res) => {
  try {
    await deleteStudent(req.params.id as string)
    res.json({ success: true })
  } catch (err: any) {
    if (err.message?.includes('not found')) {
      res.status(404).json({ error: err.message })
      return
    }
    res.status(500).json({ error: 'Internal server error.' })
  }
})

export default router
