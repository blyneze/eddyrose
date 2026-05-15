import { Router } from 'express'
import { requireApiSecret, requireRole, getActingUser } from '../middleware/apiAuth'
import { getStudents, createStudent, getChildrenForParent } from '../services/student.service'
import { createStudentSchema } from '../validation/student.schema'

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

export default router
