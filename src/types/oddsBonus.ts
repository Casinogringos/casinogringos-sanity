import { BonusType, PaymentMethod } from '@/src/types'

export type OddsBonus = {
  _type: 'odds-bonuses'
  name: string
  bonusType: BonusType
  bonusAmountRange: number[]
  minimumDeposit: number
  wageringRequirements: number
  validityPeriod: number
  excludedPaymentMethods: PaymentMethod[]
  minimumOdds: number
  maximumStake: number
}
