/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  // Required for GitHub Pages
  basePath: '',
  assetPrefix: '',
}

module.exports = nextConfig 