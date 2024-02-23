// *** View ........... 見た目
// *** clientLoader ... GET, clientAction後に実行される
// *** clientAction ... formでのPOST/PUT/DELETE時に実行される
// *** Viewがない場合はAPIエンドポイントとして動作する
// *** Loader/Actionはなるべく簡潔にしViewに注力する

import { MetaFunction, Form, Link, redirect, useLoaderData,
         type ClientLoaderFunctionArgs, type ClientActionFunctionArgs } from "@remix-run/react";

// *** Viewで使うコンポーネント
import { PostForm } from "./form";
import { PostList } from "./postList";

// *** loaderやactionで使うAPIエンドポイント
// *** hono RPCを経由してアクセス
import { hc } from 'hono/client'
import { listApi } from "@server/api/posts/list";
import { createApi } from "@server/api/posts/create";

// *** charSetやviewportなどmetaタグの内容を設定する
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
  ];
};

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  console.log("=== clientLoader at routes/_index ===");
  console.log("request", request);
  // hono RPCモードに対しAPIリクエストを送信
  const listRPC = hc<typeof listApi>('/api/');
  // rpc.【path】.$【method】
  const response = await listRPC.posts.$get();
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`clientLoader failed ${response.status} ${response.statusText}`);
  }
  return data;
}

export default function View() {
  const data = useLoaderData<typeof clientLoader>();
  return (
    <div>
      <div className="flex flex-row items-center">
        <PostForm />
        <div className="ml-4"> {/* 隙間を入れるためにmargin-leftを追加 */}
          <PostList posts={data} />
        </div>
      </div>

    </div>
  );
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  // フォームの入力値をjson形式に変換し、必要な型にキャストする
  const formData = await request.formData();
  const title = formData.get('title');
  const content = formData.get('content');

  // TODO: Formの実装によっては簡潔にできないか？
  // titleとcontentがstring型であることを確認
  if (typeof title !== 'string' || typeof content !== 'string') {
    throw new Error('Form data is invalid');
  }

  const jsonBody = { title, content };

  // hono RPCモードに対しAPIリクエストを送信
  const createRPC = hc<typeof createApi>('/api/');
  // rpc.【path】.$【method】 formの場合はform:が必要
  const response = await createRPC.posts.$post({ form: jsonBody });

  if (!response.ok) {
    throw new Error(`clientAction failed ${response.status} ${response.statusText}`);
  }
  return redirect(`./`);
}