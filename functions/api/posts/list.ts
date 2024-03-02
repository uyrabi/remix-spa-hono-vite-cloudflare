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


export const listRouting = createRoute({
	  method: 'get',
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
	})
	
export const listHandler = async (c) => {
	const apiRepository = await new Repository();
	const postList = await apiRepository.all();

	return c.json({
		status: 201,
		body: postList,
	});
};