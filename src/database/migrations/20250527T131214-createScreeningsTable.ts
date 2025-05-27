import { Kysely, SqliteDatabase } from 'kysely'

export const timestamp = new Date('2025-05-27T13:12:14Z')

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('screenings')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('movie_id', 'integer', (c) =>
      c.notNull().references('movies.id').onDelete('cascade')
    )
    .addColumn('date', 'integer', (c) => c.notNull())
    .addColumn('seats', 'integer', (c) => c.notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('screenings').execute()
}
