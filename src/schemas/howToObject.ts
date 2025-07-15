import { z } from 'zod'
import { HowToObject } from '../types/howToObject'
import { HowToStepObjectSchema } from './howToStepObject'

// Create a simple schema for PortableTextBlock since it's from an external library
const PortableTextBlockSchema = z.array(
  z.object({
    _type: z.string().optional(),
    _key: z.string().optional(),
    style: z.string().optional(),
    markDefs: z.array(z.any()).optional(),
    children: z.array(z.any()).optional(),
  })
)

export const HowToObjectSchema = z.object({
  _type: z.literal('how-to-object'),
  _key: z.string(),
  description: PortableTextBlockSchema.optional(),
  steps: z.array(HowToStepObjectSchema),
  unorderedList: z.boolean().default(false),
  hasDuration: z.boolean(),
  days: z.number().optional(),
  hours: z.number().optional(),
  minutes: z.number().optional(),
  seconds: z.number().optional(),
})

export type HowToObjectSchemaType = z.infer<typeof HowToObjectSchema>
