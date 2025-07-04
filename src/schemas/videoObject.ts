import { z } from "zod"

export const VideoObjectSchema = z.object({
    title: z.string(),
    description: z.string(),
    thumbnailUrl: z.string(),
    uploadDate: z.string(),
    duration: z.string(),
    contentUrl: z.string(),
    embedUrl: z.string(),
})

export type VideoObjectSchemaType = z.infer<typeof VideoObjectSchema>
