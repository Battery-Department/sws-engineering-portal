import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
