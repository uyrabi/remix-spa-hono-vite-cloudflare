import { OpenAPIHono } from '@hono/zod-openapi';
import { z, createRoute } from '@hono/zod-openapi';
import Repository from 'models/post/repository';
import { zodSelectSchema, zodInsertSchema, SelectType, InsertType } from "models/post/types";
import ConnectionManager from 'models/db/connection';

export const app = new OpenAPIHono();

// *** リクエスト・レスポンスの型はここに記述
// *** omit: 一部のプロパティを省略した新しい型を生成
// *** pick: 一部のプロパティを抽出した新しい型を生成

export const RequestSchema = zodInsertSchema.pick(
  { title: true, content: true }
);

export const ResponseSchema = zodSelectSchema;

// *** Handler ... APIのロジック部分
// *** Routing ... APIのルーティング部分

export const CreateHandler = async (c) => {
  console.log('postCreateHandler start...');
  console.log('c.parseBody:', await c.req.parseBody());
  const apiRepository = await new Repository();
  const jsonBody = await c.req.parseBody();
  const newRecord = await apiRepository.create(jsonBody);
  console.log('newRecord:', newRecord);
  return c.json(newRecord);
};

export const CreateRouting = createRoute({
  method: 'post',
  path: '/posts',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: RequestSchema,
        },
      },
    }
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ResponseSchema,
        },
      },
      description: 'postの新規作成に成功',
    },
    otherError: {
      description: '404や500など共通のエラーは別所に記載',
    },
  },
})

// *** rpcモードで使えるようにする
export const createApi = app.openapi(CreateRouting, CreateHandler);
