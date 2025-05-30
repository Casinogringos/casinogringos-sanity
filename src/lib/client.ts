// import { ApolloClient, InMemoryCache } from '@apollo/client'
//
// export const client = new ApolloClient({
//   uri: process.env.DATO_GQL_ENDPOINT as string,
//   headers: {
//     Authorization: `Bearer ${process.env.DATO_GQL_TOKEN}`,
//   },
//   cache: new InMemoryCache(),
// })

import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  apiVersion: process.env.SANITY_API_VERSION ?? '1',
})
