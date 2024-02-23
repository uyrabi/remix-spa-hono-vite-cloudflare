import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
// https://remix.run/docs/en/main/future/vite#fix-up-css-imports
import "client/tailwind.css";

import { RootMenu } from "./rootMenu";
import { Header } from "./header";
import { Root } from "postcss";

export default function App() {
  return (
    <html lang="en" className="h-dvh bg-zinc-900 w-screen text-zinc-50">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,viewport-fit=cover"
        />
        <Meta />
        <Links />
      </head>
      <body className="size-full bg-gray-200 overflow-hidden">
        <Header />
        <div className="m-6">
          <RootMenu />
          <main className="overflow-auto bg-white mt-6 rounded-lg min-h-[660px]">
            <h1 className="text-4xl bg-gray-500 text-white font-bold pl-4 pt-2 pb-2">title</h1>
            <div className="m-4">
              <Outlet />
            </div>
          </main>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
