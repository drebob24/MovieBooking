import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import buildRepository from '../repository'
import { fillMovies, fillScreenings, tomorrowDate } from './utils'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createMovies = createFor(db, 'movies')

afterAll(() => db.destroy())

afterEach(async () => {
  await db.deleteFrom('screenings').execute()
  await db.deleteFrom('movies').execute()
})

describe('createNew', async () => {
  await createMovies([
    {
      id: 1,
      title: 'Sherlock Holmes',
      year: 2009,
    },
  ])

  it('should create a new record in the screenings table', async () => {
    const screening = {
      date: Date.now(),
      movieId: 1,
      seats: 150,
    }

    const newScreening = await repository.createNew(screening)
    expect(newScreening).toEqual({
      id: expect.any(Number),
      ...screening,
    })
  })

  it('should reject screening with invalid movieId', async () => {
    const screening = {
      date: Date.now(),
      movieId: 5,
      seats: 150,
    }

    expect(repository.createNew(screening)).rejects.toThrow()
  })
})

describe('findAll', () => {
  it('should a list of all screenings with movie title and year', async () => {
    await createMovies([
      {
        id: 1,
        title: 'Sherlock Holmes',
        year: 2009,
      },
    ])
    const screening = {
      movieId: 1,
      seats: 100,
      date: tomorrowDate,
    }
    repository.createNew(screening)
    expect(await repository.findAll()).toEqual([
      {
        id: expect.any(Number),
        seats: screening.seats,
        date: screening.date,
        title: 'Sherlock Holmes',
        year: 2009,
      },
    ])
  })

  it('should return a max of 10 screenings', async () => {
    await fillMovies(db)
    await fillScreenings(db)

    expect(await repository.findAll()).toHaveLength(10)
  })
})

describe('findByIds', () => {
  it('should return a list of queried ids', async () => {
    await fillMovies(db)
    await fillScreenings(db)

    const screenings = await repository.findByIds([1, 5, 10])

    expect(screenings).toHaveLength(3)
    expect(screenings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1 }),
        expect.objectContaining({ id: 5 }),
        expect.objectContaining({ id: 10 }),
      ])
    )
  })
})

describe('findByMovieIds', () => {
  it('should return a list of screenings with the queries movie ids', async () => {
    await fillMovies(db)
    await fillScreenings(db)

    const screenings = await repository.findByMovieIds([10])

    expect(
      screenings.every((screening) => screening.title === 'Wall-E')
    ).toBeTruthy()
    expect(screenings).toHaveLength(4)
  })
})
