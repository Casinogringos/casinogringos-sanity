import { z } from 'zod'

const AffLinkSchema = z.object({
    link: z.string(),
    slug: z.object({
        current: z.string(),
    }),
})

export type AffLinkSchemaType = z.infer<typeof AffLinkSchema>

export default AffLinkSchema
