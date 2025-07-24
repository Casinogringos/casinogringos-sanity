import { z } from 'zod';
import { CasinoPageSchema } from './casinoPage';
import { PortableTextBlockSchema } from './portableTextBlock';

export const ToplistSchema = z.object({
  title: z.string(),
  description: z.array(PortableTextBlockSchema),
  casinos: z.array(CasinoPageSchema),
});

export type ToplistSchemaType = z.infer<typeof ToplistSchema>;
