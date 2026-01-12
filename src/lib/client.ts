import { createClient } from '@sanity/client'
let sanityClient: ReturnType<typeof createClient> | null = null

const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  token: process.env.SANITY_TOKEN as string,
  apiVersion: new Date().toISOString().split('T')[0],
}

export function getClient() {
  if (!sanityClient) {
    sanityClient = createClient(sanityConfig)
  }
  return sanityClient
}
