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
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSchemaType } from '../schemas';
let sanityClient: ReturnType<typeof createClient> | null = null

const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  token: process.env.SANITY_TOKEN as string,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2023-01-01',
}
export const urlFor = (source: SanityImageSchemaType) => imageUrlBuilder(sanityConfig).image(source);

export function getClient() {
  if (!sanityClient) {
    sanityClient = createClient(sanityConfig)
  }
  return sanityClient
}
