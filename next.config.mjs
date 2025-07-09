/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
    output: "standalone", // ✅ required for SSR deployment menay rendder k liye use kiya

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
