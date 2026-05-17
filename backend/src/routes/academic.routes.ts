import { Router } from 'express'
import { requireApiSecret, requireRole } from '../middleware/apiAuth'
import {
  getFullAcademicData,
  createClass,
  createSession,
  updateSession,
  createTerm,
  createSubject,
  deleteSubject,
  setAsCurrent,
  assignTeacher,
  linkSubjectToClass,
} from '../services/academic.service'

const router = Router()
router.use(requireApiSecret)

/** GET /api/academic/data — all classes, sessions, terms, subjects, teachers */
router.get('/data', async (_req, res) => {
  const data = await getFullAcademicData()
  res.json(data)
})

/** POST /api/academic/classes */
router.post('/classes', requireRole('SUPERADMIN'), async (req, res) => {
  const { name } = req.body
  if (!name?.trim()) { res.status(400).json({ error: 'Name is required.' }); return }
  try {
    const cls = await createClass(name.trim())
    res.status(201).json(cls)
  } catch (err: any) {
    if (err.code === 'P2002') { res.status(409).json({ error: 'Class with this name already exists.' }); return }
    res.status(500).json({ error: 'Failed to create class.' })
  }
})

/** POST /api/academic/sessions */
router.post('/sessions', requireRole('SUPERADMIN'), async (req, res) => {
  const { name } = req.body
  if (!name?.trim()) { res.status(400).json({ error: 'Name is required.' }); return }
  try {
    const session = await createSession(name.trim())
    res.status(201).json(session)
  } catch (err: any) {
    if (err.code === 'P2002') { res.status(409).json({ error: 'Session with this name already exists.' }); return }
    res.status(500).json({ error: 'Failed to create session.' })
  }
})

/** PUT /api/academic/sessions/:id */
router.put('/sessions/:id', requireRole('SUPERADMIN'), async (req, res) => {
  const id = req.params.id as string
  const { name } = req.body
  if (!name?.trim()) { res.status(400).json({ error: 'Name is required.' }); return }
  try {
    const session = await updateSession(id, name.trim())
    res.json(session)
  } catch (err: any) {
    if (err.code === 'P2002') { res.status(409).json({ error: 'Session with this name already exists.' }); return }
    res.status(500).json({ error: 'Failed to update session.' })
  }
})

/** POST /api/academic/terms */
router.post('/terms', requireRole('SUPERADMIN'), async (req, res) => {
  const { name } = req.body
  if (!name?.trim()) { res.status(400).json({ error: 'Name is required.' }); return }
  try {
    const term = await createTerm(name.trim())
    res.status(201).json(term)
  } catch (err: any) {
    if (err.code === 'P2002') { res.status(409).json({ error: 'Term with this name already exists.' }); return }
    res.status(500).json({ error: 'Failed to create term.' })
  }
})

/** POST /api/academic/subjects */
router.post('/subjects', requireRole('SUPERADMIN'), async (req, res) => {
  const { name } = req.body
  if (!name?.trim()) { res.status(400).json({ error: 'Name is required.' }); return }
  try {
    const subject = await createSubject(name.trim())
    res.status(201).json(subject)
  } catch (err: any) {
    if (err.code === 'P2002') { res.status(409).json({ error: 'Subject with this name already exists.' }); return }
    res.status(500).json({ error: 'Failed to create subject.' })
  }
})

/** POST /api/academic/set-current */
router.post('/set-current', requireRole('SUPERADMIN'), async (req, res) => {
  const { id, type } = req.body
  if (!id || !['SESSION', 'TERM'].includes(type)) {
    res.status(400).json({ error: 'id and type (SESSION|TERM) are required.' })
    return
  }
  try {
    await setAsCurrent(id, type)
    res.json({ success: true })
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update.' })
  }
})

/** POST /api/academic/assign-teacher */
router.post('/assign-teacher', requireRole('SUPERADMIN'), async (req, res) => {
  const { classId, teacherProfileId } = req.body
  if (!classId || !teacherProfileId) {
    res.status(400).json({ error: 'classId and teacherProfileId are required.' })
    return
  }
  try {
    const result = await assignTeacher(classId, teacherProfileId)
    res.status(201).json(result)
  } catch (err: any) {
    if (err.code === 'P2002') { res.status(409).json({ error: 'Teacher is already assigned to this class.' }); return }
    res.status(500).json({ error: 'Failed to assign teacher.' })
  }
})

/** POST /api/academic/link-subject */
router.post('/link-subject', requireRole('SUPERADMIN'), async (req, res) => {
  const { classId, subjectId } = req.body
  if (!classId || !subjectId) {
    res.status(400).json({ error: 'classId and subjectId are required.' })
    return
  }
  try {
    const result = await linkSubjectToClass(classId, subjectId)
    res.status(201).json(result)
  } catch (err: any) {
    if (err.code === 'P2002') { res.status(409).json({ error: 'Subject is already linked to this class.' }); return }
    res.status(500).json({ error: 'Failed to link subject.' })
  }
})

/** DELETE /api/academic/subjects/:id */
router.delete('/subjects/:id', requireRole('SUPERADMIN'), async (req, res) => {
  const id = req.params.id as string
  try {
    await deleteSubject(id)
    res.json({ success: true })
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete subject.' })
  }
})

export default router
