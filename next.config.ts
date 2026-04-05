import type { NextConfig } from "next";
import { withSerwist } from "@serwist/turbopack";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.100.156"],
  cacheComponents: true,
};

export default withSerwist(nextConfig);
