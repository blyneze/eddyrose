import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Next.js 16 Proxy / Edge Middleware (this file must be named proxy.ts at the project root).
 * NOTE: In Next.js 16+, the middleware file convention changed from "middleware.ts" to "proxy.ts".
 *
 * Current behaviour:
 * - If the request Host begins with "portal.", rewrite the path to /portal/*
 *   so the same Next.js app can serve both the public site and the dashboard
 *   under separate subdomains without separate deployments.
 *
 * Subdomain routing example:
 *   portal.eddyrose.com/overview  → served by app/portal/(dashboard)/overview
 *   www.eddyrose.com/about        → served by app/(public)/about
 *
 * To disable subdomain routing simply return NextResponse.next() for all requests.
 */
export default function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""
  const { pathname } = request.nextUrl

  // Always pass through: API routes, Next.js internals, and static assets
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Subdomain routing: portal.* → /portal/*
  if (hostname.startsWith("portal.")) {
    // Edge-level auth guard: if requesting /portal/* and no session cookie, redirect to /portal (login)
    const sessionCookie = 
      request.cookies.get("__Secure-next-auth.session-token") || 
      request.cookies.get("next-auth.session-token")

    if (!sessionCookie && pathname !== "/" && !pathname.startsWith("/api/auth")) {
       // Only redirect if they are trying to reach internal portal pages
       // We allow the root (which is the login page) and auth APIs
       return NextResponse.redirect(new URL("/", request.url))
    }

    const target = pathname === "/" ? "/portal/overview" : `/portal${pathname}`
    return NextResponse.rewrite(new URL(target, request.url))
  }


  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files, run on all other paths
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Run for API routes
    "/(api|trpc)(.*)",
  ],
}
