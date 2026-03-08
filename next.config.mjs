/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "try.tic.com.bd",
<<<<<<< HEAD
        pathname: "/wp-content/uploads/**",
      },
      {
        // Many WP sites still serve media via HTTP or redirect during fetch
        protocol: "http",
        hostname: "try.tic.com.bd",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.wp.com", // Useful if using Jetpack/Photon CDN
=======
      },
      {
        protocol: "https",
        hostname: "*.wp.com",
>>>>>>> e1283bb809bb53b93b8b93f3223fad6fb746f45f
      }
    ],
  },
};

export default nextConfig;
