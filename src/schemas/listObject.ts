import { z } from 'zod';
import { ListObject } from '../types/listObject';
import { ListItemObjectSchema } from './listItemObject';

export const ListObjectSchema = z.object({
  _type: z.literal('list-object'),
  _key: z.string(),
  items: z.array(ListItemObjectSchema),
});

export type ListObjectSchemaType = z.infer<typeof ListObjectSchema>;
