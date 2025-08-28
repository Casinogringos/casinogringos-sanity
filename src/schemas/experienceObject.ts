import { z } from 'zod'

export const ExperienceObjectSchema = z.object({
    _type: z.literal('experience-object'),
    _key: z.string(),
    employer: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
})