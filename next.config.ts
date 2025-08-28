import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;

// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
  
// };

// module.exports = nextConfig;
