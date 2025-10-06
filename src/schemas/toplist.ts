import { z } from 'zod';
import { CasinoPagePreviewSchema } from './casinoPagePreview'
import { PortableTextBlockSchema } from './portableTextBlock';

export const ToplistSchema = z.object({
  title: z.string(),
  description: z.array(PortableTextBlockSchema),
  casinos: z.array(CasinoPagePreviewSchema),
  bonusCategory: z.string(),
});

export type ToplistSchemaType = z.infer<typeof ToplistSchema>;
