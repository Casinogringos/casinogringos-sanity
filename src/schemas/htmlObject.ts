import { z } from 'zod'

const HTMLObjectSchema = z.object({
    _type: z.literal('old-table-object'),
    _key: z.string(),
    renderedHtml: z.string(),
})

export type HTMLObjectSchemaType = z.infer<typeof HTMLObjectSchema>

export { HTMLObjectSchema }
