import { z } from 'zod';

export const HeadingObjectSchema = z.object({
  _type: z.literal('heading-object'),
  _key: z.string(),
  text: z.string(),
  className: z.string().optional(),
  anchor: z.string().optional(),
  level: z.number(),
  slug: z.object({
    _type: z.literal('slug'),
    current: z.string(),
  }),
});

export type HeadingObjectSchemaType = z.infer<typeof HeadingObjectSchema>;
