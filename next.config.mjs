/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  eslint: {
 ignoreDuringBuilds:true,
  },

};

export default nextConfig;
