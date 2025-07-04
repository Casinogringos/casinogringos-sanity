import { z } from 'zod';
import { ShortcodeObject } from '../types/shortcodeObject';

export const ShortcodeObjectSchema = z.object({
  _type: z.literal('shortcode-object'),
  _key: z.string(),
  message: z.string(),
});

export type ShortcodeObjectSchemaType = z.infer<typeof ShortcodeObjectSchema>;
