/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Optional, enables React's strict mode
    swcMinify: true,       // Optional, enables SWC-based minifier for faster builds
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'], // Allows Next.js to recognize these extensions in the app directory
  };
  
  export default nextConfig;
  