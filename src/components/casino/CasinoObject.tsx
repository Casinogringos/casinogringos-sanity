import Heading from '@/src/components/content/Heading'
import Link from '@/src/components/content/Link'
import Placeholder from '@/src/components/utils/Placeholder'
import { formatSlug } from '@/src/lib/utils'
import { CasinoObjectSchemaType } from '@/src/schemas/casinoObject'
import CasinoService from '@/src/services/CasinoService'
import { Gift } from 'lucide-react'
import { PortableText } from 'next-sanity'
import Image from 'next/image'

const CasinoObject = ({
  object,
  bonusCategories,
}: {
  object: CasinoObjectSchemaType
  bonusCategories?: { value: string }[]
}) => {
  const { casinoPage, buttonText, offer, description } = object
  const { casino } = casinoPage ?? {}
  if (!casino) {
    return <Placeholder message={'Casino Object: Missing casino'} />
  }
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
        return `${casinoBonusPercentage && casinoBonusAmount ? casinoBonusPercentage + '% upp till ' + casinoBonusAmount + 'kr' : ''}${casinoBonusPercentage && casinoBonusAmount && numberOfFreeSpins ? ' + ' : ''}${numberOfFreeSpins ? numberOfFreeSpins + ' freespins' : ''}`
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
        return `${liveCasinoBonusPercentage && liveCasinoBonusAmount ? liveCasinoBonusPercentage + '% upp till ' + liveCasinoBonusAmount + 'kr' : ''}${liveCasinoBonusPercentage && liveCasinoBonusAmount && numberOfFreeSpins ? ' + ' : ''}${numberOfFreeSpins ? numberOfFreeSpins + ' freespins' : ''}`
      }
      default:
        return null
    }
  }
  const bonusString = getBonusString()
  const affLinkSlug = casinoService.getAffLinkSlug({
    bonusCategory,
    casino,
  })

  return (
    <div
      className={
        'grid grid-cols-1 md:grid-cols-[125px_1fr] bg-slate-100 border border-slate-200 rounded-lg mb-4 lg:mb-6'
      }
    >
      <div
        className={
          'flex md:border-r pt-4 px-4 md:py-9 border-r-slate-300 lg:items-start lg:justify-center not-prose'
        }
      >
        <Image
          src={casino.logo.src}
          alt={casino.logo.altText}
          width={100}
          height={100}
          quality={50}
          className={'rounded-full'}
        />
      </div>
      <div className="p-6">
        <Heading
          level={2}
          text={casino.name}
          className={'not-prose text-slate-600 !mt-0 !mb-2 !text-lg'}
        />
        <span
          className={
            'pb-0 flex gap-1 md:gap-2 items-center not-prose text-xl md:text-2xl font-bold leading-6 text-dark'
          }
        >
          {offer ? (
            <>
              <Gift className="flex-shrink-0" />
              <PortableText value={offer} />
            </>
          ) : (
            <>
              <Gift className="flex-shrink-0" />
              {bonusString}
            </>
          )}
        </span>
        <div className={'prose mt-4 md:mt-0 mb-5'}>
          <PortableText value={description} />
        </div>
        {affLinkSlug && (
          <Link
            variant="affiliate"
            className="w-full"
            size="lg"
            href={`${process.env.NEXT_PUBLIC_SITE_URL}/go${formatSlug(affLinkSlug)}`}
            place="CasinoCard block"
            target="_blank"
            plausible={{
              eventName: 'AffiliateClick',
              props: {
                casino: casino.name,
                place: 'Casino Block',
              },
            }}
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  )
}

export default CasinoObject
