import { howToStepObjectProjection } from '@/src/data/projections'

export const howToObjectProjection = `
    _type
    _id
    message
    description
    steps {
        ...howToStepObjectProjection
    }
    unorderedList
    hasDuration
    days
    hours
    minutes
    seconds
    ${howToStepObjectProjection}
`
