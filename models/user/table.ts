import { mysqlTable, varchar, MySqlTableWithColumns } from 'drizzle-orm/mysql-core';
import { commonColumns } from './../common/columns';

export const table = mysqlTable('user', {
    ...commonColumns,
    email: varchar('email', { length: 64 }).notNull().unique(),
    password: varchar('password', { length: 16 }).notNull(),
    username: varchar('username', { length: 16 }).notNull().unique().default('default man'),
});
