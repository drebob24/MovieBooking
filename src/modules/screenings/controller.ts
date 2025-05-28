import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRespository from './repository'
import * as schema from './schema'

export default (db: Database) => {
  const screenings = buildRespository(db)
  const router = Router()

  router.route('/').post(
    jsonRoute(async (req, res) => {
      const body = schema.parseInsertable(req.body)
      try {
        const result = await screenings.createNew(body)
        return result
      } catch (error) {
        if (error instanceof Error) {
          if (error.message.includes('FOREIGN KEY constraint failed')) {
            return res
              .status(StatusCodes.BAD_REQUEST)
              .json({ error: 'Invalid movieId: Movie does not exist' })
          }
        }

        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: 'Unexpected error' })
      }
    }, StatusCodes.CREATED)
  )

  return router
}
