export type GameProvider = {
  __typename: 'GameproviderNew'
  id: string
  title: string
  slug: string
  gameProviderType: {
    siteLink: {
      nodes: {
        uri: string
      }[]
    }
  }
  featuredImage: {
    node: {
      altText: string
      sourceUrl: string
    }
  }
}
