/** @type {import('next').NextConfig} */
const nextConfig = {}

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // .node uzantılı dosyalar için file-loader ekleyin
    config.module.rules.push({
      test: /\.node$/,
      use: 'file-loader',
    });

    return config;
  },
});
