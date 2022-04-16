const withTM = require("next-transpile-modules")(["ui"]);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(withTM({
  reactStrictMode: true,
  images: {
    domains: ['media.istockphoto.com', 'images.unsplash.com'],
  },
  trailingSlash: true,
  async rewrites() {
    return [
    //   {
    //     source: '/api/:path*',
    //     destination: `http://localhost:8000/:path*`,
    //   },
      {
        source: '/api/:path*/',
        destination: `http://localhost:8000/:path*/`,
      },
    ]
  },
  async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-XSS-Protection",
						value: "0",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "Permissions-Policy",
						value: "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
				],
			},
		];
	},
}));
