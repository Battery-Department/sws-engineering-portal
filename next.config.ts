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
            value: 's-maxage=1, stale-while-revalidate',
          },
        ],
      },
    ]
  },
  generateBuildId: async () => {
    // Generate a unique build ID to force fresh deployment
    return `build-${Date.now()}`
  }
};

export default nextConfig;
