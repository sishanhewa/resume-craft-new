import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empty turbopack config to use Turbopack (Next.js 16 default)
  turbopack: {},

  // Webpack config as fallback if using --webpack flag
  webpack: (config) => {
    // Add alias for canvas (pdfjs-dist optional dependency)
    config.resolve.alias.canvas = false;

    // Handle pdfjs-dist worker
    config.resolve.alias['pdfjs-dist'] = 'pdfjs-dist/legacy/build/pdf';

    return config;
  },
};

export default nextConfig;
