import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/blogs",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: '',
        pathname: '/**'
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: '',
        pathname: '/**'
      },
    ],
  },
};

export default nextConfig;
