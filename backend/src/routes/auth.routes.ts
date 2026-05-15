import { Router } from 'express'
import { requireApiSecret } from '../middleware/apiAuth'
import { verifyCredentials } from '../services/user.service'
import { rateLimit } from '../lib/rateLimit'
import { loginSchema } from '../validation/auth.schema'

const router = Router()

/**
 * POST /api/auth/verify
 * Called by Next.js NextAuth CredentialsProvider to verify login credentials.
 * Returns safe user fields (id, name, role) on success.
 */
router.post('/verify', requireApiSecret, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Invalid credentials.' })
    return
  }

  const { loginId, password } = parsed.data

  // Rate limit: 5 login attempts per 15 minutes per loginId
  const limited = await rateLimit(loginId, 'login', 5, 15 * 60 * 1000)
  if (!limited.success) {
    res.status(429).json({ error: 'Too many login attempts. Please try again in 15 minutes.' })
    return
  }

  const user = await verifyCredentials(loginId, password)
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials.' })
    return
  }

  res.json(user)
})

export default router
