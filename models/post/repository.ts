import { eq } from "drizzle-orm";

import { table } from "./table";
import {
	InsertType,
	RepositoryTypes,
	SelectType,
	zodSelectSchema,
} from "./types";

import ConnectionManager from "models/db/connection";

class Repository implements RepositoryTypes {
	private static instance: Repository;

	constructor() {
		console.log("Repository constructor start...");
	}

	public static getInstance(): Repository {
		if (!Repository.instance) {
			Repository.instance = new Repository();
		}
		return Repository.instance;
	}

	async newValues(): Promise<any> {
		// 新しいレコードのデフォルト値を返す
		const defaults = Object.keys(table).reduce(
			(acc: Partial<InsertType>, key) => {
				// 文字列や数値以外はnullにする
				acc[key] =
					typeof table[key].default === "object" ? null : table[key].default;
				return acc;
			},
			{},
		);
		return defaults;
	}

	async isPersisted(record: SelectType): Promise<boolean> {
		// DBに保存されているかどうかを判定するためのメソッド
		const db = await ConnectionManager.getConnection();
		const dbRecord = await db
			.select()
			.from(table)
			.where(eq(table.id, record.id));
		return dbRecord.length > 0;
	}

	async findById(id: number): Promise<typeof zodSelectSchema | null> {
		// findByIdの実装
		const db = await ConnectionManager.getConnection();
		// console.log("repo findbyid db:", db);
		const record = await db.select().from(table).where(eq(table.id, id));
		return record[0];
	}

	async all(): Promise<SelectType[]> {
		// 全てのレコードを取得する
		const db = await ConnectionManager.getConnection();
		// console.log("repo all db:", db);
		const records = await db.select().from(table);
		return records;
	}

	async create(
		params: Omit<InsertType, "id">,
	): Promise<typeof zodSelectSchema | null> {
		const db = await ConnectionManager.getConnection();
		// console.log("repo create db:", db);
		const newRecordResult = await db.insert(table).values(params);
		// console.log("newRecordResult:", newRecordResult);
		const newRecordId = newRecordResult.insertId;
		// console.log("newRecordId:", newRecordId);
		return this.findById(newRecordId);
	}
}

export default Repository;
