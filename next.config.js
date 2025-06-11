/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '3000-imm5ceaypszni61prwuf0-a3a9c240.manusvm.computer',
        port: '',
        pathname: '/**', 
      },
    ],
    domains: ["lh3.googleusercontent.com", "vercel.com", "3000-imm5ceaypszni61prwuf0-a3a9c240.manusvm.computer"],
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


