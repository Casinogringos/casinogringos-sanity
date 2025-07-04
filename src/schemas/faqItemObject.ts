import { z } from 'zod';
import { FaqItemObject } from '../types/faqItemObject';
import { PortableTextBlockSchema } from './portableTextBlock';

export const FaqItemObjectSchema = z.object({
  _type: z.literal('faq-item-object'),
  _key: z.string(),
  message: z.string(),
  question: z.string(),
  answer: z.array(PortableTextBlockSchema),
});

export type FaqItemObjectSchemaType = z.infer<typeof FaqItemObjectSchema>;
