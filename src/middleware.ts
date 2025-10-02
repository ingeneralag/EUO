import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const locales = ["en", "it", "es", "de"] as const;

// Map countries to languages based on your target markets
const countryToLocale: Record<string, typeof locales[number]> = {
  IT: "it", // Italy
  ES: "es", // Spain
  AT: "de", // Austria (Vienna)
  DE: "de", // Germany
  CH: "de", // Switzerland (German-speaking)
  AU: "en", // Australia
  GB: "en", // UK
  US: "en", // US
};

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip locale detection for static assets
  if (
    pathname.includes("/api/") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|gif)$/)
  ) {
    return;
  }

  // Get country from Cloudflare/Vercel headers
  // Note: geo is available on Vercel Edge, but not in types
  const country = request.headers.get("cf-ipcountry") || 
                  request.headers.get("x-vercel-ip-country");
  
  // If we can detect country and user is on root, suggest locale
  if (pathname === "/" && country && countryToLocale[country]) {
    const suggestedLocale = countryToLocale[country];
    const url = request.nextUrl.clone();
    url.pathname = `/${suggestedLocale}`;
    // Let next-intl handle the redirect with locale detection
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(en|it|es|de)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};


