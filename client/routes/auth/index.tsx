import type { ClientLoaderFunctionArgs, MetaFunction } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { Link, useLoaderData } from "@remix-run/react";

import { SignForm } from "./SignForm";

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
			<SignForm />
		</div>
	);
}

import { ClientActionFunctionArgs, redirect } from "@remix-run/react";
export async function clientAction({
	params,
	request,
}: ClientActionFunctionArgs) {
	console.log("=== clientAction at / ===");
	return null;
}
