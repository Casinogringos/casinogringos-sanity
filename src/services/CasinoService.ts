import { Casino } from '@/src/types/casino'

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

  getCasinoRatings({ casino }: { casino: Casino }) {
    console.log('casino@', casino)
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
    console.log('validRatings', validRatings)
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
    return { finalRating, validRatings, ratings }
  }
}

export default CasinoService
