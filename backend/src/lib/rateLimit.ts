/**
 * Simple in-memory rate limiter.
 * Works correctly on Render's single-instance deployment.
 * For multi-instance, replace with @upstash/ratelimit backed by Redis.
 */

type RateLimitRecord = {
  count: number
  resetAt: number
}

const stores = new Map<string, Map<string, RateLimitRecord>>()

export async function rateLimit(
  key: string,
  bucket: string,
  limit: number,
  windowMs: number
) {
  if (!stores.has(bucket)) {
    stores.set(bucket, new Map<string, RateLimitRecord>())
  }

  const store = stores.get(bucket)!
  const now = Date.now()
  const record = store.get(key)

  if (!record || now > record.resetAt) {
    const newRecord = { count: 1, resetAt: now + windowMs }
    store.set(key, newRecord)
    return { success: true, remaining: limit - 1, reset: newRecord.resetAt }
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0, reset: record.resetAt }
  }

  record.count += 1
  return { success: true, remaining: limit - record.count, reset: record.resetAt }
}

// Clean up expired records every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const store of stores.values()) {
      for (const [key, record] of store.entries()) {
        if (now > record.resetAt) store.delete(key)
      }
    }
  }, 1000 * 60 * 5)
}
