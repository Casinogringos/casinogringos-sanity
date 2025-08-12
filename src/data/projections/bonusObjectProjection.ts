import { casinoProjection } from '@/src/data/projections/casinoProjection'
import { bonusProjection } from '@/src/data/projections/bonusProjection'
import { casinoBonusProjection } from '@/src/data/projections/casinoBonusProjection'
import { oddsBonusProjection } from '@/src/data/projections/oddsBonusProjection'
import { freeSpinsProjection } from '@/src/data/projections/freeSpinsProjection'

export const bonusObjectProjection = `
  _type == "bonus-object" => {
    _type,
    _id,
    casino-> {
        ${casinoProjection}
    },
    message,
    bonus-> {
        ...select(
            _type == "bonuses" => ${bonusProjection},
            _type == "casino-bonuses" => ${casinoBonusProjection},
            _type == "odds-bonuses" => ${oddsBonusProjection}
        )
    },
    freespins-> {
        ${freeSpinsProjection}
    },
    terms,
    title,
    information,
    buttonText
  }
`
