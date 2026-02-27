/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'babshahi.com',
        pathname: '/public/**',
      },
      {
        protocol: 'https',
        hostname: 'babshahi.s3.ap-south-1.amazonaws.com',
        pathname: '/**',   // allow all paths from S3
      },
    ],
  },
};

module.exports = nextConfig;