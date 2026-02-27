/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'babshahi.com',
        pathname: '/public/**',
      },
      {
        protocol: 'https',
        hostname: 'babshahi.s3.ap-south-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;