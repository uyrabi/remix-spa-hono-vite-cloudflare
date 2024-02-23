import type { Config } from "drizzle-kit";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.dev.vars' });

console.log("process.env:", process.env);

const env = {
    DATABASE_HOST: process.env.PS_HOST,
    DATABASE_USERNAME: process.env.PS_USER,
    DATABASE_PASSWORD: process.env.PS_PASSWORD,
};

const uri = `mysql://${env.DATABASE_USERNAME}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOST}:3306/remix-spa-hono-vite?ssl={"rejectUnauthorized":true}`;

export default {
    schema: "./models/**/table.ts",
    out: "./models/db/migrations",
    driver: "mysql2",
    dbCredentials: {
        uri: uri
    },
} satisfies Config;