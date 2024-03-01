// *** clientLoader ... GET
// *** clientAction ... POST/PUT/DELETE
// *** View ........... 見た目
// *** Viewがない場合はAPIエンドポイントとして動作する
// *** Loader/Actionはなるべく簡潔にしViewに注力する

import type { ClientLoaderFunctionArgs, MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

// *** Viewで使うコンポーネント
import { PostForm } from "./form";
import { PostList } from "./postList";
import { MemberListTable } from "./memberListTable";

// *** hono RPCモードをAPIエンドポイントとして利用
import { hc } from 'hono/client'
import type { listApiRoute } from "server/api/posts/list";
import type { createApiRoute } from "server/api/posts/create";
const listRPC = hc<typeof listApiRoute>('/api/');
const createRPC = hc<typeof createApiRoute>('/api/');

// *** charSetやviewportなどmetaタグの内容を設定する
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
  ];
};

export async function clientLoader({ request, params }: ClientLoaderFunctionArgs) {
  console.log("=== clientLoader at routes/_index ===");
  // hono RPCモードに対しAPIリクエストを送信
  // client.【path】.【method】
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
      <MemberListTable />
    </div>
  );
}

import { ClientActionFunctionArgs, redirect } from "@remix-run/react";

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

  // client.【path】.【method】 formの場合はform:が必要
  const response = await createRPC.posts.$post({ form: jsonBody });

  if (!response.ok) {
    throw new Error(`clientAction failed ${response.status} ${response.statusText}`);
  }
  return redirect(`./`);
}