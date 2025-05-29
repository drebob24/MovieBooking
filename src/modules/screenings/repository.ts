import type { Insertable, Kysely } from 'kysely'
import type { Database, Screenings } from '@/database'
import { DB } from '@/database'

type Row = Screenings
type RowWithoutId = Omit<Row, 'id'>
type RowInsert = Insertable<RowWithoutId>

const getScreeningsQuery = (db: Kysely<DB>) =>
  db
    .selectFrom('screenings')
    .innerJoin('movies', 'movies.id', 'screenings.movieId')
    .select([
      'screenings.id',
      'screenings.date',
      'screenings.seats',
      'movies.title',
      'movies.year',
    ])

export default (db: Database) => ({
  createNew: (screening: RowInsert) =>
    db
      .insertInto('screenings')
      .values(screening)
      .returningAll()
      .executeTakeFirst(),

  findAll: () => getScreeningsQuery(db).limit(10).execute(),

  findByIds: (ids: number[]) =>
    getScreeningsQuery(db).where('screenings.id', 'in', ids).execute(),

  findByMovieIds: (movieIds: number[]) =>
    getScreeningsQuery(db)
      .where('screenings.movieId', 'in', movieIds)
      .execute(),
})
