export type CoreHeadingBlock = {
  __typename: 'CoreHeading'
  clientId: string
  attributes: {
    __typename: 'CoreHeadingAttributes'
    content: string
    className?: string
    anchor?: string
    cssClassName?: string
    level?: number
  }
}
