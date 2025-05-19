export type CoreParagraphBlock = {
  __typename: 'CoreParagraph'
  clientId: string
  renderedHtml: string
  attributes: {
    __typename?: 'CoreParagraphAttributes'
    content: string
    className?: string
  }
}
