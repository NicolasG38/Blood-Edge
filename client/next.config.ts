/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Disable server-side image optimization to avoid cross-container fetch issues
		// The browser will request images directly from the API origin (allowed by CSP)
		unoptimized: true,
		remotePatterns: (() => {
			const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3310";
			try {
				const u = new URL(api);
				return [
					{
						protocol: u.protocol.replace(":", ""),
						hostname: u.hostname,
						port: u.port || undefined,
						pathname: "/icons/**",
					},
					{
						protocol: u.protocol.replace(":", ""),
						hostname: u.hostname,
						port: u.port || undefined,
						pathname: "/images/**",
					},
					{
						protocol: u.protocol.replace(":", ""),
						hostname: u.hostname,
						port: u.port || undefined,
						pathname: "/public/icons/**",
					},
					{
						protocol: u.protocol.replace(":", ""),
						hostname: u.hostname,
						port: u.port || undefined,
						pathname: "/public/images/**",
					},
				];
			} catch {
				return [
					{
						protocol: "http",
						hostname: "localhost",
						port: "3310",
						pathname: "/icons/**",
					},
					{
						protocol: "http",
						hostname: "localhost",
						port: "3310",
						pathname: "/images/**",
					},
					{
						protocol: "http",
						hostname: "localhost",
						port: "3310",
						pathname: "/public/icons/**",
					},
					{
						protocol: "http",
						hostname: "localhost",
						port: "3310",
						pathname: "/public/images/**",
					},
				];
			}
		})(),
	},
	async headers() {
		const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3310";
		let apiOrigin = "http://localhost:3310";
		try {
			apiOrigin = new URL(api).origin;
		} catch {}

		const csp =
			[
				"default-src 'self'",
				"script-src 'self' 'unsafe-inline' https://platform.twitter.com https://cdn.syndication.twimg.com",
				"frame-src https://platform.twitter.com https://syndication.twitter.com",
				"style-src 'self' 'unsafe-inline'",
				`connect-src 'self' ${apiOrigin}`,
				`img-src 'self' ${apiOrigin} data: blob:`,
			].join("; ") + ";";

		return [
			{
				source: "/(.*)",
				headers: [
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
					{ key: "Content-Security-Policy", value: csp },
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
