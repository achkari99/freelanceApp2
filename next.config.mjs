import createMDX from "@next/mdx";
import webpack from "next/dist/compiled/webpack/webpack.js";
const { sources } = webpack;

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
    optimizePackageImports: ["lucide-react"]
  },
  transpilePackages: ["framer-motion"],
  pageExtensions: ["ts", "tsx", "mdx"],
  basePath,
  assetPrefix,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  eslint: {
    // ?? This disables ESLint checks during "next build"
    // Your local dev (next dev) will still show lint errors
    ignoreDuringBuilds: true
  },
  webpack(config) {
    config.plugins = config.plugins || [];
    config.plugins.push({
      apply(compiler) {
        compiler.hooks.thisCompilation.tap("EnsureMDXDefaultStylesheet", (compilation) => {
          const { RawSource } = compiler.webpack.sources;
          const { Compilation } = compiler.webpack;
          compilation.hooks.processAssets.tap(
            {
              name: "EnsureMDXDefaultStylesheet",
              stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
            },
            () => {
              const filename = "browser/default-stylesheet.css";
              if (!compilation.getAsset(filename)) {
                compilation.emitAsset(filename, new RawSource(":root{}\n"));
              }
            }
          );
        });
      }
    });

    return config;
  }
};

export default withMDX(nextConfig);
