export const ratingKeys = [
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

export function RatingCalculator({ item }) {
  const ratings = {}

  const validRatings = ratingKeys.reduce<number[]>((acc, { key }) => {
    const ratingValue = item.postType?.ratings?.[key]

    ratings[key] = ratingValue ?? 0

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
    validRatings.length >= 5 ? overallScore : item?.postType?.rating

  return { finalRating, validRatings, ratings }
}
