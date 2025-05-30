import { gql } from 'graphql-tag'
import {
  flamingoRatingBlockFragment,
  coreParagraphBlockFragment,
  coreColumnsBlockFragment,
  coreGroupBlockFragment,
  yoastFaqBlockFragment,
  blockLabCasinoBlockFragment,
  blockLabAffiliateButtonBlockFragment,
  coreListBlockFragment,
  coreQuoteBlockFragment,
  coreShortcodeBlockFragment,
  coreTableBlockFragment,
  headingBlockFragment,
  flamingoEmbedBlockFragment,
  flamingoImageBlockFragment,
  flamingoToggleBlockFragment,
  flamingoAISummaryBlockFragment,
  flamingoHowToBlockFragment,
  flamingoCasinoBlockFragment,
  flamingoBonusBlockFragment,
  flamingoFaqBlockFragment,
  flamingoBonusBlockOldFragment,
  flamingoCasinoBlockOldFragment,
  flamingoProsAndConsBlockFragment,
  coreButtonsBlockFragment,
} from '@/src/data/fragments/index'

export const blockFragments = gql`
  fragment BlockFragments on Pages {
    #    ...BlockLabCasinoBlockFragment
    #    ...BlockLabAffiliateButtonBlockFragment
    #    ...CoreParagraphBlockFragment
    #    ...CoreColumnsBlockFragment
    #    ...CoreGroupBlockFragment
    #    ...YoastFaqBlockFragment
    #    ...CoreQuoteBlockFragment
    #    ...CoreShortcodeBlockFragment
    #    ...CoreTableBlockFragment
    ...FlamingoHeadingBlockFragment
    #    ...CoreListBlockFragment
    #    ...FlamingoEmbedBlockFragment
    #    ...FlamingoImageBlockFragment
    #    ...FlamingoToggleBlockFragment
    #    ...FlamingoAISummaryBlockFragment
    #    ...FlamingoHowToBlockFragment
    #    ...FlamingoCasinoBlockFragment
    #    ...FlamingoBonusBlockFragment
    #    ...FlamingoFaqBlockFragment
    #    ...FlamingoRatingBlockFragment
    #    ...FlamingoBonusBlockOldFragment
    #    ...FlamingoCasinoBlockOldFragment
    #    ...FlamingoProsAndConsBlockFragment
    #    ...CoreButtonsBlockFragment
  }
  ${headingBlockFragment}
`
