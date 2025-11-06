import { z } from 'zod'
import { PortableTextBlockSchema } from './portableTextBlock'
import { CasinoSchema } from '@/src/schemas/casino'

export const ToplistSchema = z.object({
  title: z.string(),
  description: z.array(PortableTextBlockSchema),
  casinos: z.array(CasinoSchema),
  bonusCategory: z.string(),
})

export type ToplistSchemaType = z.infer<typeof ToplistSchema>
