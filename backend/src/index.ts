import express from 'express'
// Load environment variables from .env file (Node 20.6+)
try {
  // @ts-ignore
  if (typeof process.loadEnvFile === 'function') process.loadEnvFile()
} catch (e) {
  // .env might not exist in some environments, ignore
}

import helmet from 'helmet'
import cors from 'cors'

import healthRouter from './routes/health.routes'
import authRouter from './routes/auth.routes'
import usersRouter from './routes/users.routes'
import studentsRouter from './routes/students.routes'
import resultsRouter from './routes/results.routes'
import academicRouter from './routes/academic.routes'
import contentRouter from './routes/content.routes'
import overviewRouter from './routes/overview.routes'
import contactRouter from './routes/contact.routes'

const app = express()
const PORT = Number(process.env.PORT ?? 4000)

// ─── Security ──────────────────────────────────────────────────────────────
app.use(helmet())

/**
 * CORS: only the Next.js frontend origin is permitted.
 * The browser never calls this API directly — all calls come from Next.js
 * server actions (server-to-server). We restrict CORS to prevent browsers
 * from making direct requests even if someone discovers the URL.
 */
const allowedOrigins = (process.env.FRONTEND_URL ?? 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim())

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server calls (no origin header)
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error(`CORS: origin ${origin} is not allowed`))
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-api-secret', 'x-user-id', 'x-user-role'],
  })
)

// ─── Body Parsers ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))

// ─── Routes ────────────────────────────────────────────────────────────────
app.use('/api/health', healthRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/students', studentsRouter)
app.use('/api/results', resultsRouter)
app.use('/api/academic', academicRouter)
app.use('/api/content', contentRouter)
app.use('/api/overview', overviewRouter)
app.use('/api/contact', contactRouter)

// ─── 404 Handler ───────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' })
})

// ─── Global Error Handler ──────────────────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error.' })
})

// ─── Start ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Eddyrose API running on port ${PORT} [${process.env.NODE_ENV ?? 'development'}]`)
})

export default app
