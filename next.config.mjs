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

export default nextConfig;