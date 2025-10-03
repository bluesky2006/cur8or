import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openaccess-cdn.clevelandart.org",
        pathname: "/**", // all CMA images
      },
      {
        protocol: "https",
        hostname: "www.artic.edu",
        pathname: "/**", // all Smithsonian IDS images
      },
    ],
  },
};

export default nextConfig;
