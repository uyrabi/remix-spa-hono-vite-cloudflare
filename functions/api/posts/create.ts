import { OpenAPIHono } from "@hono/zod-openapi";
import { createRoute, z } from "@hono/zod-openapi";
import type { Context } from "hono";
import ConnectionManager from "models/db/connection";
import Repository from "models/post/repository";
import {
	InsertType,
	SelectType,
	zodInsertSchema,
	zodSelectSchema,
} from "models/post/types";

export const app = new OpenAPIHono();

// *** リクエスト・レスポンスの型はここに記述
// *** omit: 一部のプロパティを省略した新しい型を生成
// *** pick: 一部のプロパティを抽出した新しい型を生成

export const RequestSchema = zodInsertSchema.pick({
	title: true,
	content: true,
});

export const ResponseSchema = zodSelectSchema;

// *** Handler ... APIのロジック部分
// *** Routing ... APIのルーティング部分
// *** MEMO: リクエストがRequestSchemaに沿っていない場合、Handlerが実行されるよりも前にエラーになる

export const CreateHandler = async (c: Context) => {
	try {
		console.log("postCreateHandler start...");
		const repository = new Repository();
		// バリデーションエラーの場合はparseでエラーが発生しcatchされる
		const validatedBody = zodInsertSchema.parse(await c.req.parseBody()); // formDataの値をRequestSchemaに合うようキャストする
		console.log("validatedBody:", validatedBody);
		const newRecord = await repository.create(validatedBody);
		// console.log("newRecord:", newRecord);
		await new Promise((resolve) => setTimeout(resolve, 3000)); // 3秒待つ
		return c.json(newRecord);
	} catch (e) {
		console.log("catch error:", e);
		return c.json({ error: e });
	}
};

export const CreateRouting = createRoute({
	method: "post",
	path: "/posts",
	// request: {
	// 	body: {
	// 		content: {
	// 			"multipart/form-data": {
	// 				schema: RequestSchema,
	// 			},
	// 		},
	// 	},
	// },
	responses: {
		200: {
			content: {
				"application/json": {
					schema: ResponseSchema,
				},
			},
			description: "postの新規作成に成功",
		},
		otherError: {
			description: "404や500など共通のエラーは別所に記載",
		},
	},
});

// *** rpcモードで使えるようにする
export const createApi = app.openapi(CreateRouting, CreateHandler);
