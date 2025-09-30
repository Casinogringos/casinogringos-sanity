import { z } from 'zod'
import { AffiliateButtonObjectSchema } from './affiliateButtonObject'
import { BonusObjectSchema } from './bonusObject'
import { ButtonsObjectSchema } from './buttonsObject'
import { CasinoObjectSchema } from './casinoObject'
import { GroupObjectSchema } from './groupObject'
import { HeadingObjectSchema } from '@/src/schemas/headingObject'
import { ImageObjectSchema } from './imageObject'
import { ListObjectSchema } from './listObject'
import { ParagraphObjectSchema } from './paragraphObject'
import { ProsAndConsObjectSchema } from './prosAndConsObject'
import { QuoteObjectSchema } from './quoteObject'
import { RatingObjectSchema } from './ratingObject'
import { ToggleObjectSchema } from './toggleObject'

export const ColumnObjectSchema = z.object({
  _type: z.literal('column-object'),
  _key: z.string(),
  width: z.string().optional(),
  className: z.string().optional(),
  backgroundColor: z.enum(['grey', 'blueLight', 'white']).optional(),
  column: z.array(
    z.discriminatedUnion('_type', [
      AffiliateButtonObjectSchema,
      BonusObjectSchema,
      ButtonsObjectSchema,
      CasinoObjectSchema,
      GroupObjectSchema,
      HeadingObjectSchema,
      ImageObjectSchema,
      ListObjectSchema,
      ParagraphObjectSchema,
      ProsAndConsObjectSchema,
      QuoteObjectSchema,
      RatingObjectSchema,
      ToggleObjectSchema,
    ])
  ),
})

export type ColumnObjectSchemaType = z.infer<typeof ColumnObjectSchema>
