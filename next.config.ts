import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Security optimizations
  poweredByHeader: false, 

  // Production optimizations
  compiler: {
    // Remove console.log in production (keep error och warn)
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },

  // Image optimizations
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Icons and smaller images
    minimumCacheTTL: 60 * 60 * 24 * 365, // Cache images for 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '4t5jrecea5ojuibh.public.blob.vercel-storage.com',
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
