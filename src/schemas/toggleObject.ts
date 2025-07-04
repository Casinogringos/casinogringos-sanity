import { z } from 'zod';
import { ToggleObject } from '../types/toggleObject';

export const ToggleObjectSchema = z.object({
  _type: z.literal('toggle-object'),
  _key: z.string(),
  message: z.string(),
  buttonTextOpen: z.string(),
  buttonTextClose: z.string(),
  buttonText: z.string(),
  content: z.lazy(() => {
    // Import here to avoid circular dependency
    const { ModularContentSchema } = require('./modularContent');
    return ModularContentSchema;
  }),
});

export type ToggleObjectSchemaType = z.infer<typeof ToggleObjectSchema>;
