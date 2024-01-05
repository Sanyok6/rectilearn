/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      domains: ["media.istockphoto.com", "images.unsplash.com"],
    },
    trailingSlash: true,
	async rewrites() {
		return [
			{
				source: "/api/:path*/",
				destination: `http://0.0.0.0:8000/:path*/`,
			},
			// {
			//   source: "/api/:path*/",
			//   destination: `https://steep-thunder-production-0a14.up.railway.app/:path*/`,
			// },
		];
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
};

module.exports = nextConfig;
