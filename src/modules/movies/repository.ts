import type { Database } from '@/database'

export default (db: Database) => ({
  findAll: async (limit = 10, offset = 0) =>
    db.selectFrom('movies').selectAll().limit(limit).offset(offset).execute(),

  findByIds: async (ids: number[]) =>
    db.selectFrom('movies').selectAll().where('id', 'in', ids).execute(),

  findByTitle: async (titles: string[]) =>
    db.selectFrom('movies').selectAll().where('title', 'in', titles).execute(),
})
