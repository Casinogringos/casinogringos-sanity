import { z } from "zod";
import { DashboardImageObjectSchema } from "./dashboardImageObject";
import { GameTypeSchema } from "./gameType";
import { GameProviderFeaturesSchema } from "./gameProviderFeatures";

export const GameProviderSchema = z.object({
    _id: z.string(),
    name: z.string(),
    slug: z.object({
        current: z.string(),
    }),
    _createdAt: z.string(),
    _updatedAt: z.string(),
    featuredImage: DashboardImageObjectSchema,
    yearLaunched: z.number(),
    headquarters: z.string(),
    swedishLicense: z.boolean(),
    typesOfGames: z.array(GameTypeSchema).optional(),
    numberOfGames: z.number(),
    uniqueFeatures: z.array(GameProviderFeaturesSchema).optional(),
    advantages: z.array(z.string()),
    disadvantages: z.array(z.string()),
})

export type GameProviderSchemaType = z.infer<typeof GameProviderSchema>
