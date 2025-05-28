import type { Database } from '@/database'

export default (db: Database) => ({
  createNew: (screening) =>
    db
      .insertInto('screenings')
      .values(screening)
      .returningAll()
      .executeTakeFirst(),
})
