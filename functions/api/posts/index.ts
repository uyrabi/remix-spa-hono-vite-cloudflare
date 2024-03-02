// // ファイル名をindex.tsとしておくと、import exportで以下のようにできる
// // 例) import { userApi } from './routes/users';
import { OpenAPIHono } from '@hono/zod-openapi';
import { listRouting, listHandler } from './list';
import { createRouting, createHandler } from './create';


export const api = new OpenAPIHono();

export const routes = api.openapi(listRouting, (c) => listHandler(c))
                         .openapi(createRouting, (c) => createHandler(c));

// import { contract } from "functions/api/posts/contract";
// import { createHonoEndpoints } from "ts-rest-hono";
// import { router as createRouter } from "./create";
// import { router as listRouter } from "./list";

// createHonoEndpoints(contract, createRouter, api);
// createHonoEndpoints(contract, listRouter, api);


// // ファイル名をindex.tsとしておくと、import exportで以下のようにできる
// // 例) import { userApi } from './routes/users';

// import { OpenAPIHono } from '@hono/zod-openapi';

// import { loginRoute, loginHandler } from './login';
// import { myPageRoute, myPageHandler } from './myPage';

// export const userApi = new OpenAPIHono();

// userApi.openapi(loginRoute, loginHandler);
// userApi.openapi(myPageRoute, myPageHandler);