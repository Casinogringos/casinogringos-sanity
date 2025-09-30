import { z } from 'zod';
import { AffiliateButtonObjectSchema } from './affiliateButtonObject';
import { AISummaryObjectSchema } from './aiSummaryObject';
import { BonusObjectSchema } from './bonusObject';
import { ButtonsObjectSchema } from './buttonsObject';
import { CasinoObjectSchema } from './casinoObject';
import { FAQObjectSchema } from './faqObject';
import { HeadingObjectSchema } from '@/src/schemas/headingObject';
import { HowToObjectSchema } from './howToObject';
import { ImageObjectSchema } from './imageObject';
import { ListObjectSchema } from './listObject';
import { ParagraphObjectSchema } from './paragraphObject';
import { ProsAndConsObjectSchema } from './prosAndConsObject';
import { QuoteObjectSchema } from './quoteObject';
import { RatingObjectSchema } from './ratingObject';
import { ShortcodeObjectSchema } from './shortcodeObject';
import { OldTableObjectSchema } from './oldTableObject';
import { ToggleObjectSchema } from './toggleObject';

export const GroupObjectSchema = z.object({
  _type: z.literal('group-object'),
  _key: z.string(),
  backgroundColor: z.enum(['gray', 'transparent', 'green', 'red', 'yellow']).optional(),
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
    OldTableObjectSchema,
    ToggleObjectSchema,
  ])
  )
});

export type GroupObjectSchemaType = z.infer<typeof GroupObjectSchema>;
