import { z } from 'zod';

export const SanityImageSchema = z.object({
  _type: z.string(),
  asset: z.object({
    _ref: z.string(),
  }),
});

export type SanityImageSchemaType = z.infer<typeof SanityImageSchema>;
