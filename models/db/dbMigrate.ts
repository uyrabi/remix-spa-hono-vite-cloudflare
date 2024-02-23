import { createDBConnection } from "db";

import { migrate } from "drizzle-orm/mysql2/migrator";

export async function dbMigrate(env) {
    const db = createDBConnection(env);
    for (let attempt = 1; attempt <= 30; attempt++) {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待機
            console.log("=====================================")
            console.log(`マイグレーションファイルを実行.. 試行回数: ${attempt}`);
            const migrationResult = await migrate(db, { migrationsFolder: "db/migrations" });

            console.log("completed exec migration.")

            console.log("migrationResult:", migrationResult);
            console.log("=====================================")

            break; // 成功したらループを抜ける
        } catch (error) {
            console.error("=====================================")
            console.error(`DB Init error on attempt ${attempt}:`, error)
            console.error("=====================================")
            if (attempt === 30) {
                console.error("最大試行回数に達しました。マイグレーションに失敗しました。")
                break;
            }
        }
    }
}

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

console.log("process.env:", process.env);

const env = {
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
};


(async () => dbMigrate(env))();
