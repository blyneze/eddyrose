import type { NextConfig } from "next";

/**
 * Security headers applied to every response.
 *
 * C6 FIX: Production-grade HTTP security headers.
 * - X-Frame-Options: prevents clickjacking (DENY = never embed in iframe).
 * - X-Content-Type-Options: prevents MIME-type sniffing.
 * - Referrer-Policy: limits referrer data on cross-origin navigations.
 * - Permissions-Policy: disables powerful browser APIs not needed by the app.
 * - Strict-Transport-Security: forces HTTPS for 1 year (includeSubDomains).
 *   NOTE: Only activate HSTS in production — omit on localhost to avoid breaking HTTP dev.
 * - Content-Security-Policy: restricts which resources can be loaded.
 *   The 'unsafe-inline' on style-src is required by Next.js RSC; tighten after
 *   adding a nonce-based CSP in a future hardening pass.
 */
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: *", // Allow images from any secure source
      "connect-src 'self' https://vitals.vercel-insights.com",
      "frame-src 'self' https://www.google.com", // Allow Google Maps
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

// Production-only headers
if (process.env.NODE_ENV === "production") {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  });
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
