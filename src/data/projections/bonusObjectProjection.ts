import {
  casinoProjection,
  bonusProjection,
  casinoBonusProjection,
  oddsBonusProjection,
  freeSpinsProjection,
} from '@/src/data/projections'

export const bonusObjectProjection = `
  _type == "bonus-object" => {
    _type,
    _id,
    casino {
        ${casinoProjection}
    },
    message,
    bonus {
        ...select(
            _type == "bonuses" => {
                ${bonusProjection}
            },
            _type == "casino-bonuses" => {
                ${casinoBonusProjection}
            },
            _type == "odds-bonuses" => {
                ${oddsBonusProjection}
            }
        )
    },
    freespins {
        ${freeSpinsProjection}
    },
    terms,
    title,
    information,
    buttonText
  }
`
