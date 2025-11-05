import { dashboardImageProjection } from '@/src/data/projections/dashboardImageProjection'
import { paymentMethodTypeProjection } from '@/src/data/projections/paymentMethodTypeProjection'

export const paymentMethodProjection = `
  _type == 'payment-methods' => {
    _id,
    name,
    _type,
    slug {
        _type,
        current
    },
    linkedPage-> {
      _type,
      _id,
      _key,
      title,
      slug {
        _type,
        current
      }
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
