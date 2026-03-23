import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      { source: "/openclaw", destination: "http://127.0.0.1:18789/" },
      { source: "/openclaw/:path*", destination: "http://127.0.0.1:18789/:path*" },
      { source: "/assets/:path*", destination: "http://127.0.0.1:18789/assets/:path*" },
      { source: "/ws", destination: "http://127.0.0.1:18789/ws" },
    ]
  },
};
export default nextConfig;
