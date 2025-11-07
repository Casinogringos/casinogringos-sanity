'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { CasinoSchemaType } from '@/src/schemas/casino'
const Link = dynamic(() => import('@/src/components/content/Link'))
import Image from 'next/image'
import CasinoService from '@/src/services/CasinoService'
import { formatSlug } from '@/src/lib/utils'

const CasinoSticky = ({ casino }: { casino: CasinoSchemaType }) => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    })
  }, [])
  const casinoService = new CasinoService()
  const bonusCategory = { value: 'casino-bonus' }
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
    <div
      className={`${isVisible ? 'bottom-0 right-0 z-20' : 'translate-y-96'} bg-slate-100 border-t border-t-slate-200 p-3 lg:px-8 transition fixed w-full shadow-sm`}
    >
      <div className="max-w-4xl mx-auto lg:px-16 flex flex-col lg:flex-row gap-y-2 lg:gap-x-0 w-full items-center lg:justify-left justify-center">
        <div className="flex w-full items-center gap-x-4 lg:gap-x-6">
          <div className="flex h-12 w-20 items-center rounded-sm overflow-hidden">
            <Image
              src={casino.logo.src}
              alt={casino.logo.altText}
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="lg:w-3/3">
            <span className="text-slate-500 font-semibold block -mt-1 my-0 text-lg">
              {casino?.name}
            </span>
            {bonusString && (
              <span className="text-dark text-sm lg:text-base -mt-0.5 lg:-mt-1 block font-semibold">
                {bonusString}
              </span>
            )}
          </div>
        </div>
        {casino.affLink?.slug.current && (
          <div className="w-full lg:w-3/6 flex items-center lg:pb-0">
            <Link
              href={`go${formatSlug(casino.affLink.slug.current)}`}
              className="h-12 flex items-center lg:text-base w-full"
              variant={'affiliate'}
            >
              Till {casino.name}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CasinoSticky
