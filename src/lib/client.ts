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
let sanityClient: ReturnType<typeof createClient> | null = null

export function getClient() {
  if (!sanityClient) {
    sanityClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      token: process.env.SANITY_TOKEN,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2023-01-01',
    })
  }
  return sanityClient
}
