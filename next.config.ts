import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // ❌ DO NOT USE 'standalone' for non-Docker deployment
  // output: 'standalone', // Only for Docker - causes static assets to fail with pm2+nginx
  
  // ✅ No assetPrefix or basePath needed for standard deployment
  // These are left as defaults (undefined and '') for nginx reverse proxy
  
  // Enable static optimization
  trailingSlash: false,
  generateEtags: true, // Enable ETags for better caching
  
  // Optimize for production
  compress: true,
  poweredByHeader: false,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Optimize image loading
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Ensure proper headers for static assets
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
