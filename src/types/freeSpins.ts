import { FreeSpinsType, Game, PaymentMethod } from '@/src/types'

export type FreeSpins = {
  _type: 'free-spins'
  name: string
  slug: {
    current: string
  }
  freeSpinsType: FreeSpinsType
  minimumDeposit: number
  numberOfFreeSpins: number
  eligibleGames: Game[]
  valuePerSpin: number
  maxWinLimit: number
  totalValue: number
  wageringRequirements: number
  validityPeriod: number
  excludedPaymentMethods: PaymentMethod[]
  publishedAt: string
}
