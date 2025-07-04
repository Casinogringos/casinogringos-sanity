import { z } from 'zod';
import { DashboardImageObject } from '../types/dashboardImageObject';

export const DashboardImageObjectSchema = z.object({
  _type: z.literal('dashboard-image-object'),
  _key: z.string(),
  src: z.string(),
  altText: z.string(),
});

export type DashboardImageObjectSchemaType = z.infer<typeof DashboardImageObjectSchema>;
