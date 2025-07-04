import { z } from 'zod';
import { HowToStepObject } from '../types/howToStepObject';
import { SanityImageSchema } from './sanityImage';

// Create a simple schema for PortableTextBlock since it's from an external library
const PortableTextBlockSchema = z.object({
  _type: z.string().optional(),
  _key: z.string().optional(),
  style: z.string().optional(),
  markDefs: z.array(z.any()).optional(),
  children: z.array(z.any()).optional(),
}).passthrough();

export const HowToStepObjectSchema = z.object({
  _type: z.literal('how-to-step-object'),
  message: z.string(),
  image: SanityImageSchema,
  title: z.string(),
  description: z.array(PortableTextBlockSchema),
});

export type HowToStepObjectSchemaType = z.infer<typeof HowToStepObjectSchema>;
