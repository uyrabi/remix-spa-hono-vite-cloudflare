// // ファイル名をindex.tsとしておくと、import exportで以下のようにできる
// // 例) import { userApi } from './routes/users';

// import { OpenAPIHono } from "@hono/zod-openapi";
// import { CreateHandler, CreateRouting } from "./create";
// import { ListHandler, ListRouting } from "./list";

// export const postApi = new OpenAPIHono();

// console.log(" =====  api/posts/index.ts  ===== ");

// // postApi.openapi(CreateRouting, (c) => { return CreateHandler(c) })
// //     .openapi(ListRouting, (c) => { return ListHandler(c) });

// postApi.openapi(ListRouting, (c) => {
// 	return ListHandler(c);
// });
