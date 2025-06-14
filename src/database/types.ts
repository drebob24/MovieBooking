import type { ColumnType } from 'kysely'

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>

export interface Directors {
  movieId: number
  personId: number
}

export interface Movies {
  id: number | null
  title: string
  year: number | null
}

export interface People {
  birth: number | null
  id: number | null
  name: string
}

export interface Ratings {
  movieId: number
  rating: number
  votes: number
}

export interface Reservations {
  id: Generated<number>
  screeningId: number
  tickets: number
  userId: number
}

export interface Screenings {
  date: number
  id: Generated<number>
  movieId: number
  seats: number
}

export interface Stars {
  movieId: number
  personId: number
}

export interface Users {
  id: Generated<number>
  password: string
  username: string
}

export interface DB {
  directors: Directors
  movies: Movies
  people: People
  ratings: Ratings
  reservations: Reservations
  screenings: Screenings
  stars: Stars
  users: Users
}
