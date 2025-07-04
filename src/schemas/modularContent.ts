import { z } from 'zod';
import { AffiliateButtonObjectSchema } from './affiliateButtonObject';
import { AISummaryObjectSchema } from './aiSummaryObject';
import { BonusObjectSchema } from './bonusObject';
import { ButtonsObjectSchema } from './buttonsObject';
import { CasinoObjectSchema } from './casinoObject';
import { FAQObjectSchema } from './faqObject';
import { GroupObjectSchema } from './groupObject';
import { HeadingObjectSchema } from './headingObject';
import { HowToObjectSchema } from './howToObject';
import { ImageObjectSchema } from './imageObject';
import { ListObjectSchema } from './listObject';
import { ParagraphObjectSchema } from './paragraphObject';
import { ProsAndConsObjectSchema } from './prosAndConsObject';
import { QuoteObjectSchema } from './quoteObject';
import { RatingObjectSchema } from './ratingObject';
import { ShortcodeObjectSchema } from './shortcodeObject';
import { TableObjectSchema } from './tableObject';
import { ToggleObjectSchema } from './toggleObject';

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
  // ColumnsObjectSchema references this schema, so we can't include it here
]);

// Simple array of the discriminated union
export const ModularContentSchema = z.array(ModularContentItemSchema);

export type ModularContentSchemaType = z.infer<typeof ModularContentSchema>;
