import createMDX from "@next/mdx";
/** @type {import('next').NextConfig} */


const withMDX = createMDX({
  
  extension: /\.mdx?$/
});

const repoName = process.env.GITHUB_REPOSITORY?.split("/")?.[1];
const isGithubPages = process.env.GITHUB_PAGES === "true" && !!repoName;
const inferredBasePath = isGithubPages ? `/${repoName}` : "";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? inferredBasePath;
const assetPrefix = basePath ? `${basePath}/` : undefined;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
    mdxRs: true
  },
  transpilePackages: ["framer-motion"],
  pageExtensions: ["ts", "tsx", "mdx"],
  output: "export",
  basePath,
  assetPrefix,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  eslint: {
    // ⚠️ This disables ESLint checks during "next build"
    // Your local dev (next dev) will still show lint errors
    ignoreDuringBuilds: true,
  },
};

export default withMDX(nextConfig);

