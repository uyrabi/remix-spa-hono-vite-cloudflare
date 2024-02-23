import { OpenAPIHono } from '@hono/zod-openapi';
import { z, createRoute } from '@hono/zod-openapi';
import Repository from 'models/post/repository';
import { zodSelectSchema, zodInsertSchema, SelectType, InsertType } from "models/post/types";

export const app = new OpenAPIHono();

// *** リクエスト・レスポンスの型はここに記述
// *** omit: 一部のプロパティを省略した新しい型を生成
// *** pick: 一部のプロパティを抽出した新しい型を生成

export const RequestSchema = null;

export const ResponseSchema = z.array(zodSelectSchema);

// *** Handler ... APIのロジック部分
// *** Routing ... APIのルーティング部分

export const ListHandler = async (c) => {
  console.log('postListHandler start! ...');
  const apiRepository = await new Repository(c);
  return c.json(await apiRepository.all());
};

export const ListRouting = createRoute({
  method: 'get',
  path: '/posts',
  request: {
    params: RequestSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ResponseSchema,
        },
      },
      description: 'postの一覧の取得に成功',
    },
    otherError: {
      description: '404や500など共通のエラーは別所に記載',
    },
  },
})

// *** rpcモードで使えるようにする
export const listApi = app.openapi(ListRouting, ListHandler);