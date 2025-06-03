import type { Insertable } from 'kysely'
import type { Database, Users } from '@/database'

type Row = Users
type RowWithoutId = Omit<Row, 'id'>
type RowInsert = Insertable<RowWithoutId>

export default (db: Database) => ({
  createNew: (user: RowInsert) =>
    db.insertInto('users').values(user).returningAll().executeTakeFirst(),

  findAll: () => db.selectFrom('users').selectAll().execute(),

  findByIds: (ids: number[]) =>
    db.selectFrom('users').selectAll().where('users.id', 'in', ids).execute(),

  deleteUser: async (id: number) => {
    const result = await db
      .deleteFrom('users')
      .where('users.id', '=', id)
      .execute()

    // Check if a row was actually deleted
    if (result[0]?.numDeletedRows === 0n) {
      throw new Error(`User with ID ${id} not found`)
    }

    return result
  },
})
