import { z } from 'zod'

export const DashboardImageObjectSchema = z.object({
  _type: z.literal('dashboard-image-object'),
  src: z.string(),
  altText: z.string(),
})

export type DashboardImageObjectSchemaType = z.infer<
  typeof DashboardImageObjectSchema
>
