import { z } from 'zod';
import { BasePageSchema } from './basePage';
import { PortableTextBlockSchema } from '@/src/schemas';
import { ImageObjectSchema } from './imageObject';

export const NewsPageSchema = BasePageSchema.merge(
    z.object({
        featuredImage: ImageObjectSchema,
        excerpt: z.array(PortableTextBlockSchema),
    })
);

export type NewsPageSchemaType = z.infer<typeof NewsPageSchema>;