import { z } from 'zod';
import { BonusObject } from '../types/bonusObject';
import { CasinoSchema } from './casino';
import { CasinoBonusSchema } from './casinoBonus';
import { FreeSpinsSchema } from './freeSpins';
import { OddsBonusSchema } from './oddsBonus';

export const BonusObjectSchema = z.object({
  _type: z.literal('bonus-object'),
  _key: z.string(),
  casino: CasinoSchema,
  bonus: z.union([CasinoBonusSchema, OddsBonusSchema]),
  freeSpins: FreeSpinsSchema,
  terms: z.string(),
  title: z.string(),
  information: z.array(z.string()),
  buttonText: z.string(),
});

export type BonusObjectSchemaType = z.infer<typeof BonusObjectSchema>;
