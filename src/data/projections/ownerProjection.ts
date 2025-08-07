export const ownerProjection = `
    _type,
    _id,
    name,
    slug {
        _type,
        current
    },
    _updatedAt,
    _createdAt
`