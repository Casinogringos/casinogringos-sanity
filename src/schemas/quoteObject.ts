import { z } from 'zod'
import { PortableTextBlockSchema } from '@/src/schemas/portableTextBlock'

// Create a simple schema for PortableTextBlock since it's from an external library
// const PortableTextBlockSchema = z.object({
//   _type: z.string().optional(),
//   _key: z.string().optional(),
//   style: z.string().optional(),
//   markDefs: z.array(z.any()).optional(),
//   children: z.array(z.any()).optional(),
// }).passthrough();

export const QuoteObjectSchema = z.object({
  _type: z.literal('quote-object'),
  _key: z.string(),
  content: z.array(PortableTextBlockSchema),
})

export type QuoteObjectSchemaType = z.infer<typeof QuoteObjectSchema>
