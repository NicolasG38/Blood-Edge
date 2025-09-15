/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "192.168.1.14",
				port: "3310",
				pathname: "/icons/**",
			},
			{
				protocol: "http",
				hostname: "192.168.1.14",
				port: "3310",
				pathname: "/images/**",
			},
			// ajoute ton domaine/port en prod si besoin
		],
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
					{
						key: "Content-Security-Policy",
						value:
							"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' http://192.168.1.14:3310;" +
							"img-src 'self' http://192.168.1.14:3310 data: blob:; ",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
				],
			},
		];
	},
	poweredByHeader: false,
};

export default nextConfig;
