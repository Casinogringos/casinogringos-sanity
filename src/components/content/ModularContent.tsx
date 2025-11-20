import CasinoObject from '@/src/components/casino/CasinoObject'
import FAQObject from '@/src/components/content/FAQObject'
import ColumnsObject from '@/src/components/layout/ColumnsObject'
import Container from '@/src/components/layout/Container'
import GroupObject from '@/src/components/layout/GroupObject'
import AISummaryObject from '@/src/components/objects/AISummaryObject'
import BonusObject from '@/src/components/objects/BonusObject'
import ButtonObject from '@/src/components/objects/ButtonObject'
import ButtonsObject from '@/src/components/objects/ButtonsObject'
import HeadingObject from '@/src/components/objects/HeadingObject'
import HowToObject from '@/src/components/objects/HowToObject'
import HTMLObject from '@/src/components/objects/HTMLObject'
import ImageObject from '@/src/components/objects/ImageObject'
import ListObject from '@/src/components/objects/ListObject'
import ProsAndConsObject from '@/src/components/objects/ProsAndConsObject'
import QuoteObject from '@/src/components/objects/QuoteObject'
import RatingObject from '@/src/components/objects/RatingObject'
import SliderObject from '@/src/components/objects/SliderObject'
import SlotListObject from '@/src/components/objects/SlotListObject'
import Placeholder from '@/src/components/utils/Placeholder'
import { CasinoSchemaType } from '@/src/schemas/casino'
import {
  ModularContentItemSchemaType,
  ModularContentSchemaType,
} from '@/src/schemas/modularContent'
import { PortableText } from 'next-sanity'
import { Fragment, ReactNode } from 'react'
import CasinoTableObject from '../casino/CasinoTableObject'
import SectionObject from '../objects/SectionObject'
import ToggleObject from '../objects/ToggleObject'

const portableTextComponents = {
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href?: string }
      children: ReactNode
    }) => {
      const href = value?.href || ''
      const isExternal =
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        (href.startsWith('//') && !href.includes('casinogringos.se'))

      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        )
      }

      return <a href={href}>{children}</a>
    },
  },
}

const renderObject = ({
  object,
  outerIndex,
  casino,
  prose,
  nested,
  bonusCategories,
}: {
  object: ModularContentItemSchemaType
  outerIndex: number
  casino?: CasinoSchemaType
  prose?: boolean
  nested?: boolean
  bonusCategories?: { value: string }[]
}) => {
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
      return (
        <PortableText
          value={object.content}
          components={portableTextComponents}
        />
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
      return <CasinoObject object={object} bonusCategories={bonusCategories} />
    }
    case 'casino-table-object': {
      return (
        <CasinoTableObject object={object} bonusCategories={bonusCategories} />
      )
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
      return (
        <div className="overflow-x-auto">
          <HTMLObject object={object} />
        </div>
      )
    }
    case 'slider-object': {
      return <SliderObject object={object} />
    }
    case 'toggle-object': {
      return <ToggleObject object={object} />
    }
    default:
      return null
  }
}

const ModularContent = ({
  objects,
  className = '',
  bonusCategories,
  casino,
  width,
  prose = true,
  nested = false,
}: {
  objects: ModularContentSchemaType
  className?: string
  nested?: boolean
  casino?: CasinoSchemaType
  bonusCategories?: { value: string }[]
  width?: number
  prose?: boolean
}) => {
  if (!objects) return null
  const Tag = nested ? 'div' : Container
  return (
    <Tag
      className={`${className} ${prose ? 'prose lg:prose-lg prose:last:mb-0' : ''} text-base md:px-0 leading-paragraph ${nested ? 'max-w-none' : 'pb-10'}`}
      width={width}
    >
      {objects.map(
        (object: ModularContentItemSchemaType, outerIndex: number) => {
          if (!object._key) return null
          return (
            <Fragment key={`object-${object._key}`}>
              {renderObject({
                object,
                outerIndex,
                casino,
                prose,
                nested,
                bonusCategories,
              })}
            </Fragment>
          )
        }
      )}
    </Tag>
  )
}

export default ModularContent
