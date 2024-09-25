/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Optional, enables React's strict mode
  swcMinify: true,       // Optional, enables SWC-based minifier for faster builds
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'], // Allows Next.js to recognize these extensions in the app directory
  output: 'export',      // Enables static export for the app
  trailingSlash: true,   // Optional, adds trailing slashes to all paths for better compatibility with static hosting
  images: {
    unoptimized: true,   // Optional, disable image optimization, which is not compatible with static exports
  },
};

export default nextConfig;

  