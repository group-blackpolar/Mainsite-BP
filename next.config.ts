import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone", // ideal para PM2 en la VPS 
  outputFileTracingRoot: path.join(__dirname, "../../"),
};

export default nextConfig;