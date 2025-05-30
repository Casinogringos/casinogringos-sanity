import { gql } from 'graphql-tag'
import {
  flamingoImageBlockFragment,
  headingBlockFragment,
  coreParagraphBlockFragment,
  flamingoHowToBlockFragment,
  flamingoFaqBlockFragment,
  flamingoBonusBlockFragment,
  flamingoBonusBlockOldFragment,
  flamingoCasinoBlockFragment,
  flamingoCasinoBlockOldFragment,
  flamingoEmbedBlockFragment,
} from '@/src/data/fragments/index'

export const flamingoToggleBlockFragment = gql`
  fragment FlamingoToggleBlockFragment on FlamingoToggle {
    __typename
    clientId
    attributes {
      buttonTextOpen
      buttonTextClose
    }
    innerBlocks {
      ...FlamingoImageBlockFragment
      ...FlamingoHeadingBlockFragment
      ...CoreParagraphBlockFragment
      ...CoreTableBlockFragment
      ...FlamingoEmbedBlockFragment
      ...FlamingoBonusBlockOldFragment
      ...FlamingoBonusBlockFragment
      ...FlamingoCasinoBlockOldFragment
      ...FlamingoCasinoBlockFragment
      ...FlamingoHowToBlockFragment
      ...FlamingoFaqBlockFragment
    }
  }
  ${headingBlockFragment}
  ${coreParagraphBlockFragment}
  ${flamingoImageBlockFragment}
  ${flamingoHowToBlockFragment}
  ${flamingoFaqBlockFragment}
  ${flamingoBonusBlockFragment}
  ${flamingoBonusBlockOldFragment}
  ${flamingoCasinoBlockFragment}
  ${flamingoCasinoBlockOldFragment}
  ${flamingoEmbedBlockFragment}
`
