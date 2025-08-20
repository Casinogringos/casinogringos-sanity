import { z } from 'zod';
import { PaymentMethodSchema } from './paymentMethod';

export const PaymentMethodPageSchema = z.object({
    paymentMethod: PaymentMethodSchema,
    linkedPage: z.object({
        _type: z.string(),
        _id: z.string(),
        _key: z.string(),
        title: z.string(),
        slug: z.object({
            _type: z.literal('slug'),
            current: z.string(),
        }),
    })
})

export type PaymentMethodPageSchemaType = z.infer<typeof PaymentMethodPageSchema>;
