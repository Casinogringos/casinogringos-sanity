import { howToStepObjectProjection } from '@/src/data/projections'

export const howToObjectProjection = `
  _type == 'how-to-object' => {
    _type,
    _id,
    _key,
    message,
    description,
    steps[] {
        ${howToStepObjectProjection}
    },
    unorderedList,
    hasDuration,
    days,
    hours,
    minutes,
    seconds
  }
`
