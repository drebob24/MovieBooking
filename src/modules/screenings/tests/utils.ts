import { createFor } from '@tests/utils/records'
import type { Kysely } from 'kysely'
import { DB } from '@/database'

export const tomorrowDate = Math.floor(Date.now() / 1000) + 86400

export async function fillMovies(db: Kysely<DB>): Promise<void> {
  const createMovies = createFor(db, 'movies')

  await createMovies([
    {
      id: 1,
      title: 'Sherlock Holmes',
      year: 2009,
    },
    {
      id: 2,
      title: 'The Matrix',
      year: 1999,
    },
    {
      id: 10,
      title: 'Wall-E',
      year: 2013,
    },
    {
      id: 11,
      title: 'The Avengers',
      year: 2010,
    },
    {
      id: 20,
      title: 'Bruno',
      year: 2023,
    },
  ])
}

export async function fillScreenings(db: Kysely<DB>): Promise<void> {
  const createScreenings = createFor(db, 'screenings')

  await createScreenings([
    { id: 1, date: tomorrowDate, movieId: 1, seats: 100 },
    { id: 2, date: tomorrowDate + 5000, movieId: 20, seats: 200 },
    { id: 3, date: tomorrowDate + 3000, movieId: 2, seats: 50 },
    { id: 4, date: tomorrowDate + 1000, movieId: 10, seats: 50 },
    { id: 5, date: tomorrowDate + 15000, movieId: 11, seats: 200 },
    { id: 6, date: tomorrowDate + 25000, movieId: 20, seats: 100 },
    { id: 7, date: tomorrowDate + 35000, movieId: 2, seats: 100 },
    { id: 8, date: tomorrowDate + 45000, movieId: 10, seats: 150 },
    { id: 9, date: tomorrowDate + 55000, movieId: 11, seats: 150 },
    { id: 10, date: tomorrowDate + 105000, movieId: 20, seats: 50 },
    { id: 11, date: tomorrowDate + 115000, movieId: 2, seats: 200 },
    { id: 12, date: tomorrowDate + 125000, movieId: 10, seats: 200 },
    { id: 13, date: tomorrowDate + 145000, movieId: 11, seats: 100 },
    { id: 14, date: tomorrowDate + 405000, movieId: 20, seats: 50 },
    { id: 15, date: tomorrowDate + 120000, movieId: 2, seats: 50 },
    { id: 16, date: tomorrowDate + 53000, movieId: 10, seats: 150 },
    { id: 17, date: tomorrowDate + 54000, movieId: 11, seats: 200 },
  ])
}
