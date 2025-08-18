import { z } from 'zod';
import { FaqItemObjectSchema } from './faqItemObject';

export const FAQSchema = z.object({
  title: z.string(),
  description: z.string(),
  items: z.array(FaqItemObjectSchema),
});

export type FAQSchemaType = z.infer<typeof FAQSchema>;
