import { Request, Response, NextFunction } from 'express'

/**
 * Validates that every request carries the shared INTERNAL_API_SECRET header.
 * This prevents external callers from hitting the backend directly.
 *
 * The secret is set as x-api-secret on every server-to-server request from Next.js.
 */
export function requireApiSecret(req: Request, res: Response, next: NextFunction) {
  const secret = process.env.INTERNAL_API_SECRET
  if (!secret) {
    console.error('INTERNAL_API_SECRET is not configured on the backend.')
    res.status(500).json({ error: 'Server misconfiguration.' })
    return
  }

  const provided = req.headers['x-api-secret']
  if (!provided || provided !== secret) {
    res.status(401).json({ error: 'Unauthorized.' })
    return
  }

  next()
}

/**
 * Extracts the acting user's id and role from trusted request headers
 * (set by Next.js server actions after validating the NextAuth session).
 */
export function getActingUser(req: Request): { id: string; role: string } | null {
  const id = req.headers['x-user-id'] as string | undefined
  const role = req.headers['x-user-role'] as string | undefined
  if (!id || !role) return null
  return { id, role }
}

/**
 * Middleware that requires a specific role. Must be used after requireApiSecret.
 */
export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = getActingUser(req)
    if (!user) {
      res.status(401).json({ error: 'No acting user provided.' })
      return
    }
    if (!roles.includes(user.role)) {
      res.status(403).json({ error: 'Forbidden.' })
      return
    }
    next()
  }
}
