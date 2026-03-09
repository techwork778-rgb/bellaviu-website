/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
            },
            {
                protocol: 'https',
                hostname: 'backendvibgyor.rabs.support',
            },
        ],
    },
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
      ) => {
        if (config.cache && !dev) {
            config.cache = {
              type:'filesystem',
              maxMemoryGenerations: 0,
            }
          }
        return config
      } 
};

export default nextConfig;
