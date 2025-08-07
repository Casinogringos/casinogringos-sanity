import {
  dashboardImageProjection,
  paymentMethodTypeProjection,
} from '@/src/data/projections'

export const paymentMethodProjection = `
  _type == 'payment-methods' => {
    name,
    _type,
    slug {
        _type,
        current
    },
    logo {
        ${dashboardImageProjection}
    },
    type-> {
        ${paymentMethodTypeProjection}
    },
    supportedTransactionTypes,
    withdrawalTime[],
    advantages[],
    disadvantages[],
    _updatedAt,
    _createdAt
  }
`
