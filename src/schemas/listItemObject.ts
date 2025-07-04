import { z } from 'zod';
import { ListItemObject } from '../types/listItemObject';

export const ListItemObjectSchema = z.object({
  _type: z.literal('list-item-object'),
  _key: z.string(),
  message: z.string(),
  content: z.lazy(() => {
    // Import here to avoid circular dependency
    const { ModularContentSchema } = require('./modularContent');
    return ModularContentSchema;
  }),
});

export type ListItemObjectSchemaType = z.infer<typeof ListItemObjectSchema>;
