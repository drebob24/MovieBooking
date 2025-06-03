import { Kysely, SqliteDatabase } from 'kysely'

export const timestamp = new Date('2025-06-03T11:02:41Z')

export async function up(db: Kysely<SqliteDatabase>): Promise<void> {
  await db.schema
    .createTable('users')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('username', 'text', (c) => c.notNull().unique())
    .addColumn('password', 'text', (c) => c.notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('users').execute()
}
