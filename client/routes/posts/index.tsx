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

//

import { routes } from "@server/api/posts";
import { hc } from "hono/client";
import type { InferRequestType, InferResponseType } from "hono/client";

type PostType = typeof routes;
const rpc = hc<PostType>("/api");

// *** charSetやviewportなどmetaタグの内容を設定する
export const meta: MetaFunction = () => {
	return [{ title: "New Remix App" }];
};

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
	console.log("=== clientLoader at routes/_index ===");
	console.log("request", request);
	try {
		const response = await rpc.listPost();
		console.table(response);

		if (response.status != 201) {
			throw new Error(`response.status: ${response.status}`);
		}
		return response.body;
	} catch (e) {
		console.error("clientLoader e:", e);
		return redirect("./");
	}
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
		type RequestnType = InferRequestType<typeof rpc.post.$post>;
		type ResponseType = InferResponseType<typeof rpc.post.$post>;
		// formDataからPostJsonTypeに該当するデータを取得

		const response = await rpc.post.$post(jsonBody);

		if (response.status != 201) {
			throw new Error(`response.status: ${response.status}`);
		}
	} catch (e) {
		console.error("clientAction e:", e);
	}
	return redirect(`./`);
}
