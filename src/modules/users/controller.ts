import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRespository from './repository'
import * as schema from './schema'

export default (db: Database) => {
  const messages = buildRespository(db)
  const router = Router()

  router.get(
    '/',
    jsonRoute(async (req, res) => {
      if (typeof req.query.id !== 'string') {
        const users = await messages.findAll()

        return users
      }

      if (typeof req.query.id === 'string') {
        const ids = req.query.id.split(',').map(Number)
        const users = await messages.findByIds(ids)

        return users
      }

      res.status(StatusCodes.BAD_REQUEST)
      return res.json({ error: 'Unexpected Query' })
    }, StatusCodes.OK)
  )

  router.post(
    '/',
    jsonRoute(async (req, res) => {
      const body = schema.parseInsertable(req.body)
      const [userExists] = await messages.findByUsername(body.username)

      if (userExists) {
        res.status(StatusCodes.CONFLICT)
        return res.json({ error: 'Username already exists' })
      }

      const result = await messages.createNew(body)

      return result
    }, StatusCodes.CREATED)
  )

  router.delete(
    '/:id',
    jsonRoute(async (req, res) => {
      const userId = Number(req.params.id)

      if (Number.isNaN(userId)) {
        res.status(StatusCodes.BAD_REQUEST)
        return res.json({ error: `Invalid User Id ${userId}` })
      }

      const [userExists] = await messages.findByIds([userId])

      if (!userExists) {
        res.status(StatusCodes.NOT_FOUND)
        return res.json({ error: `User ID ${userId} does not exist.` })
      }

      await messages.deleteUser(userId)
      return res.json({ message: `User with ID ${userId} deleted.` })
    }, StatusCodes.OK)
  )

  return router
}
