import { Casino } from '@/src/types/casino'

interface Ratings {
  bonusRating: number
  paymentProvidersRating: number
  gameSelectionRating: number
  slotsRating: number
  liveCasinoRating: number
  bettingRating: number
  usabilityRating: number
  registrationRating: number
  supportRating: number
}

const ratingKeys = [
  { key: 'bonusRating', label: 'Bonuserbjudande', imgSrc: '/bonus.webp' },
  {
    key: 'paymentProvidersRating',
    label: 'Betalningslösningar',
    imgSrc: '/betalmetoder.webp',
  },
  { key: 'gameSelectionRating', label: 'Spelutbud', imgSrc: '/spelutbud.webp' },
  { key: 'slotsRating', label: 'Slots', imgSrc: '/slots.webp' },
  {
    key: 'liveCasinoRating',
    label: 'Live Casino',
    imgSrc: '/live-casino.webp',
  },
  { key: 'bettingRating', label: 'Sportutbud', imgSrc: '/sport.webp' },
  {
    key: 'usabilityRating',
    label: 'Användarvänlighet',
    imgSrc: '/anvandarvanlighet.webp',
  },
  { key: 'registrationRating', label: 'Registrering', imgSrc: '/account.webp' },
  { key: 'supportRating', label: 'Kundtjänst', imgSrc: '/support.webp' },
]

const useRating = ({ casino }: { casino: Casino }) => {
  const ratings: Partial<Ratings> = {}
  const validRatings = ratingKeys.reduce<number[]>((acc, { key }) => {
    const ratingValue = casino.postType?.ratings?.[key as keyof Ratings]
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
    validRatings.length >= 5 ? overallScore : casino?.postType?.rating
  return { finalRating, validRatings, ratings }
}

export default useRating
