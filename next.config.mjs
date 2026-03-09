/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Limit build worker concurrency to prevent overwhelming the API
  experimental: {
    workerThreads: false,
  },
  // Configure Turbopack instead of webpack for Next.js 16
  turbopack: {
    // Reduce parallelism during build to prevent API overload
    rules: {
      '*.svg': ['@svgr/webpack'],
    }
  },
  // Fallback webpack config for compatibility
  webpack: (config, { isServer, dev }) => {
    if (isServer && !dev) {
      // Reduce parallelism for server-side builds
      config.parallelism = 1;
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "try.tic.com.bd",
      },
      {
        protocol: "https",
        hostname: "*.wp.com",
      }
    ],
  },
};

export default nextConfig;
