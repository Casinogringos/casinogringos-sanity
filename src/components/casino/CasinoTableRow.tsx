import Link from '@/src/components/content/Link'
import CasinoService from '@/src/services/CasinoService'
import { CasinoSchemaType } from '@/src/schemas/casino'

const CasinoTableRow = ({
  casino,
  index,
  bonusCategories,
}: {
  casino: CasinoSchemaType
  index: number
  bonusCategories: { value: string }[]
}) => {
  const casinoService = new CasinoService()
  const bonusCategory = casinoService.chooseBonusCategory({
    categories: bonusCategories,
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
        return `${casinoBonusPercentage && casinoBonusAmount ? casinoBonusPercentage + '% up to ' + casinoBonusAmount : ''}${casinoBonusPercentage && casinoBonusAmount && numberOfFreeSpins ? ' + ' : ''}${numberOfFreeSpins ? numberOfFreeSpins + ' freespins' : ''}`
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
        return `${liveCasinoBonusPercentage && liveCasinoBonusAmount ? liveCasinoBonusPercentage + '% up to ' + liveCasinoBonusAmount : ''}${liveCasinoBonusPercentage && liveCasinoBonusAmount && numberOfFreeSpins ? ' + ' : ''}${numberOfFreeSpins ? numberOfFreeSpins + ' freespins' : ''}`
      }
      default:
        return null
    }
  }
  const bonusString = getBonusString()

  return (
    <tr>
      <td className="text-center text-slate-500 font-bold">{index + 1}</td>
      <td className="text-center">{casino.name}</td>
      <td className="text-center font-bold">
        {bonusString ?? casino.defaultBonusText}
      </td>
      <td className="text-center">
        {casino.affLink?.slug.current && (
          <Link
            href={`/go${casino.affLink.slug.current}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            prefetch={false}
            variant={'affiliate'}
            size="md"
            className="ml-auto"
            plausible={{
              eventName: 'AffiliateClick',
              props: {
                buttonId: casino.name,
                place: 'Content',
              },
            }}
          >
            Till Casinot
          </Link>
        )}
      </td>
    </tr>
  )
}

export default CasinoTableRow
