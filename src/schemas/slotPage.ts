import { z } from 'zod';
import { BasePageSchema } from './basePage';
import { SlotSchema } from './slot';
import { ImageObjectSchema } from './imageObject';
import { PortableTextBlockSchema } from './portableTextBlock';
import { CasinoPagePreviewSchema } from './casinoPagePreview';

export const SlotPageSchema = BasePageSchema.merge(
    z.object({
        excerpt: z.array(PortableTextBlockSchema),
        slot: SlotSchema,
        casinos: z.array(CasinoPagePreviewSchema),
        latestCasinos: z.array(CasinoPagePreviewSchema),
    })
);

export type SlotPageSchemaType = z.infer<typeof SlotPageSchema>;