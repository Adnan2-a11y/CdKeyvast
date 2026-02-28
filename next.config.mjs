/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
