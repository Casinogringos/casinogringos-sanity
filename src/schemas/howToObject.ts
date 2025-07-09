import { z } from 'zod';
import { HowToObject } from '../types/howToObject';
import { HowToStepObjectSchema } from './howToStepObject';

// Create a simple schema for PortableTextBlock since it's from an external library
const PortableTextBlockSchema = z.object({
  _type: z.string().optional(),
  _key: z.string().optional(),
  style: z.string().optional(),
  markDefs: z.array(z.any()).optional(),
  children: z.array(z.any()).optional(),
}).passthrough();

export const HowToObjectSchema = z.object({
  _type: z.literal('how-to-object'),
  _key: z.string(),
  description: PortableTextBlockSchema,
  steps: z.array(HowToStepObjectSchema),
  unorderedList: z.boolean(),
  hasDuration: z.boolean(),
  days: z.number(),
  hours: z.number(),
  minutes: z.number(),
  seconds: z.number(),
});

export type HowToObjectSchemaType = z.infer<typeof HowToObjectSchema>;
