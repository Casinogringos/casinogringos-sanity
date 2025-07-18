import {
  dashboardImageProjection,
  paymentMethodTypeProjection,
} from '@/src/data/projections'

export const paymentMethodProjection = `
  _type == 'payment-methods' => {
    name,
    slug,
    logo {
        ${dashboardImageProjection}
    },
    type-> {
        ${paymentMethodTypeProjection}
    },
    supportedTransactionTypes[],
    withdrawalTime[],
    advantages[],
    disadvantages[],
  }
`
