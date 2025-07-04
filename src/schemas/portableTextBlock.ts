import { z } from 'zod';
import { PortableTextBlock } from 'next-sanity';

// A simplified schema for PortableTextBlock
export const PortableTextBlockSchema = z.object({
  _key: z.string().optional(),
  _type: z.string(),
  style: z.string().optional(),
  markDefs: z.array(z.any()).optional(),
  children: z.array(
    z.object({
      _key: z.string().optional(),
      _type: z.string(),
      marks: z.array(z.string()).optional(),
      text: z.string().optional(),
    })
  ).optional(),
}).or(z.any()); // Fallback for other block structures

export type PortableTextBlockSchemaType = z.infer<typeof PortableTextBlockSchema>;
