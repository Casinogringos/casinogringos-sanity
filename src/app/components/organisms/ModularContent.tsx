import BonusBox from '@/src/app/components/organisms/BonusBox'
import CasinoObject from '@/src/app/components/organisms/CasinoObject'
import HowToObject from '@/src/app/components/organisms/HowToObject'
import ProsAndConsBox from '@/src/app/components/organisms/ProsAndConsBox'
import RatingBox from '@/src/app/components/organisms/RatingBox'
import SummaryBox from '@/src/app/components/molecules/SummaryBox'
import { Blocks as ObjectsType } from '@/src/types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Fragment } from 'react'
import Columns from '@/src/app/components/utils/Columns'
import GroupObject from '@/src/app/components/utils/GroupObject'
import VideoPlayerWrap from '@/src/app/components/utils/VideoPlayerWrap'
import { ModularContent } from '@/src/types/modularContent'
import { PortableText } from 'next-sanity'
import Container from '@/src/app/components/atoms/Container'
import { useNextSanityImage } from 'next-sanity-image'
import { client } from '@/src/lib/client'
import ImageObject from '@/src/app/components/atoms/ImageObject'
const Heading = dynamic(() => import('@/src/app/components/atoms/Heading'))
const RawHTML = dynamic(() => import('@/src/app/components/atoms/RawHTML'))
const Paragraph = dynamic(() => import('@/src/app/components/atoms/Paragraph'))
const ToggleBox = dynamic(
  () => import('@/src/app/components/organisms/ToggleBox')
)
const Accordion = dynamic(
  () => import('@/src/app/components/organisms/Accordion')
)
import List from '@/src/app/components/molecules/List'
import ListObject from '@/src/app/components/organisms/ListObject'
import { writeDataToTestFile } from '@/src/lib/actions'
import ColumnsObject from '@/src/app/components/utils/ColumnsObject'
import Placeholder from '@/src/app/components/atoms/Placeholder'

const renderObject = (object: ObjectType, outerIndex, nested) => {
  if (!object) return null
  console.log('objecthello', object)
  const Tag = nested ? 'div' : Container
  switch (
    object._type // TODO: add all object types
  ) {
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
      return (
        <Tag>
          <ImageObject object={object} />
        </Tag>
      )
    }
    case 'list-object': {
      return (
        <Tag>
          <ListObject object={object} />
        </Tag>
      )
    }
    case 'how-to-object': {
      return (
        <Tag>
          <HowToObject object={object} />
        </Tag>
      )
    }
    case 'columns-object': {
      return (
        <Tag>
          <ColumnsObject object={object} />
        </Tag>
      )
    }
    case 'casino-object': {
      return (
        <Tag>
          <CasinoObject object={object} />
        </Tag>
      )
    }
    case 'shortcode-object': {
      return (
        <Tag>
          <Placeholder message={'Shortcode Object: Missing shortcode'} />
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
    case 'group-object': {
      return (
        <Tag>
          <GroupObject object={object} />
        </Tag>
      )
    }
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

const ModularContent = async ({
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
  if (!nested) await writeDataToTestFile(objects)
  if (!objects) return null
  return (
    <div
      key={'objects-wrapper'}
      className={`${className} ${nested ? '' : 'pb-8 pt-4 mx-auto prose prose-h2:text-3xl prose-p:text-text prose-headings:tracking-normal max-w-3xl text-grey-darker'}`}
    >
      {objects.map((object: ObjectType, outerIndex: number) => {
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
