import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '**',
      },
    ],  
  },

  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
};

export default nextConfig;