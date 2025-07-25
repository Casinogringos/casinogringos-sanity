import { z } from 'zod'
import { SanityImageSchema } from './sanityImage'
import { PortableTextBlockSchema } from '@/src/schemas/portableTextBlock'

export const HowToStepObjectSchema = z.object({
  _type: z.literal('how-to-step-object'),
  image: SanityImageSchema.optional(),
  title: z.string(),
  description: z.array(PortableTextBlockSchema).optional(),
})

export type HowToStepObjectSchemaType = z.infer<typeof HowToStepObjectSchema>
