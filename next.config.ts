import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'vercel.app', 'blob.vercel-storage.com'],
  },
  headers: async () => {
    return [
      {
        source: '/customer/products',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ]
  },
  generateBuildId: async () => {
    // Generate a unique build ID to force fresh deployment
    return `build-${Date.now()}-${Math.random().toString(36).substring(7)}`
  },
  reactStrictMode: true,
};

export default nextConfig;
