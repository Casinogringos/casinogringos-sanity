export const contactMethodProjection = `
    _type,
    _id,
    name,
    slug {
        _type,
        current
    },
    label,
    value,
    averageResponseTime,
    _updatedAt,
    _createdAt
`
