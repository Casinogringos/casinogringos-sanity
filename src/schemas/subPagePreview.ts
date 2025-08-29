import { z } from 'zod';
import { BasePagePreviewSchema } from './basePagePreview';
import { FAQSchema } from './faq';
import { ToplistSchema } from './toplist';
import { ImageObjectSchema } from './imageObject';

export const SubPagePreviewSchema = BasePagePreviewSchema.merge(
    z.object({
        _type: z.literal('pages'),
        faqs: FAQSchema.optional(),
        toplist: ToplistSchema.optional(),
    })
);

export type SubPagePreviewSchemaType = z.infer<typeof SubPagePreviewSchema>;
