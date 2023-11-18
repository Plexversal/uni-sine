/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['s.gravatar.com'],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Modify the stats property for more detailed output
    config.stats = {
      assets: true,
      modules: true,
      reasons: true,
      errorDetails: true,
    };
    config.module.rules.push({
      test: /\.worker\.js$/, // This will match any .worker.js files
      loader: 'worker-loader',
      options: {
          inline: 'fallback', // This will make sure the worker is inlined if possible, and falls back to a separate file if not
      },
  });
    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
