import { z } from 'zod';
import { ColumnObjectSchema } from './columnObject';

export const ColumnsObjectSchema = z.object({
  _type: z.literal('columns-object'),
  _key: z.string(),
  columns: z.array(ColumnObjectSchema),
});

export type ColumnsObjectSchemaType = z.infer<typeof ColumnsObjectSchema>;
