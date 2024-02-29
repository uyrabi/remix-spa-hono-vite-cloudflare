import { Form } from "@remix-run/react";

import { Button } from "@shadcn/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@shadcn/card";
import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";

import { Switch } from "@shadcn/switch";
import { useState } from "react";

function SignUpOrInSwitch({ isChecked, setChecked }) {
	return (
		<div className="flex items-center space-x-2">
			<Label htmlFor="airplane-mode">
				<CardTitle>ログイン</CardTitle>
			</Label>
			<Switch
				id="airplane-mode"
				checked={isChecked}
				onCheckedChange={setChecked}
			/>
			<Label htmlFor="airplane-mode">
				<CardTitle>新規登録</CardTitle>
			</Label>
		</div>
	);
}

export function SignForm() {
	const [isChecked, setChecked] = useState(false);
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<SignUpOrInSwitch isChecked={isChecked} setChecked={setChecked} />
				<CardDescription>*クリックで切り替え</CardDescription>
			</CardHeader>
			<CardContent>
				<Form method="post" id="post_form">
					<input type="hidden" name="sign_up" value={isChecked.toString()} />
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="title">メールアドレス</Label>
							<Input id="email" name="email" placeholder="email" />
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="title">パスワード</Label>
							<Input id="password" name="password" placeholder="Password" />
						</div>
						{isChecked ? (
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="title">パスワード（確認）</Label>
								<Input
									id="password_confirm"
									name="password_confirm"
									placeholder="Password Confirm"
								/>
							</div>
						) : (
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="title">パスワードリセット</Label>
							</div>
						)}
					</div>
				</Form>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline">Cancel</Button>
				<Button type="submit" form="post_form">
					{isChecked ? "新規登録" : "ログイン"}
				</Button>
			</CardFooter>
		</Card>
	);
}
