import Repository from "models/post/repository";
import { zodInsertSchema, zodSelectSchema } from "models/post/types";

import { contract } from "models/contracts/post";
import { initServer } from "ts-rest-hono";

// *** リクエスト・レスポンスの型はここに記述
// *** omit: 一部のプロパティを省略した新しい型を生成
// *** pick: 一部のプロパティを抽出した新しい型を生成

export const requestSchema = zodInsertSchema.pick({
	title: true,
	content: true,
});

export const ResponseSchema = zodSelectSchema;

// *** MEMO: リクエストがRequestSchemaに沿っていない場合、実行されるよりも前にエラーになる

const s = initServer();
export const router = s.router(contract, {
	createPost: async ({ body: requestSchema }) => {
		console.log("=== createPost ===");
		const repository = new Repository();
		const validatedBody = zodInsertSchema.parse(requestSchema);
		const newRecord = await repository.create(validatedBody);
		// const responseBody = zodSelectSchema.parse(newRecord);
		return {
			status: 201,
			body: newRecord,
		};
	},
});
