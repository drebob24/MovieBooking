import { z } from 'zod'

const schema = z.object({
  id: z.coerce.number().int().positive(),
  username: z.string().trim().min(4).max(16).toLowerCase(),
  password: z.string().trim().min(8).max(16),
})

const insertable = schema.omit({
  id: true,
})

export const parse = (screening: unknown) => schema.parse(screening)
export const parseInsertable = (screening: unknown) =>
  insertable.parse(screening)
