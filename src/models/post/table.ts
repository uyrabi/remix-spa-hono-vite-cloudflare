import { mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { commonColumns } from "../common/columns";

export const table = mysqlTable("post", {
	...commonColumns,
	title: varchar("title", { length: 6 }).notNull(),
	content: text("content").notNull(),
});
