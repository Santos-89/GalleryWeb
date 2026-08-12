import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    // Deshabilita el caché persistente en disco de Turbopack para evitar
    // corrupción en volúmenes externos/de red macOS (/Volumes/...)
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
