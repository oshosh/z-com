const { sources } = require('next/dist/compiled/webpack/webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [{ source: '/upload/:slug', destination: 'http://localhost:9090/upload/:slug' }];
  },
};

module.exports = nextConfig;
