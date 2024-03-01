import type { ClientLoaderFunctionArgs, MetaFunction } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { useLoaderData, Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function clientLoader({ request, params }: ClientLoaderFunctionArgs) {
  console.log("=== clientLoader at routes/_index ===");
  return null;
}

export default function Index() {
  const data = useLoaderData<typeof clientLoader>();
  return (
    <div>
      <Form method="post">
        <button type="submit">test hono rpc is useful.</button>
      </Form>
    </div>
  );
}

import { ClientActionFunctionArgs, redirect } from "@remix-run/react";
import { hc } from 'hono/client'
import { ApiRoute } from "../../server/index";

export async function clientAction({ params, request }: ClientActionFunctionArgs) {
  console.log("=== clientAction at / ===");
  const client = hc<ApiRoute>('/api/trpc/');
  const response = await client.title.$get();
  console.log("trpc response:", await response);
  console.log("trpc response.json():", await response.json());
  return null;
}