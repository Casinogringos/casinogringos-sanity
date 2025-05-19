export type YoastHowToBlock = {
  __typename: 'YoastHowToBlock'
  clientId: string
  attributes: {
    __typename: 'YoastHowToBlockAttributes'
    className?: string
    days?: string
    defaultDurationText?: string
    description?: string
    durationText?: string
    hasDuration?: boolean
    hours?: string
    jsonDescription?: string
    minutes?: string
    steps?: JSON
    unorderedList?: boolean
  }
}
