import { z } from 'zod';
import { CasinoSchema } from './casino';
import { DashboardImageObjectSchema } from './dashboardImageObject';
import { GameProviderSchema } from './gameProvider';
import { SlotThemeSchema } from './slotTheme';
import { SlotFeatureSchema } from './slotFeature';

export const SlotSchema = z.object({
    name: z.string(),
    casinos: z.array(CasinoSchema),
    featuredImage: DashboardImageObjectSchema,
    provider: GameProviderSchema,
    launchDate: z.date(),
    slotTheme: SlotThemeSchema,
    rtpRange: z.array(z.number()),
    volatility: z.string(),
    demoUrl: z.string(),
    numberOfPaylines: z.number(),
    clusterPays: z.boolean(),
    scatterPays: z.boolean(),
    reels: z.number(),
    rows: z.number(),
    megaways: z.boolean(),
    buyFeature: z.boolean(),
    jackpot: z.boolean(),
    maxWin: z.number(),
    progressiveJackpot: z.boolean(),
    minBet: z.number(),
    maxBet: z.number(),
    specialFeatures: z.array(SlotFeatureSchema),
    advantages: z.array(z.string()),
    disadvantages: z.array(z.string()),
    rating: z.number(),
})

export type SlotSchemaType = z.infer<typeof SlotSchema>;