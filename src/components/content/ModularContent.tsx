import CasinoObject from '@/src/components/casino/CasinoObject'
import HowToObject from '@/src/components/objects/HowToObject'
import { Fragment } from 'react'
import GroupObject from '@/src/components/layout/GroupObject'
import { PortableText } from 'next-sanity'
import Container from '@/src/components/layout/Container'
import ImageObject from '@/src/components/objects/ImageObject'
import Heading from '@/src/components/content/Heading'
import ListObject from '@/src/components/objects/ListObject'
import ColumnsObject from '@/src/components/layout/ColumnsObject'
import Placeholder from '@/src/components/utils/Placeholder'
import ButtonObject from '@/src/components/objects/ButtonObject'
import ButtonsObject from '@/src/components/objects/ButtonsObject'
import ProsAndConsObject from '@/src/components/objects/ProsAndConsObject'
import AISummaryObject from '@/src/components/objects/AISummaryObject'
import QuoteObject from '@/src/components/objects/QuoteObject'
import RatingObject from '@/src/components/objects/RatingObject'
import FAQObject from '@/src/components/content/FAQObject'
import { ModularContentSchemaType } from '@/src/schemas/modularContent'
import { ModularContentItemSchemaType } from '@/src/schemas/modularContent'
import CasinoListObject from '../casino/CasinoTableObject'
import HTMLObject from '@/src/components/objects/HTMLObject'
import SlotListObject from '@/src/components/objects/SlotListObject'
import CasinoTableObject from '../casino/CasinoTableObject'
import { CasinoSchemaType } from '@/src/schemas/casino'
import HeadingObject from '@/src/components/objects/HeadingObject'
import BonusObject from '@/src/components/objects/BonusObject'
import SliderObject from '@/src/components/objects/SliderObject'
import SectionObject from '../objects/SectionObject'
import { difference } from 'lodash'

const renderObject = (
  object: ModularContentItemSchemaType,
  outerIndex: number,
  padding = false,
  casino?: CasinoSchemaType,
  backgroundColor?: string,
  narrow?: boolean,
  prose?: boolean,
  nested?: boolean,
) => {
  if (!object) return null
  switch (object._type) {
    case 'heading-object': {
      return (
        <HeadingObject
          text={object.text}
          level={object.level}
          index={outerIndex}
        />
      )
    }
    case 'paragraph-object': {
      const proseColorOverrides =
        backgroundColor === 'blue' ? 'dark-bg' : 'light-bg'
      return (
        <div className={'text-base leading-paragraph'}>
          <PortableText value={object.content} />
        </div>
      )
    }
    case 'image-object': {
      return <ImageObject prose={prose} object={object} rounded="lg" />
    }
    case 'list-object': {
      return <ListObject object={object} className="mb-6" />
    }
    case 'how-to-object': {
      return <HowToObject object={object} />
    }
    case 'columns-object': {
      return <ColumnsObject object={object} />
    }
    case 'slot-list-object': {
      return <SlotListObject object={object} />
    }
    case 'casino-object': {
      return <CasinoObject object={object} />
    }
    case 'casino-table-object': {
      return <CasinoTableObject object={object} />
    }
    case 'bonus-object': {
      if (!object.casino) {
        return <Placeholder message={'Bonus Object: Missing bonus'} />
      }
      return <BonusObject object={object} />
    }
    case 'section-object': {
      return <SectionObject object={object} />
    }
    case 'table-object': {
      return <Placeholder message={'Table Object: Missing table'} />
    }
    case 'button-object': {
      return <ButtonObject object={object} />
    }
    case 'buttons-object': {
      return <ButtonsObject object={object} />
    }
    case 'pros-and-cons-object': {
      return <ProsAndConsObject object={object} />
    }
    case 'group-object': {
      return <GroupObject object={object} />
    }
    case 'ai-summary-object': {
      return <AISummaryObject object={object} />
    }
    case 'quote-object': {
      return <QuoteObject object={object} />
    }
    case 'rating-object': {
      if (!casino) return null
      return <RatingObject object={object} casino={casino} />
    }
    case 'faq-object': {
      return <FAQObject object={object} />
    }
    case 'old-table-object': {
      return <HTMLObject object={object} />
    }
    case 'slider-object': {
      return <SliderObject object={object} />
    }
    default:
      return null
  }
}

const ModularContent = async ({
  objects,
  className = '',
  casino,
  backgroundColor,
  narrow,
  prose = true,
  nested = false,
}: {
  objects: ModularContentSchemaType
  className?: string
  nested?: boolean
  casino?: CasinoSchemaType
  backgroundColor?: string
  narrow?: boolean
  prose?: boolean
}) => {
  // if (!nested) await writeDataToTestFile(objects)
  if (!objects) return null
  const Tag = nested ? 'div' : Container
  return (
    <Tag
      className={`${className} ${prose ? 'prose lg:prose-lg' : ''}`}
      narrow={narrow}
    >
      {objects.map(
        (object: ModularContentItemSchemaType, outerIndex: number) => {
          if (!object._key) return null
          return (
            <Fragment key={`object-${object._key}`}>
              {renderObject(
                object,
                outerIndex,
                nested,
                casino,
                backgroundColor,
                narrow,
                prose,
                nested
              )}
            </Fragment>
          )
        }
      )}
    </Tag>
  )
}

export default ModularContent
