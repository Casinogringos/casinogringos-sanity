import { z } from 'zod'

export const menuItemSchema = z.object({
    _type: z.string(),
    _id: z.string(),
    _key: z.string(),
    label: z.string(),
    page: z.object({
        _type: z.string(),
        _key: z.string(),
        slug: z.object({
            current: z.string(),
        }),
        title: z.string(),
    }),
    children: z.array(z.object({
        _type: z.string(),
        _key: z.string(),
        label: z.string(),
        page: z.object({
            _type: z.string(),
            _key: z.string(),
            slug: z.object({
                current: z.string(),
            }),
            title: z.string(),
        }),
    })),
})


export const menuSchema = z.object({
    title: z.string(),
    items: z.array(menuItemSchema),
})


export type MenuItemSchemaType = z.infer<typeof menuItemSchema>
export type MenuSchemaType = z.infer<typeof menuSchema>


