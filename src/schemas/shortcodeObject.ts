import { z } from 'zod';

export const ShortcodeObjectSchema = z.object({
  _type: z.literal('shortcode-object'),
  _key: z.string(),
});

export type ShortcodeObjectSchemaType = z.infer<typeof ShortcodeObjectSchema>;
