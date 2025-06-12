import { DashboardImageObject, PaymentMethodType } from '@/src/types'

export type PaymentMethod = {
  _type: 'payment-methods'
  name: string
  slug: {
    current: string
  }
  logo: DashboardImageObject
  typeSlug: PaymentMethodType
  supportedTransactionTypes: string[]
  withdrawalTime: number[]
  advantages: string[]
  disadvantages: string[]
  publishedAt: string
}
