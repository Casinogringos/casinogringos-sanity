import { z } from 'zod';
import { ParagraphObject } from '../types/paragraphObject';
import { PortableTextBlockSchema } from './portableTextBlock';

export const ParagraphObjectSchema = z.object({
  _type: z.literal('paragraph-object'),
  _key: z.string(),
  message: z.string(),
  className: z.string(),
  content: z.array(PortableTextBlockSchema),
});

export type ParagraphObjectSchemaType = z.infer<typeof ParagraphObjectSchema>;
