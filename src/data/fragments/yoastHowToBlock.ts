import { gql } from 'graphql-tag'

export const yoastHowToBlockFragment = gql`
  fragment YoastHowToBlockFragment on YoastHowToBlock {
    __typename
    attributes {
      className
      days
      defaultDurationText
      description
      durationText
      hasDuration
      hours
      jsonDescription
      minutes
      steps
      unorderedList
    }
  }
`
