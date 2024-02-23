/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.pinimg.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
      experimental: {
        serverActions: true,
      },
      reactStrictMode: true,
}

module.exports = nextConfig
