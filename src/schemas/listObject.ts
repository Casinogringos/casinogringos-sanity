import { z } from 'zod';
import { ListItemObjectSchema } from './listItemObject';
import { ImageObjectSchema } from './imageObject';

export const ListObjectSchema = z.object({
  _type: z.literal('list-object'),
  _key: z.string(),
  numbered: z.boolean(),
  items: z.array(ListItemObjectSchema),
  icon: ImageObjectSchema,
  showIcon: z.boolean()
});

export type ListObjectSchemaType = z.infer<typeof ListObjectSchema>;
