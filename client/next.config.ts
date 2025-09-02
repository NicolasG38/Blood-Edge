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
};
export default nextConfig;
