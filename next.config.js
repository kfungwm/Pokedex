/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  output: 'static',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
