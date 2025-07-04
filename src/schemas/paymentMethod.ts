import { z } from 'zod';
import { PaymentMethod } from '../types/paymentMethod';
import { DashboardImageObjectSchema } from './dashboardImageObject';
import { PaymentMethodTypeSchema } from './paymentMethodType';

export const PaymentMethodSchema = z.object({
  _type: z.literal('payment-methods'),
  name: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  logo: DashboardImageObjectSchema,
  typeSlug: PaymentMethodTypeSchema,
  supportedTransactionTypes: z.array(z.string()),
  withdrawalTime: z.array(z.number()),
  advantages: z.array(z.string()),
  disadvantages: z.array(z.string()),
  publishedAt: z.string(),
});

export type PaymentMethodSchemaType = z.infer<typeof PaymentMethodSchema>;
