import { z } from 'zod';
import { ButtonObjectSchema } from './buttonObject';

export const ButtonsObjectSchema = z.object({
  _type: z.literal('buttons-object'),
  _key: z.string(),
  buttons: z.array(ButtonObjectSchema),
});

export type ButtonsObjectSchemaType = z.infer<typeof ButtonsObjectSchema>;
