import { z } from 'zod';
import { ListItemObjectSchema } from './listItemObject';

export const ListObjectSchema = z.object({
  _type: z.literal('list-object'),
  _key: z.string(),
  numbered: z.boolean(),
  items: z.array(ListItemObjectSchema),
});

export type ListObjectSchemaType = z.infer<typeof ListObjectSchema>;
