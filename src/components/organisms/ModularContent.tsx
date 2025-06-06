import BonusBox from '@/src/components/organisms/BonusBox'
import CasinoBox from '@/src/components/organisms/CasinoBox'
import HowToBox from '@/src/components/organisms/HowToBox'
import ProsAndConsBox from '@/src/components/organisms/ProsAndConsBox'
import RatingBox from '@/src/components/organisms/RatingBox'
import SummaryBox from '@/src/components/molecules/SummaryBox'
import { Blocks as ObjectsType } from '@/src/types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Fragment } from 'react'
import Columns from '@/src/components/utils/Columns'
import Group from '@/src/components/utils/Group'
import VideoPlayerWrap from '@/src/components/utils/VideoPlayerWrap'
import { Blocks } from '@/src/types/blocks'
import { PortableText } from 'next-sanity'
import Container from '@/src/components/atoms/Container'
import { useNextSanityImage } from 'next-sanity-image'
import { client } from '@/src/lib/client'
import SanityImage from '@/src/components/atoms/SanityImage'
const Heading = dynamic(() => import('@/src/components/atoms/Heading'))
const RawHTML = dynamic(() => import('@/src/components/atoms/RawHTML'))
const Paragraph = dynamic(() => import('@/src/components/atoms/Paragraph'))
const ToggleBox = dynamic(() => import('@/src/components/organisms/ToggleBox'))
const Accordion = dynamic(() => import('@/src/components/organisms/Accordion'))

const renderObject = (object: ObjectType, outerIndex, nested) => {
  if (!object) return null
  const Tag = nested ? 'div' : Container
  switch (object._type) {
    // case 'CoreButtons':
    //   if (!object.innerBlocks || object.innerBlocks.length === 0)
    //     return <RawHTML html={object.renderedHtml} className={'mb-4'} />
    //   return (
    //     <div
    //       key={`buttons-wrapper-${object.clientId}`}
    //       className={'flex flex-wrap justify-center gap-4'}
    //     >
    //       {object.innerBlocks.map((button) => {
    //         return (
    //           <RawHTML
    //             key={`child-button-block-${button.clientId}`}
    //             html={button.renderedHtml}
    //             className={'mb-4'}
    //           />
    //         )
    //       })}
    //     </div>
    //   )
    // case 'CoreQuote':
    //   return <RawHTML html={object.renderedHtml} />
    case 'heading-object': {
      console.log('heading-object', object)
      return (
        <Tag>
          <Heading text={object.text} level={object.level} index={outerIndex} />
        </Tag>
      )
    }
    // case 'FlamingoAiSummary':
    //   return (
    //     <SummaryBox
    //       attributes={object.attributes}
    //       content={object.innerBlocks[0]?.attributes.content ?? ''}
    //       className={'mb-4'}
    //     />
    //   )
    case 'paragraph-object':
      return (
        <Tag>
          <PortableText value={object.content} />
        </Tag>
      )
    case 'image-object': {
      console.log('image-object', object)
      return (
        <Tag>
          <SanityImage image={object.image} alt={object.altText} />
        </Tag>
      )
    }
    // case 'CoreColumns':
    //   return <Columns columns={object} />
    // case 'FlamingoHowTo':
    //   return <HowToBox block={object} />
    // case 'FlamingoFaq': {
    //   const data = { ...object }
    //   data.attributes.items = parseJson(object.attributes.items)
    //   return <Faq data={data} isBlock={true} />
    // }
    // case 'FlamingoCasino': {
    //   const data = parseJson(object.renderedHtml)
    //   return <CasinoBox key={`casino-block-${object.clientId}`} block={data} />
    // }
    // case 'FlamingoProsAndCons': {
    //   return <ProsAndConsBox className={'mb-3'} block={object} />
    // }
    // case 'FlamingoCasinoOld': {
    //   return <CasinoBlockOld block={object} />
    // }
    // case 'FlamingoBonus': {
    //   const data = parseJson(object.renderedHtml)
    //   return <BonusBlock className={'mb-4'} block={data} />
    // }
    // case 'FlamingoBonusOld': {
    //   return <BonusBlockOld block={object} />
    // }
    // case 'FlamingoRating': {
    //   const data = parseJson(object.renderedHtml)
    //   if (!data?.rating) return null
    //   return <RatingBlock className={'mb-4'} block={data} />
    // }
    // case 'FlamingoToggle':
    //   return (
    //     <Toggle
    //       buttonTextOpen={object.attributes.buttonTextOpen}
    //       buttonTextClose={object.attributes.buttonTextClose}
    //       innerBlocks={object.innerBlocks}
    //     />
    //   )
    // case 'CoreGroup':
    //   return <Group group={object} />
    // case 'BlockLabAffiliateButton':
    //   return <AffiliateButton item={object} />
    // case 'FlamingoEmbed':
    //   return <VideoPlayerWrap attributes={object.attributes} />
    // case 'YoastHowToBlock':
    //   return <YoastHowToBlock attributes={object.attributes} />
    // case 'CoreTable':
    //   return (
    //     <RawHTML
    //       html={object.renderedHtml}
    //       className={object.attributes?.cssClassName}
    //     />
    //   )
    // case 'CoreShortcode':
    //   return <RawHTML html={object.renderedHtml} />
    // case 'CoreList': {
    //   return (
    //     <RawHTML
    //       key={`list-block-${object.clientId}`}
    //       html={object.renderedHtml}
    //       className={object.attributes?.cssClassName}
    //     />
    //   )
    // }
    default:
      return null
    // default:
    //   return block.renderedHtml ? (
    //     <RawHTML
    //       key={`default-block-${block.renderedHtml}`}
    //       html={block?.renderedHtml}
    //       className={block?.attributes?.cssClassName}
    //     />
    //   ) : null
  }
}

const ModularContent = ({
  objects,
  className = '',
  nested,
}: {
  objects: ObjectsType
  className?: string
  nested?: boolean
}) => {
  // const conflictingClientIds = blocks?.reduce((acc, block) => {
  //   const allIds = blocks.map((block) => block.clientId)
  //   const count = allIds.filter((id) => id === block.clientId).length
  //   if (count > 1) {
  //     acc.push(block)
  //   }
  //   return acc
  // }, [])
  // console.log('conflictingClientIds', conflictingClientIds)
  if (!objects) return null
  return (
    <div
      key={'objects-wrapper'}
      className={`${className} pb-8 pt-4 mx-auto prose prose-h2:text-3xl prose-p:text-text prose-headings:tracking-normal max-w-3xl text-grey-darker`}
    >
      {objects.map((object: ObjectType, outerIndex: number) => {
        console.log('object', object)
        if (!object._key) return null
        return (
          <Fragment key={`block-${object._key}`}>
            {renderObject(object, outerIndex, nested)}
          </Fragment>
        )
      })}
    </div>
  )
}

export default ModularContent
