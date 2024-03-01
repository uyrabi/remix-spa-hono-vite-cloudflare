// // ファイル名をindex.tsとしておくと、import exportで以下のようにできる
// // 例) import { userApi } from './routes/users';
import { Hono } from "hono";

export const api = new Hono();

import { contract } from "models/contracts/auth";
import { createHonoEndpoints } from "ts-rest-hono";
import { router as createRouter } from "./confirm";

createHonoEndpoints(contract, createRouter, api);
