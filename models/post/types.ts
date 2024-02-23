import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "@hono/zod-openapi";
import { table } from './table';

const modelName: string = 'post';

// 型ユーティリティ: Omit, Pick, Partial, Required, Readonly, Record, Exclude, Extract

// ***** 型・バリデーションは下部に記述してある以下をベースに適宜Omit/Pickなどして使用する
// *** zodSelectSchema ... table.tsを元に生成したZodスキーマ
// *** zodInsertSchema ... table.tsを元に生成したZodスキーマ
// *** SelectType      ... Zodスキーマから生成した型
// *** InsertType      ... Zodスキーマから生成した型

// リポジトリ層（DB操作）で使う型をここに定義
export type RepositoryTypes = {
    newValues: () => Promise<Omit<InsertType, 'id'>>;
    create: (params: Omit<InsertType, 'id'>) => Promise<InsertType | null>;
    findById: (id: number) => Promise<SelectType | null>;
    all: () => Promise<SelectType[]>;
}

// サービス層（DB操作以外）で使う型をここに定義
export type ServiceTypes = {
    sample: () => SelectType;
}

// *** 変更しない ここから

// table.ts（テーブル定義）からZod（バリデータ）スキーマを生成
export const zodSelectSchema = createSelectSchema(table);
export const zodInsertSchema = createInsertSchema(table).openapi(modelName);

// z.infer<typeof ZodObject> でZodのスキーマからtypeを取得できる
export type SelectType = z.infer<typeof zodSelectSchema>;
export type InsertType = z.infer<typeof zodInsertSchema>;

// *** 変更しない ここまで-