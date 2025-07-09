import { z } from 'zod';
import { ColumnObject } from '../types/columnObject';

export const ColumnObjectSchema = z.object({
  _type: z.literal('column-object'),
  _key: z.string(),
  width: z.string(),
  className: z.string(),
  column: z.lazy(() => {
    // Import here to avoid circular dependency
    const { ModularContentSchema } = require('./modularContent');
    return ModularContentSchema;
  }),
});

export type ColumnObjectSchemaType = z.infer<typeof ColumnObjectSchema>;
