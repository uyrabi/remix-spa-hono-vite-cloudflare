import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { connect } from '@planetscale/database'

// import { migrate } from "drizzle-orm/mysql2/migrator";

// Cloudflare PagesのFunctionsで環境変数にアクセスするための関数を定義
function getEnvVariable(key, env) {
    if (typeof env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`);
    }
    return env[key];
}

// create the connection
export function createDBConnection(env) {
    const connection = connect({
        host: getEnvVariable('DATABASE_HOST', env),
        username: getEnvVariable('DATABASE_USERNAME', env),
        password: getEnvVariable('DATABASE_PASSWORD', env)
    });

    return drizzle(connection);
}

export async function dbMigrate(env) {
    const db = createDBConnection(env);
    for (let attempt = 1; attempt <= 30; attempt++) {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待機
            console.log("=====================================")
            console.log(`マイグレーションファイルを実行.. 試行回数: ${attempt}`);
            const migrationResult = await migrate(db, { migrationsFolder: "drizzle/migrations" });

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

