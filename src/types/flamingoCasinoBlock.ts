export type FlamingoCasinoBlock = {
  __typename: 'FlamingoCasino'
  clientId: string
  casino: {
    brandName: string
    logoUrl: string
    trackerSlug: string
  }
  buttonText: string
  offer: string
  description: string
}
