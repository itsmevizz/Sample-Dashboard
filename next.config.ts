import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true, // Set to true for 301 redirect (permanent)
      },
    ];
  },
};

export default nextConfig;
