import { z } from 'zod';
import { FaqItemObjectSchema } from './faqItemObject';

export const FAQSchema = z.object({
  items: z.array(FaqItemObjectSchema),
});

export type FAQSchemaType = z.infer<typeof FAQSchema>;
