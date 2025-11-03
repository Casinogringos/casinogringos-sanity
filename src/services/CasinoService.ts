import { CasinoSchemaType } from '@/src/schemas/casino'
import { CasinoPageSchemaType } from '../schemas/casinoPage'
import { CasinoPagePreviewSchemaType } from '../schemas/casinoPagePreview'
import { CasinoBonusSchemaType } from '../schemas/casinoBonus'
import { OddsBonusSchemaType } from '../schemas/oddsBonus'
import { LiveCasinoBonusSchemaType } from '../schemas/liveCasinoBonus'
import { CasinoBonusPageSchemaType } from '../schemas/casinoBonusPage'
import { OddsBonusPageSchemaType } from '../schemas/oddsBonusPage'
import { LiveCasinoBonusPageSchemaType } from '../schemas/liveCasinoBonusPage'

interface Ratings {
  bonus_rating: number
  payment_providers_rating: number
  game_selection_rating: number
  slots_rating: number
  live_casino_rating: number
  betting_rating: number
  usability_rating: number
  registration_rating: number
  support_rating: number
}
interface RatingKey {
  key: keyof Ratings
  label: string
  imgSrc: string
}

class CasinoService {
  ratingKeys: RatingKey[]
  constructor() {
    this.ratingKeys = [
      { key: 'bonus_rating', label: 'Bonuserbjudande', imgSrc: '/bonus.webp' },
      {
        key: 'payment_providers_rating',
        label: 'Betalningslösningar',
        imgSrc: '/betalmetoder.webp',
      },
      {
        key: 'game_selection_rating',
        label: 'Spelutbud',
        imgSrc: '/spelutbud.webp',
      },
      { key: 'slots_rating', label: 'Slots', imgSrc: '/slots.webp' },
      {
        key: 'live_casino_rating',
        label: 'Live Casino',
        imgSrc: '/live-casino.webp',
      },
      { key: 'betting_rating', label: 'Sportutbud', imgSrc: '/sport.webp' },
      {
        key: 'usability_rating',
        label: 'Användarvänlighet',
        imgSrc: '/anvandarvanlighet.webp',
      },
      {
        key: 'registration_rating',
        label: 'Registrering',
        imgSrc: '/account.webp',
      },
      { key: 'support_rating', label: 'Kundtjänst', imgSrc: '/support.webp' },
    ]
  }
  getCasinoRatings({ casino }: { casino: CasinoSchemaType }): {
    finalRating: number
    validRatings: number[]
    ratings: Partial<Ratings>
    ratingKeys: RatingKey[]
  } {
    const ratings: Partial<Ratings> = {}
    const validRatings = this.ratingKeys.reduce<number[]>((acc, { key }) => {
      const ratingValue = casino.casinoRatings?.find(
        (rating) => rating.ratingType === key
      )?.rating
      ratings[key as keyof Ratings] = ratingValue
      if (ratingValue != null && ratingValue > 0) {
        acc.push(ratingValue)
      }
      return acc
    }, [])
    const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0)
    const maxValidRatings = validRatings.length * 5
    const overallScore =
      validRatings.length > 0
        ? validRatings.every((rating) => rating === 5)
          ? 5
          : ((totalRating / maxValidRatings) * 5).toFixed(1)
        : 0
    const finalRating =
      validRatings.length >= 5 ? overallScore : casino?.overallRating
    return {
      finalRating:
        typeof finalRating === 'string' ? Number(finalRating) : finalRating,
      validRatings,
      ratings,
      ratingKeys: this.ratingKeys,
    }
  }
  getQuickFacts({ casino }: { casino: CasinoSchemaType }): {
    quickFacts: {
      label: string
      value: string | undefined | number
    }[]
  } {
    const quickFacts = [
      {
        label: 'SVENSK LICENS',
        value: casino.swedishLicense ? 'Ja' : 'Nej',
      },
      {
        label: 'SWISH',
        value: [
          casino.availableDepositMethods,
          casino.availableWithdrawalMethods,
        ].some((methodType) =>
          methodType?.some((method) => {
            return method.slug.current === 'swish'
          })
        )
          ? 'Ja'
          : 'Nej',
      },
      {
        label: 'LIVECHATT',
        value: casino.contactMethods.some((method) =>
          method.slug.current.includes('live-chat')
        )
          ? 'Ja'
          : 'Nej',
      },
      {
        label: 'LANSERADES',
        value: new Date(casino.launchDate).toLocaleDateString('sv-SE', {
          year: 'numeric',
        }),
      },
      {
        label: 'Minsta insättning',
        value: casino.minimumDeposit,
      },
    ]
    return { quickFacts }
  }
  // getBonusString({ casino }: { casino: CasinoSchemaType }): string {
  //   const bonus = casino.casinoBonuses?.[0]?.bonusAmountRange[1]?.value ?? null
  //   const freeSpins = casino.freeSpins?.[0]?.numberOfFreeSpins ?? null
  //   let finalString = ''
  //   let bonusString = ''
  //   if (bonus) {
  //     bonusString = `${bonus} kr bonus`
  //   }
  //   let freeSpinsString = ''
  //   if (freeSpins) {
  //     freeSpinsString = `${freeSpins} freespins`
  //   }

  //   if (!bonus && !freeSpins) {
  //     return casino.defaultBonusText ?? ''
  //   }
  //   return `${bonusString} ${bonusString && freeSpinsString ? ' + ' : ''} ${freeSpinsString}`
  // }

  getBonusPage({
    casinoPage,
    category,
  }: {
    casinoPage: CasinoPageSchemaType | CasinoPagePreviewSchemaType
    category: { value: string }
  }):
    | CasinoBonusPageSchemaType
    | OddsBonusPageSchemaType
    | LiveCasinoBonusPageSchemaType
    | null {
    if (!category) return null
    console.log('category!', category)
    console.log('casinoPage', casinoPage)
    switch (category.value) {
      case 'casino-bonus':
        return casinoPage.casinoBonusPages?.[0] ?? null
      case 'odds-bonus':
        return casinoPage.oddsBonusPages?.[0] ?? null
      case 'live-casino-bonus':
        return casinoPage.liveCasinoBonusPages?.[0] ?? null
      default:
        return null
    }
  }

  getFreeSpinsString({
    casinoPage,
  }: {
    casinoPage: CasinoPageSchemaType | CasinoPagePreviewSchemaType
  }) {
    return (
      casinoPage.freeSpinsPages?.[0]?.freeSpinsBonus?.numberOfFreeSpins ?? false
    )
  }

  chooseBonusCategory({
    categories,
    casinoPage,
  }: {
    categories: { value: string }[]
    casinoPage: CasinoPageSchemaType | CasinoPagePreviewSchemaType
  }) {
    const category = categories.reverse().reduce(
      (prev: { value: string }, current: { value: string }) => {
        let existing = ''
        if (current.value === 'casino-bonus') {
          const casinoBonus = casinoPage.casinoBonusPages?.length
          if (casinoBonus) {
            existing = 'casino-bonus'
          }
        } else if (current.value === 'odds-bonus') {
          const oddsBonus = casinoPage.oddsBonusPages?.length
          if (oddsBonus) {
            existing = 'odds-bonus'
          }
        } else if (current.value === 'live-casino-bonus') {
          const liveCasinoBonus = casinoPage.liveCasinoBonusPages?.length
          if (liveCasinoBonus) {
            existing = 'live-casino-bonus'
          }
        }
        if (existing) {
          return { value: existing }
        }
        return prev
      },
      { value: '' }
    )
    return category
  }

  getAffLinkSlug({
    bonusCategory,
    casinoPage,
  }: {
    bonusCategory: { value: string }
    casinoPage: CasinoPageSchemaType | CasinoPagePreviewSchemaType
  }) {
    switch (bonusCategory.value) {
      case 'casino-bonus':
        return casinoPage.casinoBonusPages?.[0].affLink.slug.current ?? null
      case 'odds-bonus':
        return casinoPage.oddsBonusPages?.[0].affLink.slug.current ?? null
      case 'live-casino-bonus':
        return casinoPage.liveCasinoBonusPages?.[0].affLink.slug.current ?? null
      default:
        return casinoPage.freeSpinsPages?.[0].affLink.slug.current ?? null
    }
  }
}

export default CasinoService
