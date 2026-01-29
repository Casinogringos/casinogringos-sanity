import { createClient } from '@sanity/client'
let sanityClient: ReturnType<typeof createClient> | null = null

const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  // token: process.env.SANITY_TOKEN as string, - Cant be used when useCdn is true
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn: true, // Use Sanity CDN instead of Live API for cheaper API calls
}

export function getClient() {
  if (!sanityClient) {
    sanityClient = createClient(sanityConfig)
  }
  return sanityClient
}
