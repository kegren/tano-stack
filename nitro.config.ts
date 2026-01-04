import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  // Optimize for Bun
  preset: "bun",

  // Enable compression for static assets (gzip/brotli)
  compressPublicAssets: true,

  routeRules: {
    "/**": {
      headers: {
        // 1. Security: Block MIME type sniffing
        "X-Content-Type-Options": "nosniff",

        // 2. Security: Prevent clickjacking (embedding in iframes)
        "X-Frame-Options": "DENY",

        // 3. Privacy: Control how much referrer info is sent
        "Referrer-Policy": "strict-origin-when-cross-origin",

        // 4. Security: Force HTTPS (HSTS) - Critical for production
        // max-age=63072000 is 2 years. includeSubDomains covers subdomains.
        "Strict-Transport-Security":
          "max-age=63072000; includeSubDomains; preload",

        // 5. Hardware Access: Restrict access to sensitive device features
        "Permissions-Policy":
          "camera=(), microphone=(), geolocation=(), payment=(), usb=()",

        // 6. Content Security Policy (CSP)
        // Allow scripts/images from 'self' and Cloudflare (for Turnstile).
        // object-src 'none' prevents Flash/Java plugins (best practice).
        // upgrade-insecure-requests forces HTTP links to load as HTTPS.
        "Content-Security-Policy": [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
          "connect-src 'self' https://challenges.cloudflare.com",
          "frame-src 'self' https://challenges.cloudflare.com",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https://challenges.cloudflare.com",
          "font-src 'self' data:",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "upgrade-insecure-requests",
        ].join("; "),
      },
    },
  },
});
