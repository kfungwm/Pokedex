/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  output: 'export',
  // basePath: '/Pokedex',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
