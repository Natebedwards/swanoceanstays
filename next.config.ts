import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static builds on Cloudflare Pages
  },
};

export default nextConfig;