/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Modify the stats property for more detailed output
    config.stats = {
      assets: true,
      modules: true,
      reasons: true,
      errorDetails: true,
    };

    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
