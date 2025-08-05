import z from "zod";

export const LicenseSchema = z.object({
    _type: z.literal('license'),
    name: z.string(),
    slug: z.object({
        _type: z.literal('slug'),
        current: z.string(),
    }),
    _createdAt: z.string(),
    _updatedAt: z.string(),
})

export type LicenseSchemaType = z.infer<typeof LicenseSchema>
