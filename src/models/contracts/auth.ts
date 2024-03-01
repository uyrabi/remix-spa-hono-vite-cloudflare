import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { boolean } from "drizzle-orm/mysql-core";
import {
	SelectType,
	zodInsertSchema,
	zodSelectSchema,
} from "models/user/types";

const stringToBoolean = z.string().transform((val) => val === "true");

export const RequestSchema = zodInsertSchema
	.pick({
		email: true,
		password: true,
	})
	.merge(
		z.object({
			password_confirm: z
				.string()
				.nullable()
				.transform((val) => (val === "undefined" ? undefined : val))
				.optional(),
			sign_up: z
				.union([z.string(), z.boolean()])
				.optional()
				.transform((val) => (typeof val === "string" ? val === "true" : val)),
		}),
	);

export const ResponseSchema = z.object({ token: z.string() });

extendZodWithOpenApi(z);

const c = initContract();

export const contract = c.router({
	confirmAuth: {
		method: "POST",
		path: "/api/auth",
		responses: {
			201: ResponseSchema.openapi({
				title: "User",
				description: "A user schema",
			}),
		},
		body: RequestSchema,
		summary: "Confirm auth ts-rests",
	},
});
