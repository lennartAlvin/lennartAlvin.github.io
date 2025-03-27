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
  // Add redirects for GitHub Pages
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig 