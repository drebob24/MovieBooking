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
  it('should a list of all screenings ', async () => {
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
        ...screening,
      },
    ])
  })

  it('should return a max of 10 screenings', async () => {
    await fillMovies(db)
    await fillScreenings(db)

    expect(await repository.findAll()).toHaveLength(10)
  })
})
