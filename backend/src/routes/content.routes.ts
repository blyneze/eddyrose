import { Router } from 'express'
import { requireApiSecret, requireRole, getActingUser } from '../middleware/apiAuth'
import {
  getContent,
  createAnnouncement,
  deleteAnnouncement,
  createEvent,
  deleteEvent,
} from '../services/content.service'
import { createAnnouncementSchema, createEventSchema, idSchema } from '../validation/content.schema'

const router = Router()
router.use(requireApiSecret)

/** GET /api/content */
router.get('/', async (_req, res) => {
  const data = await getContent()
  res.json(data)
})

/** POST /api/content/announcements */
router.post('/announcements', requireRole('SUPERADMIN'), async (req, res) => {
  const actor = getActingUser(req)!
  const parsed = createAnnouncementSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Invalid input.' })
    return
  }
  const announcement = await createAnnouncement({ ...parsed.data, createdById: actor.id })
  res.status(201).json(announcement)
})

/** DELETE /api/content/announcements/:id */
router.delete('/announcements/:id', requireRole('SUPERADMIN'), async (req, res) => {
  const parsed = idSchema.safeParse(req.params.id)
  if (!parsed.success) { res.status(400).json({ error: 'Invalid ID.' }); return }
  try {
    await deleteAnnouncement(parsed.data)
    res.json({ success: true })
  } catch (err: any) {
    res.status(404).json({ error: 'Announcement not found.' })
  }
})

/** POST /api/content/events */
router.post('/events', requireRole('SUPERADMIN'), async (req, res) => {
  const actor = getActingUser(req)!
  const parsed = createEventSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Invalid input.' })
    return
  }
  const event = await createEvent({
    ...parsed.data,
    date: new Date(parsed.data.date),
    createdById: actor.id,
  })
  res.status(201).json(event)
})

/** DELETE /api/content/events/:id */
router.delete('/events/:id', requireRole('SUPERADMIN'), async (req, res) => {
  const parsed = idSchema.safeParse(req.params.id)
  if (!parsed.success) { res.status(400).json({ error: 'Invalid ID.' }); return }
  try {
    await deleteEvent(parsed.data)
    res.json({ success: true })
  } catch (err: any) {
    res.status(404).json({ error: 'Event not found.' })
  }
})

export default router
