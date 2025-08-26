import { z } from 'zod';
import { BasePageSchema } from './basePage';
import { SlotSchema } from './slot';
import { ImageObjectSchema } from './imageObject';
import { PortableTextBlockSchema } from './portableTextBlock';

export const SlotPageSchema = BasePageSchema.merge(
    z.object({
        excerpt: z.array(PortableTextBlockSchema),
        slot: SlotSchema,
    })
);

export type SlotPageSchemaType = z.infer<typeof SlotPageSchema>;