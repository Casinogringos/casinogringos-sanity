import { gql } from "graphql-tag";
import {
  flamingoImageBlockFragment,
  flamingoHeadingBlockFragment,
  coreParagraphBlockFragment,
  flamingoHowToBlockFragment,
  flamingoFaqBlockFragment,
  flamingoBonusBlockFragment,
  flamingoBonusBlockOldFragment,
  flamingoCasinoBlockFragment,
  flamingoCasinoBlockOldFragment,
  flamingoEmbedBlockFragment,
} from "@/src/data/fragments/index";

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
  ${flamingoHeadingBlockFragment}
  ${coreParagraphBlockFragment}
  ${flamingoImageBlockFragment}
  ${flamingoHowToBlockFragment}
  ${flamingoFaqBlockFragment}
  ${flamingoBonusBlockFragment}
  ${flamingoBonusBlockOldFragment}
  ${flamingoCasinoBlockFragment}
  ${flamingoCasinoBlockOldFragment}
  ${flamingoEmbedBlockFragment}
`;
