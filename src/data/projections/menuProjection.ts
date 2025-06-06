const menuItemProjection = `
    _type,
    _id,
    label
    page {
        _type,
        slug
    }
    children[] {
        ${menuItemProjection}
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
