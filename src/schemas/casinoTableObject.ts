import { z } from 'zod'
import { ToplistSchema } from './toplist'

export const CasinoTableObjectSchema = z.object({
  _type: z.literal('casino-table-object'),
  _key: z.string(),
  toplist: ToplistSchema
})

export type CasinoTableObjectSchemaType = z.infer<typeof CasinoTableObjectSchema>
