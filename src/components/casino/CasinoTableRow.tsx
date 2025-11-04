import Link from '@/src/components/content/Link'
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'
import { CasinoPagePreviewSchemaType } from '@/src/schemas/casinoPagePreview'
import CasinoService from '@/src/services/CasinoService'

const CasinoTableRow = ({
  casinoPage,
  index,
  bonusCategories,
}: {
  casinoPage: CasinoPageSchemaType | CasinoPagePreviewSchemaType
  index: number
  bonusCategories: { value: string }[]
}) => {
  const casinoService = new CasinoService()
  const { casino } = casinoPage
  const bonusCategory = casinoService.chooseBonusCategory({
    categories: bonusCategories,
    casinoPage,
  })
  const bonus = casinoService.getBonus({
    casinoPage,
    category: bonusCategory,
  })
  const numberOfFreeSpins =
    casinoPage.casino.freeSpins?.[0]?.numberOfFreeSpins ?? false
  const getBonusString = () => {
    if (!bonus) return
    switch (bonus._type) {
      case 'casino-bonuses': {
        const casinoBonusAmount = bonusPage.casinoBonus.bonusAmountRange.max
        const casinoBonusPercentage = bonusPage.casinoBonus.bonusPercentage
        if (
          (!casinoBonusAmount || !casinoBonusPercentage) &&
          !numberOfFreeSpins
        ) {
          return null
        }
        return `${casinoBonusPercentage && casinoBonusAmount ? casinoBonusPercentage + '% up to ' + casinoBonusAmount : ''}${numberOfFreeSpins ? ' + ' + numberOfFreeSpins + ' freespins' : ''}`
      }
      case 'odds-bonus-pages': {
        const oddsBonus = bonusPage.oddsBonus.bonusAmountRange.max
        if (!oddsBonus && !numberOfFreeSpins) return null
        return `${oddsBonus ? oddsBonus + ' kr bonus' : ''}${numberOfFreeSpins ? ' + ' + numberOfFreeSpins + ' freespins' : ''}`
      }
      case 'live-casino-bonus-pages': {
        const liveCasinoBonusPercentage =
          bonusPage.liveCasinoBonus.bonusPercentage
        const liveCasinoBonusAmount =
          bonusPage.liveCasinoBonus.bonusAmountRange.max
        if (
          (!liveCasinoBonusPercentage || !liveCasinoBonusAmount) &&
          !numberOfFreeSpins
        ) {
          return null
        }
        return `${liveCasinoBonusPercentage && liveCasinoBonusAmount ? liveCasinoBonusPercentage + '% up to ' + liveCasinoBonusAmount : ''}${numberOfFreeSpins ? ' + ' + numberOfFreeSpins + ' freespins' : ''}`
      }
      default:
        return null
    }
  }
  const bonusString = getBonusString()

  return (
    <tr>
      <td className="text-center text-slate-500 font-bold">{index + 1}</td>
      <td className="text-center">{casinoPage.title}</td>
      <td className="text-center font-bold">
        {bonusString ?? casino.defaultBonusText}
      </td>
      <td className="text-center">
        {casinoPage.affLink?.slug.current && (
          <Link
            href={`/go${casinoPage.affLink.slug.current}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            prefetch={false}
            variant={'affiliate'}
            size="md"
            className="ml-auto"
            plausible={{
              eventName: 'AffiliateClick',
              props: {
                buttonId: casinoPage.title,
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
