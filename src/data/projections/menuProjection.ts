const menuItemProjection = `
    _type,
    _id,
    _key,
    label,
    page-> {
        _type,
        slug,
        title
    },
    children[] {
        _type,
        _id,
        label,
        page-> {           
            _type,
            slug,      
            title
        },
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
