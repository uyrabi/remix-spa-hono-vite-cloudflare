import { eq } from 'drizzle-orm';

import { RepositoryTypes, SelectType, InsertType } from './types';
import { table } from './table';
import { db } from 'db';

class Repository implements RepositoryTypes {
    private static instance: Repository;

    private constructor() { }

    public static getInstance(): Repository {
        if (!Repository.instance) {
            Repository.instance = new Repository();
        }
        return Repository.instance;
    }

    async newValues(): Promise<any> {
        // 新しいレコードのデフォルト値を返す
        const defaults = Object.keys(table).reduce((acc: Partial<InsertType>, key) => {
            // 文字列や数値以外はnullにする
            acc[key] = typeof table[key].default === 'object' ? null : table[key].default;
            return acc;
        }, {});
        return defaults;
    }

    async isPersisted(record: SelectType): Promise<boolean> {
        // DBに保存されているかどうかを判定するためのメソッド
        const dbRecord = await db.select().from(table).where(eq(table.id, record.id));
        return dbRecord.length > 0;
    }

    async findById(id: number): Promise<SelectType | null> {
        // findByIdの実装
        const record = await db.select().from(table).where(eq(table.id, id));
        return record[0];
    }

    async all(): Promise<SelectType[]> {
        // 全てのレコードを取得する
        const records = await db.select().from(table);
        return records;
    }

    async create(params: Omit<InsertType, 'id'>): Promise<InsertType | null> {
        const newRecordResult = await db.insert(table).values(params);
        const newRecordId = newRecordResult[0].insertId;
        return this.findById(newRecordId);
    }
}

export const UserRepository = Repository.getInstance();