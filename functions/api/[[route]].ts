import { OpenAPIHono } from "@hono/zod-openapi";
import { handle } from "hono/cloudflare-pages";
import { logger } from "hono/logger";

import ConnectionManager from "models/db/connection";

type Bindings = {
	PS_HOST: string;
	PS_USER: string;
	PS_PASSWORD: string;
};

const app = new OpenAPIHono<{ Bindings: Bindings }>();
console.log("Hi Hono!");

app.use(logger());

app.use("/api/*", async (c, next) => {
	await ConnectionManager.getConnection(c);
	await next();
});

app.get("/api", (c) => {
	return c.json({
		message: "Hello Hono!!",
	});
});

// import { postApi } from "./posts";

// app.route("/api/", postApi);

import { generateOpenApi } from "@ts-rest/open-api";
import { contract } from "models/contracts/post";
import { createHonoEndpoints } from "ts-rest-hono";
import { router as createRouter } from "./posts/create";
import { router as listRouter } from "./posts/list";

createHonoEndpoints(contract, createRouter, app);
createHonoEndpoints(contract, listRouter, app);

const openApiDocument = generateOpenApi(contract, {
	info: {
		title: "Posts API",
		version: "1.0.0",
	},
});

import { swaggerUI } from "@hono/swagger-ui";
import { html } from "hono/html";

app.get("/api/doc/json", (c, next) => {
	return c.json(openApiDocument);
});

app.get(
	"/api/doc",
	swaggerUI({
		url: "/api/doc/json",
	}),
);

export const onRequest = handle(app);
