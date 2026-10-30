import type { NextConfig } from "next";
import { execSync } from "node:child_process";

function buildSha(): string {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7);
  try {
    return execSync("git rev-parse --short=7 HEAD").toString().trim();
  } catch {
    return "dev";
  }
}

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/strathvane",
  assetPrefix: "/strathvane",
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BUILD_SHA: buildSha(),
  },
};

export default nextConfig;
