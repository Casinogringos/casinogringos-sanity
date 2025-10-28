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
  const bonusCategory = casinoService.chooseBonusCategory({ categories: bonusCategories, casinoPage })
  const bonusPage = casinoService.getBonusPage({ casinoPage, category: bonusCategory })
  const numberOfFreeSpins = casinoPage.freeSpinsPages?.[0]?.freeSpinsBonus?.numberOfFreeSpins ?? false
  const getBonusString = () => {
    if (!bonusPage) return
    switch (bonusPage._type) {
      case 'casino-bonus-pages': {
        const casinoBonus = bonusPage.casinoBonus.bonusAmountRange[1]
        if (!casinoBonus && !numberOfFreeSpins) {
          return null
        }
        return `${casinoBonus ? casinoBonus + ' kr bonus' : null}${numberOfFreeSpins ? ' + ' + numberOfFreeSpins + ' freespins' : ''}`
      }
      case 'odds-bonus-pages': {
        const oddsBonus = bonusPage.oddsBonus.bonusAmountRange[1]
        if (!oddsBonus && !numberOfFreeSpins) return null
        return `${oddsBonus ? oddsBonus + ' kr bonus' : null}${numberOfFreeSpins ? ' + ' + numberOfFreeSpins + ' freespins' : ''}`
      }
      case 'live-casino-bonus-pages': {
        const liveCasinoBonusPercentage = bonusPage.liveCasinoBonus.bonusPercentage
        const upTo = bonusPage.liveCasinoBonus.maxWinLimit
        if (!liveCasinoBonusPercentage && !numberOfFreeSpins) {
          return null
        }
        return `${liveCasinoBonusPercentage ? liveCasinoBonusPercentage + '% up to ' + upTo : null}${numberOfFreeSpins ? ' + ' + numberOfFreeSpins + ' freespins' : ''}`
      }
      default:
        return null
    }
  }
  const bonusString = getBonusString()
  console.log('bonusString', bonusString)

  return (
    <tr>
      <td className="text-center text-slate-500 font-bold">{index + 1}</td>
      <td className="text-center">{casinoPage.title}</td>
      <td className="text-center font-bold">{bonusString ?? casino.defaultBonusText}</td>
      <td className="text-center">
        {casinoPage.affLink?.slug.current && <Link
          href={`/go${casinoPage.affLink.slug.current}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          prefetch={false}
          variant={'affiliate'}
          size="sm"
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
        </Link>}
      </td>
    </tr>
  )
}

export default CasinoTableRow
