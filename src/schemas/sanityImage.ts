import { z } from 'zod'

export const SanityImageSchema = z.object({
  alt: z.string(),
  vanityFileName: z.string(),
  asset: z.object({
    _ref: z.string(),
    metadata: z
      .object({
        dimensions: z.object({
          aspectRatio: z.number(),
          aspectRatioRaw: z.string(),
          height: z.number(),
          width: z.number(),
        }),
        pixelDensities: z.array(z.number()),
        size: z.number(),
      })
      .optional(),
  }),
})

export type SanityImageSchemaType = z.infer<typeof SanityImageSchema>
