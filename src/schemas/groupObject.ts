import { z } from 'zod';
import { ModularContentSchema } from './modularContent';

export const GroupObjectSchema = z.object({
  _type: z.literal('group-object'),
  _key: z.string(),
  color: z.literal('blue').optional(),
  content: ModularContentSchema,
});

export type GroupObjectSchemaType = z.infer<typeof GroupObjectSchema>;
