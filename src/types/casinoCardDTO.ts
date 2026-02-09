import { PortableTextBlock } from 'next-sanity'

export interface CasinoCardDTO {
  _id: string
  name: string
  brandColor: string
  logo: { src: string; altText?: string }
  parentCasinoPageSlug?: string
  affLinkSlug: string | null
  swedishLicense: boolean
  defaultBonusText: string
  roiRank?: number

  bonusAmount: number | null
  wageringRequirementsBonus: number | null
  numberOfFreeSpins: number | null
  wageringRequirementsFreespins: number | null
  finalRating: number | null
  hasSwish: boolean
  hasTrustly: boolean

  methodSlugs: string[]
  minimumDeposit: number | null

  terms?: PortableTextBlock[]

  sortMetrics: {
    bonusAmount: number | null
    rating: number | null
    freeSpins: number | null
    wageringRequirements: number | null
  }
}

export interface PaymentMethodOption {
  slug: string
  label: string
}
