// // ファイル名をindex.tsとしておくと、import exportで以下のようにできる
// // 例) import { userApi } from './routes/users';
import { Hono } from "hono";

export const api = new Hono();

import { contract } from "functions/api/posts/contract";
import { createHonoEndpoints } from "ts-rest-hono";
import { router as createRouter } from "./create";
import { router as listRouter } from "./list";

createHonoEndpoints(contract, createRouter, api);
createHonoEndpoints(contract, listRouter, api);
