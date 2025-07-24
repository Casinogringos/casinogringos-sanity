import { z } from 'zod'

export const SanityImageSchema = z.object({
  alt: z.string(),
  src: z.string(),
})

export type SanityImageSchemaType = z.infer<typeof SanityImageSchema>
