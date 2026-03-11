/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Prevents build workers from crashing low-RAM environments
  experimental: {
    workerThreads: false,
    cpus: 1
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://vast.cdkeyonline.com",
      },
      {
        protocol: "https",
        hostname: "*.wp.com",
      }
    ],
  },

  webpack: (config, { isServer, dev }) => {
    // Handle SVGs
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (isServer && !dev) {
      // Reduce parallelism for server-side builds to prevent API/Memory overload
      config.parallelism = 1;
    }
    return config;
  },
};

<<<<<<< HEAD
export default nextConfig;
=======
export default nextConfig;

>>>>>>> cbf27ac3e50f44b4effa3676d09d15b7bd2dbb15
