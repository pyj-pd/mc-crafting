/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  compiler: { styledComponents: true },
  webpack: (config) => ({
    ...config,
    experiments: {
      ...config.experiments,
      topLevelAwait: true,
    },
  }),
  i18n: { locales: ['en-US', 'ko'], defaultLocale: 'en-US' },
}

module.exports = nextConfig
