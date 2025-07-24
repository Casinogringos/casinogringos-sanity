import { z } from 'zod'
import { ToplistSchema } from '@/src/schemas'

export const CasinoListObjectSchema = z.object({
  _type: z.literal('casino-list-object'),
  _key: z.string(),
  toplist: ToplistSchema
})

export type CasinoListObjectSchemaType = z.infer<typeof CasinoListObjectSchema>
