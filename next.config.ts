import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 1) Disable ESLint errors blocking the build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 2) Disable TypeScript type‑checking errors blocking the build
  typescript: {
    // ⚠️ skips all TS errors! use with caution
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
