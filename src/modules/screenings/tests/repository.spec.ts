import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import buildRepository from '../repository'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createMovies = createFor(db, 'movies')

afterAll(() => db.destroy())

afterEach(async () => {
  // clearing the tested table after each test
  await db.deleteFrom('screenings').execute()
})

describe('createNew', () => {
  it('should create a new record in the screenings table', async () => {
    await createMovies([
      {
        id: 1,
        title: 'Sherlock Holmes',
        year: 2009,
      },
    ])
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
})
