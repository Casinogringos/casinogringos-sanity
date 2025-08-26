import { z } from 'zod'
import { BasePagePreviewSchema } from './basePagePreview'
import { ImageObjectSchema } from './imageObject'

export const GuidePagePreviewSchema = BasePagePreviewSchema

export type GuidePagePreviewSchemaType = z.infer<typeof GuidePagePreviewSchema>
