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
}

module.exports = nextConfig 