import { z } from 'zod';
import { BasePageSchema } from './basePage';
import { FAQSchema } from './faq';
import { ToplistSchema } from './toplist';

export const SubPageSchema = BasePageSchema.merge(
    z.object({
        faqs: FAQSchema.optional(),
        toplist: ToplistSchema.optional(),
    })
);

export type SubPageSchemaType = z.infer<typeof SubPageSchema>;
