import { z } from 'zod';
import { BasePageSchema } from './basePage';

export const GuidePageSchema = BasePageSchema.merge(
    z.object({
        // Add/override fields specific to SubPageSchema here if needed

    })
);

export type GuidePageSchemaType = z.infer<typeof GuidePageSchema>;
