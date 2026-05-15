import { Router } from 'express'

const router = Router()

/** GET /api/health — public health check for Render and uptime monitors */
router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Eddyrose Academy API',
    version: process.env.npm_package_version ?? '1.0.0',
  })
})

export default router
