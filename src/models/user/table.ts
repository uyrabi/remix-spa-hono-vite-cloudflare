import {
	MySqlTableWithColumns,
	mysqlTable,
	varchar,
} from "drizzle-orm/mysql-core";
import { commonColumns } from "./../common/columns";

export const table = mysqlTable("user", {
	...commonColumns,
	email: varchar("email", { length: 64 }).notNull().unique(),
	password: varchar("password", { length: 16 }).notNull(),
});
