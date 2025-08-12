import { z } from 'zod';

export const PaymentMethodTypeSchema = z.object({
  _type: z.literal('payment-method-types'),
  _key: z.string(),
  name: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  publishedAt: z.string(),
});

export type PaymentMethodTypeSchemaType = z.infer<typeof PaymentMethodTypeSchema>;
