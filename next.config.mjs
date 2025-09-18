import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
    mdxRs: true
  },
  transpilePackages: ["framer-motion"],
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ],
    unoptimized: true
  },
  output: 'export',
  basePath: '/freelanceApp2',
  assetPrefix: '/freelanceApp2'
};

export default withMDX(nextConfig);
