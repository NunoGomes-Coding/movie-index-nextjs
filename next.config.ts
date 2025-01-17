import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: "/discover",
        destination: "/discover/movies",
        permanent: true,
      },
    ];
  }
  // experimental: {
  //   reactCompiler: process.env.REACT_COMPILER === 'true',
  // },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
