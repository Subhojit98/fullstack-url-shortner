import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: "/:shortId",
				destination: "/api/links/redirect-link/:shortId",
			},
		];
	},
};

export default nextConfig;
