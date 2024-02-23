import { mysqlTable, varchar, text } from 'drizzle-orm/mysql-core';
import { commonColumns } from '../common/columns';

export const table = mysqlTable('post', {
    ...commonColumns,
    title: varchar('title', { length: 64 }).notNull(),
    content: text('content').notNull(),
});
