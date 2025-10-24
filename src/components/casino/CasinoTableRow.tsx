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
  const bonus = casinoService.getBonus({ casinoPage, categories: bonusCategories })
  const freespinsPage = casinoService.getFreespinsPage({ casinoPage })
  console.log('CASINOPAGE', casinoPage)
  console.log('bonus!', bonus)
  // console.log('bonusCategory', bonusCategory)
  const getBonusString = () => {
    if (!bonus) return
    switch (bonus._type) {
      case 'casino-bonus-pages': {
        const casinoBonus = bonus.casinoBonus.bonusAmountRange[1]
        if (!casinoBonus && !freespinsPage) return casino.defaultBonusText
        return `${casinoBonus ? casinoBonus + ' kr bonus' : null}${freespinsPage ? ' + ' + freespinsPage + ' freespins' : 'error casino bonus'}`
      }
      case 'odds-bonus-pages': {
        const oddsBonus = bonus.oddsBonus.bonusAmountRange[1]
        if (!oddsBonus && !freespinsPage) return casino.defaultBonusText
        return `${oddsBonus ? oddsBonus + ' kr bonus' : null}${freespinsPage ? ' + ' + freespinsPage + ' freespins' : 'error odds bonus'}`
      }
      case 'live-casino-bonus-pages': {
        const liveCasinoBonus = bonus.liveCasinoBonus.bonusPercentage
        if (!liveCasinoBonus && !freespinsPage) return casino.defaultBonusText
        return `${liveCasinoBonus ? liveCasinoBonus + '%' : null}${freespinsPage ? ' + ' + freespinsPage + ' freespins' : 'error live casino bonus'}`
      }
      default:
        return 'default'
    }
  }
  const bonusString = getBonusString()
  console.log('bonusString', bonusString)

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
