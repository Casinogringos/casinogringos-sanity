import { z } from 'zod';
import { AISummaryObject } from '../types/aiSummaryObject';
import { PortableTextBlockSchema } from './portableTextBlock';

export const AISummaryObjectSchema = z.object({
  _type: z.literal('ai-summary-object'),
  _key: z.string(),
  title: z.string(),
  content: z.array(PortableTextBlockSchema),
});

export type AISummaryObjectSchemaType = z.infer<typeof AISummaryObjectSchema>;
