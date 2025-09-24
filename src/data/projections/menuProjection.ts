const menuItemProjection = `
    _type,
    _id,
    _key,
    label,
    page-> {
        _id,
        _type,
        _key,
        slug {
            current
        },
        title
    },
    children[] {
        _type,
        _id,
        _key,
        label,
        page-> {           
            _id,
            _type,
            _key,
            slug {
                current
            },      
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
