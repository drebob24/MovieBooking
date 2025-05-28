import type { Insertable } from 'kysely'
import type { Database, Screenings } from '@/database'

type Row = Screenings
type RowWithoutId = Omit<Row, 'id'>
type RowInsert = Insertable<RowWithoutId>

export default (db: Database) => ({
  createNew: (screening: RowInsert) =>
    db
      .insertInto('screenings')
      .values(screening)
      .returningAll()
      .executeTakeFirst(),
})
