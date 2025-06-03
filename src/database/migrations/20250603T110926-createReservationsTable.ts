import { Kysely, SqliteDatabase } from 'kysely'

export const timestamp = new Date('2025-06-03T11:09:26Z')

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('reservations')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('screening_id', 'integer', (c) =>
      c.notNull().references('screenings.id').onDelete('cascade')
    )
    .addColumn('user_id', 'integer', (c) =>
      c.notNull().references('users.id').onDelete('cascade')
    )
    .addColumn('tickets', 'integer', (c) => c.notNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('reservations').execute()
}
