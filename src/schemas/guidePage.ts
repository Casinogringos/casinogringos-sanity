import { z } from 'zod';
import { BasePageSchema } from './basePage';
import { ImageObjectSchema } from './imageObject';

export const GuidePageSchema = BasePageSchema.merge(
    z.object({
        featuredImage: ImageObjectSchema,
    })
);

export type GuidePageSchemaType = z.infer<typeof GuidePageSchema>;
