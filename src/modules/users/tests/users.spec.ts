import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import createApp from '@/app'

const db = await createTestDatabase()
const app = createApp(db)
const createUsers = createFor(db, 'users')

afterEach(async () => {
  await db.deleteFrom('users').execute()
})

afterAll(() => db.destroy())

async function addUsers(): Promise<void> {
  const users = [
    {
      id: 1,
      username: 'joemovie',
      password: 'password123',
    },
    {
      id: 2,
      username: 'bob123',
      password: 'notpassword',
    },
    {
      id: 3,
      username: 'justkeanu',
      password: 'sadKeanu12',
    },
  ]
  await createUsers(users)
}

describe('GET', () => {
  it('should return all users', async () => {
    await addUsers()

    const response = await supertest(app).get('/users')
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(3)
  })

  it('should return a list of users by their queried ids', async () => {
    await addUsers()

    const response = await supertest(app).get('/users?id=1,3')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([
      {
        id: 1,
        username: 'joemovie',
        password: 'password123',
      },
      {
        id: 3,
        username: 'justkeanu',
        password: 'sadKeanu12',
      },
    ])
  })
})

describe('POST', () => {
  it('should return a 201 "Created" status and returns new entry', async () => {
    const user = {
      username: 'JoeMovie',
      password: 'password123',
    }

    await supertest(app)
      .post('/users')
      .send(user)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(Number),
          username: user.username.toLowerCase(),
          password: user.password,
        })
      })
  })

  it('should fail when username or password is missing', async () => {
    await supertest(app)
      .post('/users')
      .send({ username: 'JoeShmoe', password: ' ' })
      .expect(400)
    await supertest(app)
      .post('/users')
      .send({ username: ' ', password: 'password213' })
      .expect(400)
  })

  it('should fail when username already exists (case insensitive)', async () => {
    await addUsers()

    await supertest(app)
      .post('/users')
      .send({ username: 'justkeaNU', password: 'newPass23' })
      .expect(409)
  })
})

describe('DELETE', () => {
  it('should remove the user with the provided id (users/id)', async () => {
    await addUsers()
    const id = '2'

    const response = await supertest(app).delete(`/users/${id}`)
    expect(response.status).toBe(200)

    const deletedUser = await supertest(app).get('/users?id=2')
    expect(deletedUser.body).toHaveLength(0)
  })

  it('should return a 404 when user id is not found', async () => {
    const id = 999

    const response = await supertest(app).delete(`/users/${id}`)
    expect(response.status).toBe(404)
  })

  it('should return a 400 when user id is invalid format', async () => {
    const id = 'abc'

    const response = await supertest(app).delete(`/users/${id}`)
    expect(response.status).toBe(400)
  })
})
