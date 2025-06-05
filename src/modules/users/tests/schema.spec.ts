import { expect } from 'vitest'
import { parseInsertable } from '../schema'

it('parses a valid users input with username lowercased', () => {
  const user = {
    username: 'JoeMovie',
    password: 'password123',
  }

  expect(parseInsertable(user)).toEqual({
    username: user.username.toLowerCase(),
    password: user.password,
  })
})

it('throws an error when missing data', () => {
  const userNoPassword = {
    username: 'JoeMovie',
    password: ' ',
  }

  const userNoUsername = {
    username: ' ',
    password: 'hello123',
  }

  expect(() => parseInsertable(userNoPassword)).toThrow(/password/i)
  expect(() => parseInsertable(userNoUsername)).toThrow(/username/i)
})

it('throws an error if username too short (<4) or too long (>16)', () => {
  const usernameLong = {
    username: 'LooooongUserName1',
    password: 'hello123',
  }
  const usernameShort = {
    username: 'alf',
    password: 'hello123',
  }

  expect(() => parseInsertable(usernameLong)).toThrow(/username/i)
  expect(() => parseInsertable(usernameShort)).toThrow(/username/i)
})

it('throws an error if password too short (<8) or too long (>16)', () => {
  const passwordLong = {
    username: 'LooooongUserName',
    password: 'hello12',
  }
  const passwordShort = {
    username: 'alf1',
    password: 'hello123fillertex',
  }

  expect(() => parseInsertable(passwordLong)).toThrow(/password/i)
  expect(() => parseInsertable(passwordShort)).toThrow(/password/i)
})
