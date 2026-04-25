/**
 * Simple in-memory rate limiter for development and single-instance deployments.
 * 
 * > [!IMPORTANT]
 * > For multi-instance production environments (Vercel, AWS), use a Redis-backed 
 * > rate limiter like @upstash/ratelimit to ensure consistency across nodes.
 */

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const stores = new Map<string, Map<string, RateLimitRecord>>();

/**
 * Rate limit a request.
 * 
 * @param key Unique identifier for the client (e.g. IP address or Login ID)
 * @param bucket Name of the rate limit bucket (e.g. "login", "contact")
 * @param limit Number of allowed requests per window
 * @param windowMs Window size in milliseconds
 * @returns Object containing status and headers-ready data
 */
export async function rateLimit(
  key: string,
  bucket: string,
  limit: number,
  windowMs: number
) {
  if (!stores.has(bucket)) {
    stores.set(bucket, new Map<string, RateLimitRecord>());
  }

  const store = stores.get(bucket)!;
  const now = Date.now();
  const record = store.get(key);

  if (!record || now > record.resetAt) {
    const newRecord = { count: 1, resetAt: now + windowMs };
    store.set(key, newRecord);
    return { success: true, remaining: limit - 1, reset: newRecord.resetAt };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0, reset: record.resetAt };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count, reset: record.resetAt };
}

/**
 * Clean up expired records to prevent memory leaks.
 */
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const store of stores.values()) {
      for (const [key, record] of store.entries()) {
        if (now > record.resetAt) {
          store.delete(key);
        }
      }
    }
  }, 1000 * 60 * 5); // Clean every 5 minutes
}
