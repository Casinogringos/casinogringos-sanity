import { z } from 'zod';
import { GroupObject } from '../types/groupObject';
import { ParagraphObjectSchema } from './paragraphObject';
import { HeadingObjectSchema } from './headingObject';
import { ImageObjectSchema } from './imageObject';
import { ColumnsObjectSchema } from './columnsObject';
import { HowToObjectSchema } from './howToObject';
import { FAQObjectSchema } from './faqObject';
import { CasinoObjectSchema } from './casinoObject';
import { BonusObjectSchema } from './bonusObject';
import { ProsAndConsObjectSchema } from './prosAndConsObject';

export const GroupObjectSchema = z.object({
  _type: z.literal('group-object'),
  _key: z.string(),
  variant: z.literal('success'),
  // In the TypeScript type, content is defined as a tuple,
  // but for validation purposes we'll use an array of the various possible types
  content: z.array(
    z.union([
      ParagraphObjectSchema,
      HeadingObjectSchema,
      ImageObjectSchema,
      ColumnsObjectSchema,
      HowToObjectSchema,
      FAQObjectSchema,
      CasinoObjectSchema,
      BonusObjectSchema,
      ProsAndConsObjectSchema,
    ])
  ),
});

export type GroupObjectSchemaType = z.infer<typeof GroupObjectSchema>;
