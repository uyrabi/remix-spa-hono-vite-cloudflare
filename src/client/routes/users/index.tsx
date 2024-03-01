import type { ClientLoaderFunctionArgs, MetaFunction } from "@remix-run/react";
import { useLoaderData, Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function clientLoader({ request, params }: ClientLoaderFunctionArgs) {
  console.log("=== clientLoader at routes/users/_index ===");
  return null;
}

export default function Index() {
  const data = useLoaderData<typeof clientLoader>();
  return (
    <div>
      
      <h1 className="text-purple-500 text-3xl font-bold">
        Welcome to Remix Vite !!
      </h1>
      <label>
        Should persist state across
        <input type="text" placeholder="HMR test" />
      </label>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
            className="text-blue-500"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      <Link to="resources/sample" reloadDocument>
        View as PDF
      </Link>
    </div>
  );
}
