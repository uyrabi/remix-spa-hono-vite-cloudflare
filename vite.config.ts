import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [remix({ appDirectory: "client", ssr: false }), tsconfigPaths()],
	server:
		process.env.NODE_ENV === "development"
			? {
					proxy: {
						// `/api` へのリクエストを `localhost:8788` に転送
						// "/api": "http://localhost:8788",
						"/api": `http://localhost:${process.env.SERVER_PORT}`,
					},
					host: true,
					port: process.env.CLIENT_PORT,
					strictPort: true,
			  }
			: {},
});
