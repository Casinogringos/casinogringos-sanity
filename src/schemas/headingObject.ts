import { z } from 'zod';
import { HeadingObject } from '../types/headingObject';

export const HeadingObjectSchema = z.object({
  _type: z.literal('heading-object'),
  _key: z.string(),
  message: z.string(),
  text: z.string(),
  className: z.string(),
  anchor: z.string(),
  level: z.number(),
});

export type HeadingObjectSchemaType = z.infer<typeof HeadingObjectSchema>;
