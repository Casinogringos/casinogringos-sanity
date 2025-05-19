export type CoreImageBlock = {
  __typename: 'CoreImage'
  clientId: string
  attributes: {
    url: string
    src: string
    title: string
    alt: string
    caption: string
  }
  mediaDetails: {
    height: string
    width: string
  }
}
