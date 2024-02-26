// // ファイル名をindex.tsとしておくと、import exportで以下のようにできる
// // 例) import { userApi } from './routes/users';
import { OpenAPIHono } from "@hono/zod-openapi";

export const api = new OpenAPIHono();

import { contract } from "models/contracts/post";
import { createHonoEndpoints } from "ts-rest-hono";
import { router as createRouter } from "./create";
import { router as listRouter } from "./list";

createHonoEndpoints(contract, createRouter, api);
createHonoEndpoints(contract, listRouter, api);
