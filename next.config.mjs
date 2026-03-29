import withSerwistInit from "@serwist/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Memory and worker optimization
  experimental: {
    workerThreads: false,
    cpus: 1,
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vast.cdkeyonline.com",
      },
      {
        protocol: "https",
        hostname: "*.wp.com",
      }
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

const withSerwistConfig = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

export default withSerwistConfig(nextConfig);
