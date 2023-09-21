/** @type {import('next').NextConfig} */
const nextConfig = {
		experimental: {
			appDir: true,
		},
		async headers() {
			return [
				{
					source: "/(.*)",
					headers: [
						{
							key: "x-content-type-options",
							value: "nosniff",
						},
						{ key: "x-xss-protection", value: "1" },
						{ key: "x-frame-options", value: "DENY" },
						{
							key: "strict-transport-security",
							value: "max-age=31536000; includeSubDomains",
						},
					],
				},
			];
		},
		async rewrites() {
			return {
				beforeFiles: [
					{
						source: "/:store/checkout",
						destination: `${process.env.NEXT_PUBLIC_CHECKOUT_URL}`,
					},
					{
						source: "/checkout",
						destination: `${process.env.NEXT_PUBLIC_CHECKOUT_URL}`,
					},
				],
			};
		},
		images: {
			domains: [
				"images.unsplash.com",
				"tailwindui.com",
				"sellerise.damda.com",
				"localhost",
				"saleor-demo-jej0yspv.saleor.cloud",
				"sellerise-cms.damda.com",
				"placehold.jp", // env dev
				"picsum.photos",
			],
			minimumCacheTTL: 60,
			quality: 60,

			formats: ["image/webp"],
			// unoptimized: true,
		},
	}

module.exports = nextConfig
