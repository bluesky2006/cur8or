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
        hostname: "ids.si.edu",
        pathname: "/**", // all Smithsonian IDS images
      },
      {
        protocol: "https",
        hostname: "doi.org",
        pathname: "/**", // Smithsonian DOI fallback images
      },
    ],
  },
};

export default nextConfig;
