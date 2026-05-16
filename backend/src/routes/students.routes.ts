import { Router } from 'express'
import { requireApiSecret, requireRole, getActingUser } from '../middleware/apiAuth'
import { getStudents, getStudentById, createStudent, updateStudent, getChildrenForParent } from '../services/student.service'
import { createStudentSchema, updateStudentSchema } from '../validation/student.schema'

const router = Router()
router.use(requireApiSecret)

/** GET /api/students — list all students (SUPERADMIN only) */
router.get('/', requireRole('SUPERADMIN'), async (_req, res) => {
  const students = await getStudents()
  res.json(students)
})

/** GET /api/students/children — get parent's linked children (PARENT only) */
router.get('/children', requireRole('PARENT'), async (req, res) => {
  const actor = getActingUser(req)!
  const parentProfile = await getChildrenForParent(actor.id)
  if (!parentProfile) { res.status(404).json({ error: 'Parent profile not found.' }); return }
  res.json(parentProfile)
})

/** GET /api/students/:id — get student details (SUPERADMIN only) */
router.get('/:id', requireRole('SUPERADMIN'), async (req, res) => {
  const student = await getStudentById(req.params.id)
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
    const student = await updateStudent(req.params.id, parsed.data)
    res.json(student)
  } catch (err: any) {
    if (err.message?.includes('already exists')) {
      res.status(409).json({ error: err.message })
      return
    }
    res.status(500).json({ error: 'Internal server error.' })
  }
})

export default router
