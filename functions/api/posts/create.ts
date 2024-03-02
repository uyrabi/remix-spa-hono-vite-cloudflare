import Repository from "models/post/repository";

import { createRoute, OpenAPIHono } from '@hono/zod-openapi'

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

export const createRouting = createRoute({
	  method: 'post',
	  path: '/post',
	  responses: {
	    200: {
	      content: {
	        'application/json': {
	          schema: zodSelectSchema,
	        },
	      },
	      description: 'Retrieve the user',
	    },
	  },
	  request: {
		body: {
			content:{
				"application/json": {
					schema: RequestSchema,
					example: RequestSchema
				},
			}
		}

	  },
	})
	
export const createHandler = async (c) => {
	const repository = new Repository();
	const jsonBody = {
		title: 'hogeTitle',
		content: 'fugaContent'
	};
	const validatedBody = zodInsertSchema.parse(jsonBody);
	const newRecord = await repository.create(validatedBody);
	// const responseBody = zodSelectSchema.parse(newRecord);
	return c.json({
		status: 200,
		body: newRecord,
	});
};