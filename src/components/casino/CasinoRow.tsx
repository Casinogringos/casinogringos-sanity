import Link from '@/src/components/content/Link'
import Image from 'next/image'
import CasinoService from '@/src/services/CasinoService'
import { CasinoSchemaType } from '@/src/schemas/casino'

const casinoService = new CasinoService()

const CasinoRow = ({ casino }: { casino: CasinoSchemaType }) => {
  const bonusCategory = casinoService.chooseBonusCategory({
    categories: [
      { value: 'casino-bonus' },
      { value: 'odds-bonus' },
      { value: 'live-casino-bonus' },
    ],
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
    <>
      <div className="mt-2 flex w-full items-center rounded-md border border-blue-100 bg-slate-100 px-3 py-2.5">
        {casino.logo?.src && (
          <Image
            src={casino.logo.src}
            alt={casino.logo.altText}
            width={45}
            height={45}
            className="mr-3 rounded-full"
          />
        )}
        <div>
          <span className="text-xs font-medium text-slate-900 block">
            {casino.name}
          </span>
          <span className="block text-sm font-bold">
            {bonusString ?? casino.defaultBonusText}
          </span>
        </div>
        {casino.affLink && (
          <Link
            href={`/go${casino.affLink?.slug.current}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            prefetch={false}
            variant={'affiliate'}
            size="sm"
            className="ml-auto"
            plausible={{
              eventName: 'AffiliateClick',
              props: {
                buttonId: casino.name,
                place: 'Sidebar',
              },
            }}
          >
            <span className="whitespace-nowrap">Besök</span>
          </Link>
        )}
      </div>
      <div className="rounded-b-md bg-white pt-1 text-center text-xs text-gray-400 lg:text-left">
        18+ | Spela ansvarsfullt |{' '}
        <Link
          prefetch={false}
          rel="nofollow noreferrer noopener"
          href="https://stodlinjen.se/"
          target="_blank"
        >
          Stödlinjen.se
        </Link>{' '}
        |{' '}
        <Link
          prefetch={false}
          rel="nofollow noreferrer noopener"
          href="https://www.spelpaus.se/"
          target="_blank"
        >
          Spelpaus
        </Link>{' '}
        | Regler och villkor gäller
      </div>
    </>
  )
}

export default CasinoRow
