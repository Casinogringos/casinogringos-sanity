import { z } from 'zod';
import { TableObject } from '../types/tableObject';

export const TableObjectSchema = z.object({
  _type: z.literal('table-object'),
  _key: z.string(),
});

export type TableObjectSchemaType = z.infer<typeof TableObjectSchema>;
