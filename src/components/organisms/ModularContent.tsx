import CasinoObject from '@/src/components/organisms/CasinoObject'
import HowToObject from '@/src/components/organisms/HowToObject'
import { Fragment } from 'react'
import GroupObject from '@/src/components/utils/GroupObject'
import { PortableText } from 'next-sanity'
import Container from '@/src/components/atoms/Container'
import ImageObject from '@/src/components/atoms/ImageObject'
import Heading from '@/src/components/atoms/Heading'
import ListObject from '@/src/components/organisms/ListObject'
import ColumnsObject from '@/src/components/utils/ColumnsObject'
import Placeholder from '@/src/components/atoms/Placeholder'
import ButtonObject from '@/src/components/molecules/ButtonObject'
import ButtonsObject from '@/src/components/molecules/ButtonsObject'
import ProsAndConsObject from '@/src/components/organisms/ProsAndConsObject'
import AISummaryObject from '@/src/components/organisms/AISummaryObject'
import QuoteObject from '@/src/components/organisms/QuoteObject'
import RatingObject from '@/src/components/organisms/RatingObject'
import FAQObject from '@/src/components/organisms/FAQObject'
import { ModularContentSchemaType } from '@/src/schemas/modularContent'
import { ModularContentItemSchemaType } from '@/src/schemas/modularContent'
import CasinoListObject from './CasinoTableObject'
import HTMLObject from '@/src/components/organisms/HTMLObject'
import SlotListObject from '@/src/components/organisms/SlotListObject'
import CasinoTableObject from './CasinoTableObject'
import { CasinoSchemaType } from '@/src/schemas/casino'
import HeadingObject from '@/src/components/atoms/HeadingObject'
import BonusObject from '@/src/components/organisms/BonusObject'
import SliderObject from '@/src/components/organisms/SliderObject'
import SectionObject from './SectionObject'

const renderObject = (
  object: ModularContentItemSchemaType,
  outerIndex: number,
  padding = false,
  casino?: CasinoSchemaType,
  backgroundColor?: string,
  narrow?: boolean
) => {
  if (!object) return null
  const Tag = padding ? Container : 'div'
  switch (object._type) {
    case 'heading-object': {
      return (
        <Tag narrow={narrow}>
          <HeadingObject backgroundColor={backgroundColor} text={object.text} level={object.level} index={outerIndex} />
        </Tag>
      )
    }
    case 'paragraph-object': {
      console.log('backgroundColor', backgroundColor)
      const proseColorOverrides =
        backgroundColor === 'blue'
          ? 'dark-bg'
          : 'light-bg'
      return (
        <Tag narrow={narrow} className={proseColorOverrides}>
          <PortableText value={object.content} />
        </Tag>
      )
    }
    case 'image-object': {
      return (
        <Tag narrow={narrow}>
          <ImageObject className="rounded-md" object={object} />
        </Tag>
      )
    }
    case 'list-object': {
      return (
        <Tag narrow={narrow}>
          <ListObject object={object} />
        </Tag>
      )
    }
    case 'how-to-object': {
      return (
        <Tag narrow={narrow}>
          <HowToObject object={object} />
        </Tag>
      )
    }
    case 'columns-object': {
      return (
        <Tag narrow={narrow}>
          <ColumnsObject object={object} />
        </Tag>
      )
    }
    case 'slot-list-object': {
      return (
        <Tag narrow={narrow}>
          <SlotListObject object={object} />
        </Tag>
      )
    }
    case 'casino-object': {
      return (
        <Tag narrow={narrow}>
          <CasinoObject object={object} />
        </Tag>
      )
    }
    // TODO: set this back to the list and add a new casino-table-object on next migration
    case 'casino-table-object': {
      return (
        <Tag narrow={narrow}>
          <CasinoTableObject object={object} />
        </Tag>
      )
    }
    case 'bonus-object': {
      if (!object.casino) {
        return (
          <Tag narrow={narrow}>
            <Placeholder message={'Bonus Object: Missing bonus'} />
          </Tag>
        )
      }
      return (
        <Tag narrow={narrow}>
          <BonusObject object={object} />
        </Tag>
      )
    }
    case 'section-object': {
      return (
        <Tag narrow={narrow}>
          <SectionObject object={object} />
        </Tag>
      )
    }
    case 'table-object': {
      return (
        <Tag narrow={narrow}>
          <Placeholder message={'Table Object: Missing table'} />
        </Tag>
      )
    }
    case 'button-object': {
      return (
        <Tag narrow={narrow}>
          <ButtonObject object={object} />
        </Tag>
      )
    }
    case 'buttons-object': {
      return (
        <Tag narrow={narrow}>
          <ButtonsObject object={object} />
        </Tag>
      )
    }
    case 'pros-and-cons-object': {
      return (
        <Tag narrow={narrow}>
          <ProsAndConsObject object={object} />
        </Tag>
      )
    }
    case 'group-object': {
      return (
        <Tag narrow={narrow}>
          <GroupObject object={object} />
        </Tag>
      )
    }
    case 'ai-summary-object': {
      return (
        <Tag narrow={narrow}>
          <AISummaryObject object={object} />
        </Tag>
      )
    }
    case 'quote-object': {
      return (
        <Tag narrow={narrow}>
          <QuoteObject object={object} />
        </Tag>
      )
    }
    case 'rating-object': {
      if (!casino) return null
      return (
        <Tag narrow={narrow}>
          <RatingObject object={object} casino={casino} />
        </Tag>
      )
    }
    case 'faq-object': {
      return (
        <Tag narrow={narrow}>
          <FAQObject object={object} />
        </Tag>
      )
    }
    case 'old-table-object': {
      return (
        <Tag narrow={narrow}>
          <HTMLObject object={object} />
        </Tag>
      )
    }
    case 'slider-object': {
      return (
        <Tag narrow={narrow} className='mb-8'>
          <SliderObject object={object} />
        </Tag>
      )
    }
    default:
      return null
  }
}

const ModularContent = async ({
  objects,
  className = '',
  nested,
  casino,
  backgroundColor,
  narrow,
}: {
  objects: ModularContentSchemaType
  className?: string
  nested?: boolean
  casino?: CasinoSchemaType
  backgroundColor?: string
  narrow?: boolean
}) => {
  // if (!nested) await writeDataToTestFile(objects)
  if (!objects) return null
  return (
    <div
      key={'objects-wrapper prose lg:prose-lg'}
      className={`${className} ${nested ? '' : 'pb-8 w-full pt-4 mx-auto prose'}`}
    >
      {objects.map((object: ModularContentItemSchemaType, outerIndex: number) => {
        if (!object._key) return null
        return (
          <Fragment key={`object-${object._key}`}>
            {renderObject(object, outerIndex, nested, casino, backgroundColor, narrow)}
          </Fragment>
        )
      })}
    </div>
  )
}

export default ModularContent
