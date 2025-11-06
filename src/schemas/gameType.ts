import { z } from 'zod'

export const GameTypeSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.object({
    current: z.string(),
  }),
})

export type GameTypeSchemaType = z.infer<typeof GameTypeSchema>
