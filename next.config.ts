import type { NextConfig } from "next";

// Workaround for Node environments where globalThis.localStorage exists as an empty object
// (e.g. some new runtimes or shims) and does not implement getItem/setItem.
if (typeof globalThis !== "undefined") {
  const ls = globalThis.localStorage as any;
  if (!ls || typeof ls.getItem !== "function") {
    globalThis.localStorage = {
      getItem: (_key: string) => null,
      setItem: (_key: string, _value: string) => {},
      removeItem: (_key: string) => {},
      clear: () => {},
      key: (_index: number) => null,
      length: 0,
    } as Storage;
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**", // allow all paths
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**", // allow all paths
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
