import { z } from "zod";

export const SlotFeatureSchema = z.object({
    name: z.string(),
    slug: z.object({
        current: z.string(),
    }),
})

export type SlotFeatureSchemaType = z.infer<typeof SlotFeatureSchema>
