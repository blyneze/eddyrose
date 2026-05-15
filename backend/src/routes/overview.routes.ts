import { Router } from 'express'
import { requireApiSecret } from '../middleware/apiAuth'
import { getDashboardStats } from '../services/overview.service'

const router = Router()
router.use(requireApiSecret)

/** GET /api/overview/stats */
router.get('/stats', async (_req, res) => {
  const stats = await getDashboardStats()
  res.json(stats)
})

export default router
