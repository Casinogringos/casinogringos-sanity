const menuItemProjection = `
    _type,
    _id,
    _key,
    label,
    page-> {
        _type,
        _key,
        slug,
        title
    },
    children[] {
        _type,
        _id,
        _key,
        label,
        page-> {           
            _type,
            _key,
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
