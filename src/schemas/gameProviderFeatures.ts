import { z } from "zod";

export const GameProviderFeaturesSchema = z.object({
    name: z.string(),
    slug: z.object({
        current: z.string(),
    }),
})

export type GameProviderFeaturesSchemaType = z.infer<typeof GameProviderFeaturesSchema>
