import { Router } from 'express'
import { requireApiSecret, requireRole, getActingUser } from '../middleware/apiAuth'
import { getUsers, getUserById, createUser, updateUserName, updateUserPassword } from '../services/user.service'
import { createUserSchema } from '../validation/user.schema'

const router = Router()
router.use(requireApiSecret)

/** GET /api/users — list all users (SUPERADMIN only) */
router.get('/', requireRole('SUPERADMIN'), async (_req, res) => {
  const users = await getUsers()
  res.json(users)
})

/** GET /api/users/:id — get a single user (own record or SUPERADMIN) */
router.get('/:id', async (req, res) => {
  const actor = getActingUser(req)
  if (!actor) { res.status(401).json({ error: 'Unauthorized.' }); return }
  if (actor.id !== req.params.id && actor.role !== 'SUPERADMIN') {
    res.status(403).json({ error: 'Forbidden.' }); return
  }
  const user = await getUserById(req.params.id)
  if (!user) { res.status(404).json({ error: 'User not found.' }); return }
  res.json(user)
})

/** POST /api/users — create a new user (SUPERADMIN only) */
router.post('/', requireRole('SUPERADMIN'), async (req, res) => {
  const parsed = createUserSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Invalid input.' })
    return
  }
  try {
    const user = await createUser(parsed.data)
    res.status(201).json(user)
  } catch (err: any) {
    if (err.message === 'A user with this Login ID already exists.') {
      res.status(409).json({ error: err.message })
      return
    }
    res.status(500).json({ error: 'Internal server error.' })
  }
})

/** PUT /api/users/:id/name — update display name (any authenticated user for their own account) */
router.put('/:id/name', async (req, res) => {
  const actor = getActingUser(req)
  if (!actor) { res.status(401).json({ error: 'Unauthorized.' }); return }

  // Users can only update their own name unless they are SUPERADMIN
  if (actor.id !== req.params.id && actor.role !== 'SUPERADMIN') {
    res.status(403).json({ error: 'Forbidden.' })
    return
  }

  const { name } = req.body
  if (!name || typeof name !== 'string') {
    res.status(400).json({ error: 'Name is required.' })
    return
  }
  try {
    const user = await updateUserName(req.params.id, name)
    res.json(user)
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

/** POST /api/users/:id/password — change password */
router.post('/:id/password', async (req, res) => {
  const actor = getActingUser(req)
  if (!actor) { res.status(401).json({ error: 'Unauthorized.' }); return }
  if (actor.id !== req.params.id && actor.role !== 'SUPERADMIN') {
    res.status(403).json({ error: 'Forbidden.' })
    return
  }
  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword) {
    res.status(400).json({ error: 'All password fields are required.' })
    return
  }
  try {
    await updateUserPassword(req.params.id, currentPassword, newPassword)
    res.json({ success: true })
  } catch (err: any) {
    res.status(400).json({ error: err.message })
  }
})

export default router
