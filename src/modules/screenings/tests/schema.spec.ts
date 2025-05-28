import { expect } from 'vitest'
import { parseInsertable } from '../schema'

const tomorrowDate = Math.floor(Date.now() / 1000) + 86400

it('parses a valid screening input', () => {
  const screening = {
    movieId: 1,
    date: tomorrowDate,
    seats: 150,
  }

  expect(parseInsertable(screening)).toEqual(screening)
})

it('throws an error when missing data', () => {
  const screeningWithoutMovie = {
    date: tomorrowDate,
    seats: 150,
  }
  const screeningWithoutDate = {
    movieId: 45,
    seats: 150,
  }
  const screeningWithoutSeats = {
    movieId: 45,
    date: tomorrowDate,
  }

  expect(() => parseInsertable(screeningWithoutMovie)).toThrow(/movieId/i)
  expect(() => parseInsertable(screeningWithoutDate)).toThrow(/date/i)
  expect(() => parseInsertable(screeningWithoutSeats)).toThrow(/seats/i)
})

it('throws an error if there are too many seats (>200)', () => {
  const screening = {
    movieId: 1,
    date: tomorrowDate,
    seats: 300,
  }

  expect(() => parseInsertable(screening)).toThrow(/seats/i)
})

it('throws an error if date not at least 1 day in the future', () => {
  const screeningInPast = {
    movieId: 1,
    date: Math.floor(Date.now() / 1000) - 86400,
    seats: 150,
  }

  expect(() => parseInsertable(screeningInPast)).toThrow(
    /Screening Date must be in the future/
  )
})
