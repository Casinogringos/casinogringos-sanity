import { z } from 'zod';
import { BasePageSchema } from './basePage';
import { PortableTextBlockSchema, SlotSchema } from '@/src/schemas';
import { ImageObjectSchema } from './imageObject';

export const SlotPageSchema = BasePageSchema.merge(
    z.object({
        featuredImage: ImageObjectSchema,
        excerpt: z.array(PortableTextBlockSchema),
        slot: SlotSchema,
    })
);

export type SlotPageSchemaType = z.infer<typeof SlotPageSchema>;