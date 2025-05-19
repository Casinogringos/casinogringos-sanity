export type FlamingoBonusBlock = {
  __typename: 'FlamingoBonus'
  clientId: string
  casino: {
    brandName: string
    bonus: string
    freespins: string
    logoUrl: string
    trackerSlug: string
    terms: string
  }
  terms: string
  title: string
  information: string[]
  buttonText: string
}
