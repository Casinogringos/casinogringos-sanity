import { z } from 'zod';
import { FAQSchema, BasePageSchema, ToplistSchema } from '@/src/schemas';

export const SubPageSchema = BasePageSchema.merge(
    z.object({
        faqs: FAQSchema.optional(),
        toplist: ToplistSchema.optional(),
    })
);

export type SubPageSchemaType = z.infer<typeof SubPageSchema>;
