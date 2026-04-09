import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Security Headers Middleware
 * 
 * Enforces security best practices for production deployment:
 * - CSP: XSS protection
 * - X-Frame-Options: Clickjacking prevention
 * - X-Content-Type-Options: MIME sniffing protection
 * - Referrer-Policy: Privacy control
 * - Permissions-Policy: Feature access control
 */

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Content Security Policy - restrict resource loading
  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Required for Next.js
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' https://cdkeyonline.com https://*.wp.com https://i0.wp.com https://i1.wp.com https://i2.wp.com data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://*.supabase.co https://*.vercel.app",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  // Security headers
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );
  response.headers.set("X-DNS-Prefetch-Control", "on");
  
  // HSTS - only in production with HTTPS
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload"
    );
  }

  return response;
}

/**
 * Matcher configuration
 * Apply middleware to all routes except static files and API routes
 * API routes handle their own security headers
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
