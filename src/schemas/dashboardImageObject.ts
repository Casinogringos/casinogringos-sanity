import { z } from 'zod'
import { DashboardImageObject } from '../types/dashboardImageObject'

export const DashboardImageObjectSchema = z.object({
  _type: z.literal('dashboard-image-object'),
  src: z.string(),
  altText: z.string(),
})

export type DashboardImageObjectSchemaType = z.infer<
  typeof DashboardImageObjectSchema
>
