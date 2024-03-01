import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { hc } from "hono/client";
import { z } from "zod";

const app = new OpenAPIHono().basePath("/api/hoge").openapi(
	createRoute({
		method: "post",
		path: "/exist",
		responses: {
			200: {
				content: {
					"application/json": {
						schema: z.object({ hoge: z.string() }), // この行を修正
					},
				},
				description: "foo",
			},
		},
		request: {
			body: {
				content: {
					"application/json": {
						schema: z.object({ hoge: z.string() }), // この行を修正
					},
				},
			},
		},
	}),
	async (c) => {
		return c.json({ hoge: "abc" });
	},
);

type AppType = typeof app;

// Use in RPC mode on the client
const client = hc<AppType>("http:localhost:3000");

const res = await client.exist.$post({
	json: {
		// この行を追加
		hoge: "fuga",
	},
});

const data = await res.json();
