import { cpSync, existsSync } from "node:fs";
// Next's standalone bundle omits public/static assets; include them for PM2.
if (existsSync(".next/standalone/server.js")) {
  cpSync("public", ".next/standalone/public", { recursive: true });
  cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
}
