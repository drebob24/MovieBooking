import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import createApp from '@/app'

const db = await createTestDatabase()
const app = createApp(db)
const createMovies = createFor(db, 'movies')
const tomorrowDate = Math.floor(Date.now() / 1000) + 86400

afterEach(async () => {
  await db.deleteFrom('screenings').execute()
  await db.deleteFrom('movies').execute()
})

afterAll(() => db.destroy())

describe('POST', () => {
  it('should return 400 if field missing', async () => {
    const noMovie = {
      date: tomorrowDate,
      seats: 150,
    }

    await supertest(app)
      .post('/screenings')
      .send(noMovie)
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty('error')
      })
  })

  it('should return 400 if field invalid per schema', async () => {
    const invalidMoveId = {
      movieId: 'The Matrix',
      date: tomorrowDate,
      seats: 140,
    }
    const invalidDate = {
      movieId: 1,
      date: tomorrowDate - 200000,
      seats: 140,
    }
    const invalidSeats = {
      movieId: 1,
      date: tomorrowDate,
      seats: 400,
    }

    await supertest(app)
      .post('/screenings')
      .send(invalidMoveId)
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty('error')
      })

    await supertest(app)
      .post('/screenings')
      .send(invalidDate)
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty('error')
      })

    await supertest(app)
      .post('/screenings')
      .send(invalidSeats)
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty('error')
      })
  })

  it('handles a nonexistent movieId value with a 400 error', async () => {
    const invalidMoveId = {
      movieId: 200,
      date: tomorrowDate,
      seats: 140,
    }

    await supertest(app)
      .post('/screenings')
      .send(invalidMoveId)
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toContain('Invalid movieId')
      })
  })

  it('returns a 201 "Created" status and returns new entry', async () => {
    await createMovies([
      {
        id: 5,
        title: 'Sherlock Holmes',
        year: 2009,
      },
    ])
    const screening = {
      movieId: 5,
      seats: 150,
      date: tomorrowDate,
    }

    await supertest(app)
      .post('/screenings')
      .send(screening)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(Number),
          ...screening,
        })
      })
  })
})
