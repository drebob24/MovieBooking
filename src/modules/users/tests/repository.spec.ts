import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import buildRepository from '../repository'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createUsers = createFor(db, 'users')

afterAll(() => db.destroy())

afterEach(async () => {
  await db.deleteFrom('users').execute()
})

describe('createNew', async () => {
  it('should create a new record in the users table', async () => {
    const user = {
      username: 'JoeMovie',
      password: 'password123',
    }

    const newUser = await repository.createNew(user)
    expect(newUser).toEqual({
      id: expect.any(Number),
      ...user,
    })
  })

  it('should reject duplicate usernames', async () => {
    const user = {
      username: 'JoeMovie',
      password: 'password123',
    }
    const user2 = {
      username: 'JoeMovie',
      password: 'password123',
    }
    await repository.createNew(user)

    expect(repository.createNew(user2)).rejects.toThrow()
  })
})

describe('findAll', () => {
  it('should return a list of all users', async () => {
    await createUsers([
      {
        id: 1,
        username: 'JoeMovie',
        password: 'password123',
      },
      {
        id: 2,
        username: 'Bob123',
        password: 'notpassword',
      },
    ])

    const users = await repository.findAll()
    expect(users).toHaveLength(2)

    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ username: 'JoeMovie' }),
        expect.objectContaining({ username: 'Bob123' }),
      ])
    )
  })
})

describe('findByIds', () => {
  it('should return a list of queried ids', async () => {
    await createUsers([
      {
        id: 1,
        username: 'JoeMovie',
        password: 'password123',
      },
      {
        id: 2,
        username: 'Bob123',
        password: 'notpassword',
      },
      {
        id: 3,
        username: 'JustKeanu',
        password: 'sadKeanu12',
      },
    ])

    const users = await repository.findByIds([1, 3])

    expect(users).toHaveLength(2)
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, username: 'JoeMovie' }),
        expect.objectContaining({ id: 3, username: 'JustKeanu' }),
      ])
    )
  })
})

describe('deleteUser', () => {
  it('should delete User with provided ID', async () => {
    await createUsers([
      {
        id: 1,
        username: 'JoeMovie',
        password: 'password123',
      },
      {
        id: 2,
        username: 'Bob123',
        password: 'notpassword',
      },
      {
        id: 3,
        username: 'JustKeanu',
        password: 'sadKeanu12',
      },
    ])
    const id = 2

    expect(await repository.findAll()).toHaveLength(3)
    await repository.deleteUser(id)
    expect(await repository.findAll()).toHaveLength(2)
    expect(await repository.findByIds([id])).toEqual([])
  })

  it('should throw an error if provided ID does not exit', async () => {
    await createUsers([
      {
        id: 1,
        username: 'JoeMovie',
        password: 'password123',
      },
      {
        id: 2,
        username: 'Bob123',
        password: 'notpassword',
      },
      {
        id: 3,
        username: 'JustKeanu',
        password: 'sadKeanu12',
      },
    ])
    const id = 999

    await expect(repository.deleteUser(id)).rejects.toThrowError()
  })
})

// describe('findByMovieIds', () => {
//   it('should return a list of screenings with the queries movie ids', async () => {
//     await fillMovies(db)
//     await fillScreenings(db)

//     const screenings = await repository.findByMovieIds([10])

//     expect(
//       screenings.every((screening) => screening.title === 'Wall-E')
//     ).toBeTruthy()
//     expect(screenings).toHaveLength(4)
//   })
// })
