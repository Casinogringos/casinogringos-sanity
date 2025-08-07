import { z } from 'zod';
import { FreeSpins } from '../types/freeSpins';
import { FreeSpinsTypeSchema } from './freeSpinsType';
import { GameSchema } from './game';
import { PaymentMethodSchema } from './paymentMethod';

export const FreeSpinsSchema = z.object({
  _type: z.literal('free-spins'),
  name: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  freeSpinsType: FreeSpinsTypeSchema,
  minimumDeposit: z.number(),
  numberOfFreeSpins: z.number(),
  eligibleGames: z.array(GameSchema),
  valuePerSpin: z.number(),
  maxWinLimit: z.number(),
  totalValue: z.number(),
  wageringRequirements: z.number(),
  validityPeriod: z.number(),
  excludedPaymentMethods: z.array(PaymentMethodSchema),
  _createdAt: z.string(),
  _updatedAt: z.string(),
});

export type FreeSpinsSchemaType = z.infer<typeof FreeSpinsSchema>;
