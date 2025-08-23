import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    // These packages are optional dependencies of genkit and are not used in this project.
    // We can ignore them to avoid build warnings.
    if (!config.externals) {
      config.externals = [];
    }
    config.externals.push("@opentelemetry/exporter-jaeger");
    config.externals.push("@genkit-ai/firebase");

    return config;
  },
};

export default nextConfig;
