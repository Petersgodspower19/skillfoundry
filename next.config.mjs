/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'skillfoundrybackend.onrender.com',
        pathname: '/uploads/**',
      }
    ],
  },
};

export default nextConfig
