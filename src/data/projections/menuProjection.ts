const menuItemProjection = `
    _type,
    _id,
    label
    page {
        _type,
        slug
    }
    children[] {
        _type,
        _id,
        label
        page {
            _type,
            slug
        }
    }
`

const menuProjection = `
    _type,
    _id,
    title,
    items[] {
        ${menuItemProjection}
    }
`

export { menuProjection }
