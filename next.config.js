/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gateway.pinata.cloud', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
