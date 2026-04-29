import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos'
			}
		]
	},
	turbopack: {
		rules: {
			"*.svg": {
				loaders: [
					{
						loader: require.resolve("@svgr/webpack"),
						options: {
							icon: true,
						},
					},
				],
				as: "*.js",
			},
		},
	},
};

export default nextConfig;