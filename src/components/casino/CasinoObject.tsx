import Heading from '@/src/components/content/Heading'
import Link from '@/src/components/content/Link'
import Placeholder from '@/src/components/utils/Placeholder'
import { formatSlug } from '@/src/lib/utils'
import { CasinoObjectSchemaType } from '@/src/schemas/casinoObject'
import CasinoService from '@/src/services/CasinoService'
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
  const affLinkSlug = casinoService.getAffLinkSlug({
    bonusCategory,
    casino,
  })

  return (
    <div
      className={
        'grid grid-cols-1 md:grid-cols-[100px_1fr] bg-slate-100 rounded-lg lg:px-6 px-5 py-6 mb-4 lg:mb-6 lg:py-9 gap-6'
      }
    >
      <div className={'flex lg:justify-start lg:items-start not-prose'}>
        <Image
          src={casino.logo.src}
          alt={casino.logo.altText}
          width={100}
          height={100}
          quality={50}
          className={'rounded-full'}
        />
      </div>
      <div>
        <Heading
          level={2}
          text={casino.name}
          className={'not-prose !mt-0 !mb-2 !text-2xl'}
        />
        <span className={'block pb-0 not-prose font-bold leading-6 text-dark'}>
          {offer ? <PortableText value={offer} /> : bonusString}
        </span>
        <div className={'prose mb-6'}>
          <PortableText value={description} />
        </div>
        {affLinkSlug && (
          <Link
            variant="affiliate"
            className="w-full"
            href={`go${formatSlug(affLinkSlug)}`}
            place="CasinoCard block"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  )
}

export default CasinoObject
