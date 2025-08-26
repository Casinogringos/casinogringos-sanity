import { z } from 'zod';
import { BasePagePreviewSchema } from './basePagePreview';
import { FAQSchema } from './faq';
import { ToplistSchema } from './toplist';

export const SubPagePreviewSchema = BasePagePreviewSchema.merge(
    z.object({
        faqs: FAQSchema.optional(),
        toplist: ToplistSchema.optional(),
    })
);

export type SubPagePreviewSchemaType = z.infer<typeof SubPagePreviewSchema>;
