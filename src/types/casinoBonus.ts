import { BonusType, PaymentMethod } from '@/src/types'

export type CasinoBonus = {
  _type: 'casino-bonuses'
  name: string
  bonusType: BonusType
  bonusAmountRange: {max: number, min: number}
  bonusPercentage: number
  minimumDeposit: number
  wageringRequirements: number
  wageringOn: string
  validityPeriod: number
  gameRestrictions: string[]
  maximumBetDuringWagering: number
  terms: string
  maxWinLimit: number
  excludedPaymentMethods: PaymentMethod[]
  publishedAt: string
}
