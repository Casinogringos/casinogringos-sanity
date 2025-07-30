import { z } from "zod";

export const SlotThemeSchema = z.object({
    name: z.string(),
    slug: z.object({
        current: z.string(),
    }),
})

export type SlotThemeSchemaType = z.infer<typeof SlotThemeSchema>
