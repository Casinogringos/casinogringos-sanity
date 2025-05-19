import { gql } from 'graphql-tag'

export const coreShortcodeBlockFragment = gql`
  fragment CoreShortcodeBlockFragment on CoreShortcode {
    __typename
    clientId
    renderedHtml
  }
`
