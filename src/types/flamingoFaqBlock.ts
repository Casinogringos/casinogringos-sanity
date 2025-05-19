export type FlamingoFaqBlock = {
  __typename?: 'FlamingoFaq'
  clientId?: string
  attributes: {
    description?: string
    items: {
      question: string
      answer: string
    }[]
  }
}
