import { swaggerUI } from "@hono/swagger-ui";
import { generateOpenApi } from "@ts-rest/open-api";
import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { handle } from "hono/cloudflare-pages";
import { logger } from "hono/logger";
import { contract } from "models/contracts/post";
import ConnectionManager from "models/db/connection";

import { api as postApi } from "./posts";

type Bindings = {
	DATABASE_HOST: string;
	DATABASE_USER: string;
	DATABASE_PASSWORD: string;
};

const app = new Hono<{ Bindings: Bindings }>();
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

app.route("/", postApi);

const openApiDocument = generateOpenApi(contract, {
	info: {
		title: "Posts API",
		version: "1.0.0",
	},
});

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
