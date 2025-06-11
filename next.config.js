/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "vercel.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/steven-tey/precedent",
        permanent: false,
      },
    ];
  },
  devIndicators: {
    buildActivity: false,
  },
  experimental: {
    allowedNextImageDomains: ["lh3.googleusercontent.com", "vercel.com"],
    serverComponentsExternalPackages: ["@prisma/client", "@clerk/nextjs"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  },

  output: 'standalone',
};

module.exports = nextConfig;


