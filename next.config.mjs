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
    
    // Optimize memory usage
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }
    
    return config;
  },
};

const withSerwistConfig = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

export default withSerwistConfig(nextConfig);
