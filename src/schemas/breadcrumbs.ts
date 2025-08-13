import { z } from "zod"

export const BreadcrumbsSchema = z.array(z.object({
    text: z.string(),
    url: z.string().optional()
}))

export type BreadcrumbsSchemaType = z.infer<typeof BreadcrumbsSchema>
