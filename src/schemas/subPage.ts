import { z } from 'zod';
import { BasePageSchema } from './basePage';
import { FAQSchema } from './faq';
import { ToplistSchema } from './toplist';

export const SubPageSchema = BasePageSchema.merge(
    z.object({
        faqs: FAQSchema.optional(),
        toplistTitle: z.string().optional(),
        toplist: ToplistSchema.optional(),
        bonusCategory: z.array(z.object({ value: z.string() })).optional(),
    })
);

export type SubPageSchemaType = z.infer<typeof SubPageSchema>;
