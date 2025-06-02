export const bonusObjectProjection = `
    _type
    _id
    casino {
        ...casinoProjection
    }
    message
    bonus {
        ...bonusProjection
        ...casinoBonusProjection
        ...oddsBonusProjection
    }
    freespins {
        ...freeSpinsProjection
    }
    terms
    title
    information
    buttonText
`
