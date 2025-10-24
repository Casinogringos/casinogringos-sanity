import { z } from 'zod';
import { FreeSpinsTypeSchema } from './freeSpinsType';
import { GameSchema } from './game';
import { PaymentMethodSchema } from './paymentMethod';
import { FreeSpinsSchema } from './freeSpins';
import AffLinkSchema from './affLink';

export const FreeSpinsPageSchema = z.object({
  _type: z.literal('free-spins'),
  freeSpinsBonus: FreeSpinsSchema,
  affLink: AffLinkSchema,
});

export type FreeSpinsPageSchemaType = z.infer<typeof FreeSpinsPageSchema>;
