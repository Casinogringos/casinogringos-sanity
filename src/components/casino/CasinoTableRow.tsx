import Link from '@/src/components/content/Link'
import { formatSlug } from '@/src/lib/utils'
import { CasinoSchemaType } from '@/src/schemas/casino'
import CasinoService from '@/src/services/CasinoService'

const CasinoTableRow = ({
  casino,
  index,
  bonusCategories,
}: {
  casino: CasinoSchemaType
  index: number
  bonusCategories?: { value: string }[]
}) => {
  const casinoService = new CasinoService()
  const bonusCategory = casinoService.chooseBonusCategory({
    categories: bonusCategories ?? [],
    casino,
  })
  const bonus = casinoService.getBonus({
    casino,
    category: bonusCategory,
  })
  const numberOfFreeSpins = casino.freeSpins?.[0]?.numberOfFreeSpins ?? false

  const getBonusString = () => {
    if (!bonus) return
    switch (bonus._type) {
      case 'casino-bonuses': {
        const casinoBonusAmount = bonus.bonusAmountRange.max
        const casinoBonusPercentage = bonus.bonusPercentage
        if (
          (!casinoBonusAmount || !casinoBonusPercentage) &&
          !numberOfFreeSpins
        ) {
          return null
        }
        return `${casinoBonusPercentage && casinoBonusAmount ? casinoBonusPercentage + '% upp till ' + casinoBonusAmount + ' kr' : ''}${casinoBonusPercentage && casinoBonusAmount && numberOfFreeSpins ? ' + ' : ''}${numberOfFreeSpins ? numberOfFreeSpins + ' freespins' : ''}`
      }
      case 'odds-bonuses': {
        const oddsBonus = bonus.bonusAmountRange.max
        if (!oddsBonus && !numberOfFreeSpins) return null
        return `${oddsBonus ? oddsBonus + ' kr bonus' : ''}${oddsBonus && numberOfFreeSpins ? ' + ' : ''}${numberOfFreeSpins ? numberOfFreeSpins + ' freespins' : ''}`
      }
      case 'live-casino-bonuses': {
        const liveCasinoBonusPercentage = bonus.bonusPercentage
        const liveCasinoBonusAmount = bonus.bonusAmountRange.max
        if (
          (!liveCasinoBonusPercentage || !liveCasinoBonusAmount) &&
          !numberOfFreeSpins
        ) {
          return null
        }
        return `${liveCasinoBonusPercentage && liveCasinoBonusAmount ? liveCasinoBonusPercentage + '% upp till ' + liveCasinoBonusAmount : ''}${liveCasinoBonusPercentage && liveCasinoBonusAmount && numberOfFreeSpins ? ' + ' : ''}${numberOfFreeSpins ? numberOfFreeSpins + ' freespins' : ''}`
      }
      default:
        return null
    }
  }
  const bonusString = getBonusString()

  return (
    <tr>
      <td className="text-center text-slate-500 font-bold align-middle">
        {index + 1}
      </td>
      <td className="text-center align-middle">{casino.name}</td>
      <td className="text-center font-bold align-middle">
        {bonusString ?? casino.defaultBonusText}
      </td>
      <td className="text-center align-middle">
        {casino.affLink?.slug.current && (
          <Link
            href={`/go${formatSlug(casino.affLink.slug.current)}`}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            prefetch={false}
            variant={'affiliate'}
            size="sm"
            className="ml-auto whitespace-nowrap !px-3.5 !py-2.5"
            plausible={{
              eventName: 'AffiliateClick',
              props: {
                casino: casino.name,
                place: 'Casino table',
              },
            }}
          >
            Spela
          </Link>
        )}
      </td>
    </tr>
  )
}

export default CasinoTableRow
