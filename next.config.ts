import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openaccess-cdn.clevelandart.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.artic.edu",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
