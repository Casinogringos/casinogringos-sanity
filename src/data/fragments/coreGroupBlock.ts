import { gql } from 'graphql-tag'
import {
  coreParagraphBlockFragment,
  headingBlockFragment,
  flamingoImageBlockFragment,
  coreColumnsBlockFragment,
  flamingoBonusBlockOldFragment,
  flamingoBonusBlockFragment,
  flamingoCasinoBlockOldFragment,
  flamingoCasinoBlockFragment,
  flamingoProsAndConsBlockFragment,
  coreButtonsBlockFragment,
  coreListBlockFragment,
} from '@/src/data/fragments/index'

export const coreGroupBlockFragment = gql`
  fragment CoreGroupBlockFragment on CoreGroup {
    __typename
    clientId
    attributes {
      className
    }
    innerBlocks {
      ...CoreParagraphBlockFragment
      ...FlamingoHeadingBlockFragment
      ...FlamingoImageBlockFragment
      ...CoreColumnsBlockFragment
      ...CoreListBlockFragment
      ...CoreButtonsBlockFragment
      ...FlamingoBonusBlockOldFragment
      ...FlamingoBonusBlockFragment
      ...FlamingoCasinoBlockOldFragment
      ...FlamingoCasinoBlockFragment
      ...FlamingoProsAndConsBlockFragment
    }
  }
  ${coreParagraphBlockFragment}
  ${headingBlockFragment}
  ${flamingoImageBlockFragment}
  ${coreListBlockFragment}
  ${coreButtonsBlockFragment}
  ${coreColumnsBlockFragment}
  ${flamingoBonusBlockOldFragment}
  ${flamingoBonusBlockFragment}
  ${flamingoCasinoBlockOldFragment}
  ${flamingoCasinoBlockFragment}
  ${flamingoProsAndConsBlockFragment}
`
