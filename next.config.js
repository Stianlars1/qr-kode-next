/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
};

module.exports = {
  nextConfig,

  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
