import { paymentMethodProjection } from '@/src/data/projections/paymentMethodProjection'
import { linkedPageProjection } from './linkedPageProjection'

export const paymentMethodPageProjection = `
  _type,
  _id,
  paymentMethod-> {
    ${paymentMethodProjection}  
  },
  linkedPage-> {
    ${linkedPageProjection}
  },
  _updatedAt,
  _createdAt
`
