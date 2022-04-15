const withTM = require("next-transpile-modules")(["ui"]);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(withTM({
  reactStrictMode: true,
  images: {
    domains: ['media.istockphoto.com', 'images.unsplash.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:3001/:path*`,
      },
      {
        source: '/api/:path*/',
        destination: `http://localhost:3001/:path*/`,
      },
    ]
  }
}));
