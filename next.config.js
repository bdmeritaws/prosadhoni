/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'babshahi.com',
                pathname: '/public/**',
            },
        ],
    },
};

module.exports = nextConfig;