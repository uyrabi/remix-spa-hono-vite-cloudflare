import { swaggerUI } from "@hono/swagger-ui";
import { generateOpenApi } from "@ts-rest/open-api";
import { OpenAPIHono } from '@hono/zod-openapi';
import { basicAuth } from "hono/basic-auth";
import { handle } from "hono/cloudflare-pages";
import { decode, jwt, sign, verify } from "hono/jwt";
import { logger } from "hono/logger";

import { contract as authContract } from "functions/api/auth/contract";
import { contract } from "functions/api/posts/contract";
import ConnectionManager from "models/db/connection";

import { api as authApi } from "./auth";
import { api as postApi } from "./posts";

type Bindings = {
	DATABASE_HOST: string;
	DATABASE_USER: string;
	DATABASE_PASSWORD: string;
};

const app = new OpenAPIHono<{ Bindings: Bindings }>();
console.log("Hi Hono!");

app.use(logger());

app.use(
	"/api/*",
	basicAuth({
		username: "hoge",
		password: "fuga",
	}),
);

app.use("/api/*", async (c, next) => {
	await ConnectionManager.getConnection(c);
	await next();
});

app.route("/api", postApi);

app.doc('/api/doc/json', {
	openapi: '3.0.0',
	info: {
	  version: '1.0.0',
	  title: 'My API',
	},
  })

// app.route("/", authApi);

// const openApiDocument = generateOpenApi(contract, {
// 	info: {
// 		title: "Posts API",
// 		version: "1.0.0",
// 	},
// });

// app.get("/api/doc/json", (c, next) => {
// 	return c.json(openApiDocument);
// });

app.get(
	"/api/doc",
	swaggerUI({
		url: "/api/doc/json",
	}),
);

export const onRequest = handle(app);
