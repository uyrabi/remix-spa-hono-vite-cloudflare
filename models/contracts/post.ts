import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { z } from "zod";

import {
	SelectType,
	zodInsertSchema,
	zodSelectSchema,
} from "models/post/types";

export const RequestSchema = zodInsertSchema.pick({
	title: true,
	content: true,
});

export type ResponseSchema = SelectType;

extendZodWithOpenApi(z);

const c = initContract();

export const contract = c.router({
	listPost: {
		method: "GET",
		path: "/api/posts",
		responses: {
			201: zodSelectSchema.openapi({
				title: "User",
				description: "A user schema",
			}),
		},
		summary: "Get list of posts",
	},
	createPost: {
		method: "POST",
		path: "/api/posts",
		responses: {
			201: zodSelectSchema.openapi({
				title: "User",
				description: "A user schema",
			}),
		},
		body: RequestSchema,
		summary: "Create a post ts-rest",
	},
});
