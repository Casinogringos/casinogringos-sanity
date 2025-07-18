import { z } from 'zod'
import { AffiliateButtonObjectSchema, ColumnsObjectSchema } from '@/src/schemas'
import { AISummaryObjectSchema } from '@/src/schemas'
import { BonusObjectSchema } from '@/src/schemas'
import { ButtonsObjectSchema } from '@/src/schemas'
import { CasinoObjectSchema } from '@/src/schemas'
import { FAQObjectSchema } from '@/src/schemas'
import { GroupObjectSchema } from '@/src/schemas'
import { HeadingObjectSchema } from '@/src/schemas'
import { HowToObjectSchema } from '@/src/schemas'
import { ImageObjectSchema } from '@/src/schemas'
import { ListObjectSchema } from '@/src/schemas'
import { ParagraphObjectSchema } from '@/src/schemas'
import { ProsAndConsObjectSchema } from '@/src/schemas'
import { QuoteObjectSchema } from '@/src/schemas'
import { RatingObjectSchema } from '@/src/schemas'
import { ShortcodeObjectSchema } from '@/src/schemas'
import { TableObjectSchema } from '@/src/schemas'
import { ToggleObjectSchema } from '@/src/schemas'

// This is a discriminated union of all the possible content types
export const ModularContentItemSchema = z.discriminatedUnion('_type', [
  AffiliateButtonObjectSchema,
  AISummaryObjectSchema,
  BonusObjectSchema,
  ButtonsObjectSchema,
  CasinoObjectSchema,
  FAQObjectSchema,
  GroupObjectSchema,
  HeadingObjectSchema,
  HowToObjectSchema,
  ImageObjectSchema,
  ListObjectSchema,
  ParagraphObjectSchema,
  ProsAndConsObjectSchema,
  QuoteObjectSchema,
  RatingObjectSchema,
  ShortcodeObjectSchema,
  TableObjectSchema,
  ToggleObjectSchema,
  ColumnsObjectSchema,
  // ColumnsObjectSchema references this schema, so we can't include it here
])

// Simple array of the discriminated union
export const ModularContentSchema = z.array(ModularContentItemSchema)

export type ModularContentSchemaType = z.infer<typeof ModularContentSchema>

export type ModularContentItemSchemaType = z.infer<
  typeof ModularContentItemSchema
>
