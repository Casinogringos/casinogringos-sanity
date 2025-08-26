import { z } from 'zod'
import { BasePagePreviewSchema } from './basePagePreview'
import { ImageObjectSchema } from './imageObject'

export const NewsPagePreviewSchema = BasePagePreviewSchema

export type NewsPagePreviewSchemaType = z.infer<typeof NewsPagePreviewSchema>
