import { z } from 'zod';
import { CasinoPage } from '../types/casinoPage';
import { BasePageSchema } from './basePage';
import { ModularContentSchema } from './modularContent';

export const CasinoPageSchema = BasePageSchema.extend({
  _type: z.literal('casino-pages'),
  content: ModularContentSchema.optional(),
});

export type CasinoPageSchemaType = z.infer<typeof CasinoPageSchema>;
