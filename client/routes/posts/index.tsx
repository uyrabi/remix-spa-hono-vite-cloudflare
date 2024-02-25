// *** View ........... 見た目
// *** clientLoader ... GET, clientAction後に実行される
// *** clientAction ... formでのPOST/PUT/DELETE時に実行される
// *** Viewがない場合はAPIエンドポイントとして動作する
// *** Loader/Actionはなるべく簡潔にしViewに注力する

import {
	type ClientActionFunctionArgs,
	type ClientLoaderFunctionArgs,
	Form,
	Link,
	MetaFunction,
	redirect,
	useLoaderData,
} from "@remix-run/react";

// *** Viewで使うコンポーネント
import { PostForm } from "./form";
import { PostList } from "./postList";

import { createApi } from "@server/api/posts/create";
import { listApi } from "@server/api/posts/list";
// *** loaderやactionで使うAPIエンドポイント
// *** hono RPCを経由してアクセス
import { hc } from "hono/client";

import { ServerInferRequest, initClient } from "@ts-rest/core";
import { contract } from "models/contracts/post";

const client = initClient(contract, {
	baseUrl: "/",
	baseHeaders: {},
});

// *** charSetやviewportなどmetaタグの内容を設定する
export const meta: MetaFunction = () => {
	return [{ title: "New Remix App" }];
};

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
	console.log("=== clientLoader at routes/_index ===");
	console.log("request", request);

	const response = await client.listPost();

	console.table(response);

	if (response.status === 201) {
		// body is Post
		console.log(response.body);
	} else {
		// body is unknown
		console.log(response.body);
	}

	return response.body;
}

export default function View() {
	const data = useLoaderData<typeof clientLoader>();
	return (
		<div>
			<div className="flex flex-row items-center">
				<PostForm />
				<div className="ml-4">
					{" "}
					{/* 隙間を入れるためにmargin-leftを追加 */}
					<PostList posts={data} />
				</div>
			</div>
		</div>
	);
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
	console.log("--- clientAction ---");
	try {
		const formData = await request.formData();
		const requestSchema = contract.createPost.body;
		const formDataToJson = Object.fromEntries(formData.entries());
		// フォームの入力値をRequestのzodスキーマにキャストする（zodスキーマに沿っていないとエラーになる）
		const jsonBody = requestSchema.parse(formDataToJson);

		const response = await client.createPost({
			body: jsonBody,
		});

		console.table(response);

		if (response.status === 201) {
			// body is Post
			console.log(response.body);
		} else {
			// body is unknown
			throw new Error(`response.status: ${response.status}`);
		}
	} catch (e) {
		console.error("clientAction e:", e);
	}
	return redirect(`./`);
}
