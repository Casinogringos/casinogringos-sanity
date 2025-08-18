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

const renderObject = (
  object: ModularContentItemSchemaType,
  outerIndex: number,
  nested = false
) => {
  if (!object) return null
  const Tag = nested ? 'div' : Container
  switch (object._type) {
    case 'heading-object': {
      return (
        <Tag>
          <Heading text={object.text} level={object.level} index={outerIndex} />
        </Tag>
      )
    }
    case 'paragraph-object':
      return (
        <Tag className={nested ? 'not-prose' : ''}>
          <PortableText value={object.content} />
        </Tag>
      )
    case 'image-object': {
      return (
        <Tag>
          <ImageObject className="rounded-md" object={object} />
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
    case 'slot-list-object': {
      return (
        <Tag>
          <SlotListObject object={object} />
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
    // TODO: set this back to the list and add a new casino-table-object on next migration
    case 'casino-table-object': {
      return (
        <Tag>
          <CasinoTableObject object={object} />
        </Tag>
      )
    }
    case 'table-object': {
      return (
        <Tag>
          <Placeholder message={'Table Object: Missing table'} />
        </Tag>
      )
    }
    case 'button-object': {
      return (
        <Tag>
          <ButtonObject object={object} />
        </Tag>
      )
    }
    case 'buttons-object': {
      return (
        <Tag>
          <ButtonsObject object={object} />
        </Tag>
      )
    }
    case 'pros-and-cons-object': {
      return (
        <Tag>
          <ProsAndConsObject object={object} />
        </Tag>
      )
    }
    case 'group-object': {
      return (
        <Tag>
          <GroupObject object={object} />
        </Tag>
      )
    }
    case 'ai-summary-object': {
      return (
        <Tag>
          <AISummaryObject object={object} />
        </Tag>
      )
    }
    case 'quote-object': {
      return (
        <Tag>
          <QuoteObject object={object} />
        </Tag>
      )
    }
    case 'rating-object': {
      return (
        <Tag>
          <RatingObject object={object} />
        </Tag>
      )
    }
    case 'faq-object': {
      return (
        <Tag>
          <FAQObject object={object} />
        </Tag>
      )
    }
    case 'old-table-object': {
      return (
        <Tag>
          <HTMLObject object={object} />
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
}: {
  objects: ModularContentSchemaType
  className?: string
  nested?: boolean
}) => {
  // if (!nested) await writeDataToTestFile(objects)
  if (!objects) return null
  return (
    <div
      key={'objects-wrapper prose lg:prose-lg'}
      className={`${className} ${nested ? '' : 'pb-8 pt-4 mx-auto prose prose-h2:text-3xl prose-p:text-text prose-headings:tracking-normal max-w-3xl text-grey-darker'}`}
    >
      {objects.map((object: ModularContentItemSchemaType, outerIndex: number) => {
        if (!object._key) return null
        return (
          <Fragment key={`object-${object._key}`}>
            {renderObject(object, outerIndex, nested)}
          </Fragment>
        )
      })}
    </div>
  )
}

export default ModularContent
