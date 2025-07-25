import { z } from 'zod';

export const OldTableObjectSchema = z.object({
  _type: z.literal('old-table-object'),
  _key: z.string(),
  html: z.string(),
});

export type OldTableObjectSchemaType = z.infer<typeof OldTableObjectSchema>;
