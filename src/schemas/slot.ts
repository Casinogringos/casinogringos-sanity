import { z } from 'zod';
import { CasinoSchema } from '@/src/schemas';

export const SlotSchema = z.object({
    casinos: z.array(CasinoSchema),
})

export type SlotSchemaType = z.infer<typeof SlotSchema>;