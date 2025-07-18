import { z } from 'zod'

export const BonusTypeSchema = z.object({
  _type: z.literal('bonus-types'),
  name: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  _createdAt: z.string(),
  _updatedAt: z.string(),
})

export type BonusTypeSchemaType = z.infer<typeof BonusTypeSchema>
