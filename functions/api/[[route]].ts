import { OpenAPIHono } from '@hono/zod-openapi'
import { handle } from 'hono/cloudflare-pages'
import { logger } from 'hono/logger'

import ConnectionManager from "models/db/connection";

type Bindings = {
  PS_HOST: string
  PS_USER: string
  PS_PASSWORD: string
}

const app = new OpenAPIHono< {Bindings: Bindings} >();
console.log("Hi Hono!");

app.use(logger())

app.use('/api/*', async (c, next) => { 
  await ConnectionManager.getConnection(c)
  await next();
});

app.get('/api', (c) => {
  return c.json({
    message: 'Hello Hono!!',
  })
})

import { postApi } from "./posts";

app.route("/api/", postApi);

export const onRequest = handle(app)