import { NextResponse } from "next/server"

/**
 * Health check endpoint.
 * Returns a simple JSON payload confirming the service is alive.
 * Useful for uptime monitoring and load balancer health checks.
 *
 * GET /api/health
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Eddyrose Academy API",
  })
}
