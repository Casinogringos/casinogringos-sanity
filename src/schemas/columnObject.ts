import { z } from 'zod'
import { ColumnObject } from '../types/columnObject'
import { AffiliateButtonObjectSchema } from '@/src/schemas/affiliateButtonObject'
import { AISummaryObjectSchema } from '@/src/schemas/aiSummaryObject'
import { BonusObjectSchema } from '@/src/schemas/bonusObject'
import { ButtonsObjectSchema } from '@/src/schemas/buttonsObject'
import { CasinoObjectSchema } from '@/src/schemas/casinoObject'
import { FAQObjectSchema } from '@/src/schemas/faqObject'
import { GroupObjectSchema } from '@/src/schemas/groupObject'
import { HeadingObjectSchema } from '@/src/schemas/headingObject'
import { HowToObjectSchema } from '@/src/schemas/howToObject'
import { ImageObjectSchema } from '@/src/schemas/imageObject'
import { ListObjectSchema } from '@/src/schemas/listObject'
import { ParagraphObjectSchema } from '@/src/schemas/paragraphObject'
import { ProsAndConsObjectSchema } from '@/src/schemas/prosAndConsObject'
import { QuoteObjectSchema } from '@/src/schemas/quoteObject'
import { RatingObjectSchema } from '@/src/schemas/ratingObject'
import { ShortcodeObjectSchema } from '@/src/schemas/shortcodeObject'
import { TableObjectSchema } from '@/src/schemas/tableObject'
import { ToggleObjectSchema } from '@/src/schemas/toggleObject'

export const ColumnObjectSchema = z.object({
  _type: z.literal('column-object'),
  _key: z.string(),
  width: z.string().optional(),
  className: z.string().optional(),
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
