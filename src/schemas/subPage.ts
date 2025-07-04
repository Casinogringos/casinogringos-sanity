import { z } from 'zod';
import { BasePageSchema } from './basePage';

export const SubPageSchema = BasePageSchema.merge(
    z.object({
        // Add/override fields specific to SubPageSchema here if needed
        faqs: z.array(z.any()).optional(),
        toplist: z.any().optional(),
    })
);

export type SubPageSchemaType = z.infer<typeof SubPageSchema>;
