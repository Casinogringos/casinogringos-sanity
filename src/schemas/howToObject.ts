import { z } from 'zod'
import { HowToStepObjectSchema } from './howToStepObject'
import { PortableTextBlockSchema } from './portableTextBlock'

export const HowToObjectSchema = z.object({
  _type: z.literal('how-to-object'),
  _key: z.string(),
  description: z.array(PortableTextBlockSchema),
  steps: z.array(HowToStepObjectSchema),
  unorderedList: z.boolean().default(false),
  hasDuration: z.boolean(),
  days: z.number().optional(),
  hours: z.number().optional(),
  minutes: z.number().optional(),
  seconds: z.number().optional(),
})

export type HowToObjectSchemaType = z.infer<typeof HowToObjectSchema>
