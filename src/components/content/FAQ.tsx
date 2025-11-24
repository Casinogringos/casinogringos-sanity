import Heading from '@/src/components/content/Heading'
import ToggleButton from '@/src/components/interactivity/ToggleButton'
import ToggleItem from '@/src/components/interactivity/ToggleItem'
import ToggleSpin from '@/src/components/interactivity/ToggleSpin'
import { portableTextToPlainText } from '@/src/lib/utils'
import { FaqItemObjectSchemaType } from '@/src/schemas/faqItemObject'
import { PortableTextBlockSchemaType } from '@/src/schemas/portableTextBlock'
import { ChevronDown } from 'lucide-react'
import { PortableText } from 'next-sanity'

const getFAQPageStructuredData = (
  items: FaqItemObjectSchemaType[],
  title?: string
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: Array.isArray(item.answer)
          ? portableTextToPlainText(item.answer)
          : '',
      },
    })),
    ...(title ? { name: title } : {}),
  }
}

const FAQ = ({
  items,
  title,
  description,
}: {
  items: FaqItemObjectSchemaType[]
  title?: string
  description?: PortableTextBlockSchemaType
}) => {
  const structuredData = getFAQPageStructuredData(items, title)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        key="faq-structured-data"
      />
      <div
        className={`mb-6 text-white text-center ${description ? 'pb-6' : 'pb-1'}`}
      >
        <Heading
          className="mb-5 font-bold"
          text={title ?? 'Frågor och svar'}
          level={2}
          sizes={[6, 6, 7]}
        />
        <PortableText value={description} />
      </div>
      {items.map((item, index) => (
        <div key={`faq-item-${index}`}>
          <div
            className={
              'bg-light-blue flex items-stretch justify-between no-prose rounded-md mb-2'
            }
          >
            <ToggleButton
              id={item._key}
              group={'faq'}
              role={'button'}
              label={item.question}
              className="w-full"
            >
              <div className={'flex items-center justify-between w-full p-5'}>
                <Heading
                  text={item.question}
                  level={3}
                  className="text-white text-left"
                  sizes={[2, 4, 4]}
                />
                <ToggleSpin id={item._key}>
                  <ChevronDown className={'stroke-white'} />
                </ToggleSpin>
              </div>
            </ToggleButton>
          </div>
          <ToggleItem id={item._key} group={'faq'}>
            <div className="bg-light-blue no-prose p-5 text-white rounded-md mb-2">
              <PortableText value={item.answer} />
            </div>
          </ToggleItem>
        </div>
      ))}
    </>
  )
}

export default FAQ
