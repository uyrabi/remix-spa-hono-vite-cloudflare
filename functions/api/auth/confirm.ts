import { RequestSchema } from "models/contracts/auth";
import Repository from "models/user/repository";
import { zodInsertSchema, zodSelectSchema } from "models/user/types";

import { contract } from "models/contracts/auth";
import { initServer } from "ts-rest-hono";

import { decode, jwt, sign, verify } from "hono/jwt";

// *** リクエスト・レスポンスの型はここに記述
// *** omit: 一部のプロパティを省略した新しい型を生成
// *** pick: 一部のプロパティを抽出した新しい型を生成

export const ResponseSchema = zodSelectSchema;

// *** MEMO: リクエストがRequestSchemaに沿っていない場合、実行されるよりも前にエラーになる

const s = initServer();
export const router = s.router(contract, {
	confirmAuth: async ({ body: jsonBody }) => {
		console.log("=== confirmAuth ===");
		const repository = new Repository();
		console.log("jsonBody:", jsonBody);
		const validatedBody = zodInsertSchema.parse(jsonBody);
		console.log("validatedBody:", validatedBody);
		const email: string = validatedBody.email;
		const existingUser = await repository.findByEmail(email);
		console.log("existing_user", existingUser);
		const signUp = jsonBody.sign_up;
		if (!existingUser && !signUp) {
			const error = {
				error: "【ログイン】未登録の状態でログインしようとしている",
			};
			console.log(error);
			return {
				status: 400,
				body: error,
			};
		}
		const password = validatedBody.password;
		const passwordConfirm = jsonBody.password_confirm;
		const passwordConfirmed = password === passwordConfirm;
		if (!passwordConfirmed) {
			const error = { error: "【新規登録】password_confirmが一致しない" };
			console.log(error);
			return {
				status: 400,
				body: error,
			};
		}
		if (!existingUser) {
			console.log("=== 【新規登録】未登録なのでuserを登録 ===");
			const newRecord = await repository.create(validatedBody);
		}
		if (existingUser.password != jsonBody.password) {
			const error = { error: "【ログイン】passwordが一致しない" };
			console.log(error);
			return {
				status: 400,
				body: error,
			};
		}
		if (existingUser) {
			console.log("=== 【新規登録】すでに登録済みなのでログインのみ ===");
		}
		const token = await sign(validatedBody, "hogefuga");
		console.log("jwt token:", token);
		return {
			status: 201,
			body: { token: token },
		};
	},
});
