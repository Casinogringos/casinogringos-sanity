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
  bonusCategories: string[]
}) => {
  const { casino } = casinoPage
  const casinoService = new CasinoService()
  const bonus = casinoService.getBonus({ casinoPage, category: bonusCategories })
  const freespinsPage = casinoService.getFreespinsPage({ casinoPage })
  // console.log('CASINOPAGE', casinoPage)
  // console.log('bonus', bonus)
  // console.log('bonusCategory', bonusCategory)
  const getBonusString = () => {
    if (!bonus) return
    switch (bonus._type) {
      case 'casino-bonus-pages': {
        const casinoBonus = bonus.casinoBonus.bonusAmountRange[1]
        const freespins = freespinsPage?.numberOfFreeSpins
        if (!casinoBonus && !freespins) return casino.defaultBonusText
        return `${casinoBonus ? casinoBonus + ' kr bonus' : null}${freespins ? ' + ' + freespins + ' freespins' : null}`
      }
      case 'odds-bonus-pages': {
        const oddsBonus = bonus.oddsBonus.bonusAmountRange[1]
        const freespins = freespinsPage?.numberOfFreeSpins
        if (!oddsBonus && !freespins) return casino.defaultBonusText
        return `${oddsBonus ? oddsBonus + ' kr bonus' : null}${freespins ? ' + ' + freespins + ' freespins' : null}`
      }
      case 'live-casino-bonus-pages': {
        const liveCasinoBonus = bonus.liveCasinoBonus.bonusPercentage
        const freespins = freespinsPage?.numberOfFreeSpins
        if (!liveCasinoBonus && !freespins) return casino.defaultBonusText
        return `${liveCasinoBonus ? liveCasinoBonus + '%' : null}${freespins ? ' + ' + freespins + ' freespins' : null}`
      }
      default:
        return ''
    }
  }
  const bonusString = getBonusString()

  return (
    <tr>
      <td className="text-center text-slate-500 font-bold">{index + 1}</td>
      <td className="text-center">{casinoPage.title}</td>
      <td className="text-center font-bold">{bonusString}</td>
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
