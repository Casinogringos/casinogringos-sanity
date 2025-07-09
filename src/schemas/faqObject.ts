import { z } from 'zod';
import { FAQObject } from '../types/faqObject';
import { FaqItemObjectSchema } from './faqItemObject';
import { PortableTextBlockSchema } from './portableTextBlock';

export const FAQObjectSchema = z.object({
  _type: z.literal('faq-object'),
  _key: z.string(),
  description: PortableTextBlockSchema,
  items: z.array(FaqItemObjectSchema),
});

export type FAQObjectSchemaType = z.infer<typeof FAQObjectSchema>;
