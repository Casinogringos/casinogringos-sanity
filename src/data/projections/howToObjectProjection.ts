import {
  howToStepObjectProjection,
  imageObjectProjection,
} from '@/src/data/projections'

export const howToObjectProjection = `
  _type == 'how-to-object' => {
    _type,
    _id,
    message,
    description,
    steps {
        _type,
        _id,
        message,
        image {
            ${imageObjectProjection}
        },
        title,
        description
    },
    unorderedList,
    hasDuration,
    days,
    hours,
    minutes,
    seconds
    ${howToStepObjectProjection}
  }
`
