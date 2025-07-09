import { z } from 'zod';

export const BasePagePreviewSchema = z.object({
  _id: z.string(),
  _type: z.string(),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  _createdAt: z.string(),
  _updatedAt: z.string(),
});

export type BasePagePreviewSchemaType = z.infer<typeof BasePagePreviewSchema>;
