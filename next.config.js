/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  // Configure for GitHub Pages
  basePath: '',
  assetPrefix: '',
  distDir: 'build',
  trailingSlash: true,
  // Mobile performance optimizations
  experimental: {
    scrollRestoration: true, // Better scroll behavior
  },
  // Compress output for better performance
  compress: true,
  // Remove redirects - they don't work with static export
  // Use meta refresh or client-side routing instead
}

module.exports = nextConfig 