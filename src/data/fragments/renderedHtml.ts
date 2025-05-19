import { gql } from 'graphql-tag'

export const renderedHtmlFragment = gql`
  fragment RenderedHtmlFragment on CoreShortcode {
    __typename
    renderedHtml
  }
`
