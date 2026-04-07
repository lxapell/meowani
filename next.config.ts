import type { NextConfig } from "next";
import { withSerwist } from "@serwist/turbopack";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.100.156"],
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.anilist.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.noitatnemucod.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withSerwist(nextConfig);
