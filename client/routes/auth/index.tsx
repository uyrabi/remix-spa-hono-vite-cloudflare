import type { ClientLoaderFunctionArgs, MetaFunction } from "@remix-run/react";
import { Form } from "@remix-run/react";
import { Link, useLoaderData } from "@remix-run/react";

import { SignForm } from "./SignForm";

import { initClient } from "@ts-rest/core";
import { contract } from "models/contracts/auth";

const client = initClient(contract, {
	baseUrl: "",
	baseHeaders: {},
});

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

export async function clientAction({ request }: ClientActionFunctionArgs) {
	console.log("--- clientAction ---");
	try {
		const formData = await request.formData();
		const formDataToJson = Object.fromEntries(formData.entries());
		const requestSchema = contract.confirmAuth.body;
		// フォームの入力値をRequestのzodスキーマにキャストする（zodスキーマに沿っていないとエラーになる）
		const jsonBody = requestSchema.parse(formDataToJson);

		const response = await client.confirmAuth({ body: jsonBody });

		if (response.status != 201) {
			throw new Error(`response.status: ${response.status}`);
		}
		// jwtをセット
		console.log("response:", response);
		console.log(response.body.token);
		sessionStorage.setItem("token", response.body.token);
	} catch (e) {
		console.error("clientAction e:", e);
	}
	return redirect(`./`);
}
