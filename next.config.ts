import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // PM2/VPS uses the standalone bundle. Windows local validation cannot create
  // pnpm's traced symlinks without Developer Mode, so it uses the normal build.
  output: process.platform === "win32" ? undefined : "standalone",
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
