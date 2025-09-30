import { Check, MinusCircleIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
const Heading = dynamic(() => import('@/src/components/content/Heading'))
import { CasinoPageSchemaType } from '@/src/schemas/casinoPage'

const ProsAndConsBox = ({
  prosTitle,
  consTitle,
  casinoPage,
  className,
}: {
  prosTitle: string
  consTitle: string
  casinoPage: CasinoPageSchemaType
  className?: string
}) => {
  const { title } = casinoPage
  const { advantages: pros, disadvantages: cons } = casinoPage.casino

  if (!pros?.length || !cons?.length) return null
  const prosAndConsStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    review: {
      '@type': 'Review',
      name: `Recension av ${title}`,
      author: {
        '@type': 'Person',
        name: casinoPage.author.firstName + ' ' + casinoPage.author.lastName,
      },
      positiveNotes: {
        '@type': 'ItemList',
        itemListElement: pros.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item,
        })),
      },
      negativeNotes: {
        '@type': 'ItemList',
        itemListElement: cons.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item,
        })),
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(prosAndConsStructuredData),
        }}
        key="casino-pros-and-cons-structured-data"
      />
      <section
        className={`grid grid-cols-1 not-prose lg:grid-cols-2 gap-3 lg:gap-6 ${className}`}
      >
        <div>
          <Heading
            className={'!mt-0 mb-3 font-bold'}
            level={3}
            size={5}
            text={prosTitle}
          />
          {pros.map((item, index) => (
            <div
              key={`pros-${index}`}
              className={
                'bg-green-100 text-green-700 rounded-md p-3 mb-3 flex items-center'
              }
            >
              <Check className={'mr-2 h-6 w-6 flex-shrink-0 text-green-700'} />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div>
          <Heading
            className={'!mt-0 mb-3 font-bold'}
            level={3}
            size={5}
            text={consTitle}
          />
          {cons.map((item, index) => (
            <div
              key={`cons-${index}`}
              className={
                'mb-3 flex rounded-md items-center bg-primary p-3 text-red-700'
              }
            >
              <MinusCircleIcon
                className={'mr-2 h-6 w-6 flex-shrink-0 text-red-700'}
              />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default ProsAndConsBox
