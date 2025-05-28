import { z } from 'zod'

const schema = z.object({
  id: z.coerce.number().int().positive(),
  movieId: z.coerce.number().int().positive(),
  date: z.coerce
    .number()
    .int()
    .positive()
    .refine(
      (val) => {
        const now = Math.floor(Date.now() / 1000)
        return val > now
      },
      { message: 'Screening Date must be in the future' }
    ),
  seats: z.coerce.number().int().positive().max(200),
})

const insertable = schema.omit({
  id: true,
})

export const parse = (screening: unknown) => schema.parse(screening)
export const parseInsertable = (screening: unknown) =>
  insertable.parse(screening)
