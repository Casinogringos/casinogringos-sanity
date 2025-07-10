import { z } from 'zod';
import {
  AffiliateButtonObjectSchema,
  AISummaryObjectSchema,
  BonusObjectSchema,
  ButtonsObjectSchema,
  CasinoObjectSchema,
  FAQObjectSchema,
  HeadingObjectSchema,
  HowToObjectSchema,
  ImageObjectSchema,
  ListObjectSchema,
  ModularContentSchema,
  ParagraphObjectSchema,
  ProsAndConsObjectSchema,
  QuoteObjectSchema,
  RatingObjectSchema,
  ShortcodeObjectSchema, TableObjectSchema, ToggleObjectSchema,
} from '@/src/schemas'

export const GroupObjectSchema = z.object({
  _type: z.literal('group-object'),
  _key: z.string(),
  color: z.literal('blue').optional(),
  content: z.array(z.discriminatedUnion('_type', [
    AffiliateButtonObjectSchema,
    AISummaryObjectSchema,
    BonusObjectSchema,
    ButtonsObjectSchema,
    CasinoObjectSchema,
    FAQObjectSchema,
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
    // ColumnsObjectSchema references this schema, so we can't include it here
  ])
  )
});

export type GroupObjectSchemaType = z.infer<typeof GroupObjectSchema>;
