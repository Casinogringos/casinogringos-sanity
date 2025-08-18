import SanityImage from '@/src/components/atoms/SanityImage'
import { PortableText } from 'next-sanity'
import {
  HowToObjectSchemaType,
  PortableTextBlockSchemaType,
  SanityImageSchemaType,
} from '@/src/schemas'

const HowToObject = ({ object }: { object: HowToObjectSchemaType }) => {
  const {
    description,
    steps,
    unorderedList,
    hasDuration,
    hours,
    minutes,
    seconds,
    days,
  } = object
  const Tag = unorderedList ? 'ul' : 'ol'
  // console.log('how to object', object)
  return (
    <section>
      <meta />
      <p>
        <span className={'font-bold'}>Tid som behövs: </span>
        <span>
          {days && days !== 0 ? `${days} days` : ''}{' '}
          {hours && hours !== 0 ? `${hours} hours` : ''}{' '}
          {minutes && minutes !== 0 ? `${minutes} minuter` : ''}{' '}
          {seconds && seconds !== 0 ? `${seconds} sekunder` : ''}
        </span>
      </p>
      <div>
        <PortableText value={description} />
      </div>
      <Tag className="-ml-7">
        {steps.map(
          (
            row: {
              title: string
              description?: PortableTextBlockSchemaType
              image?: SanityImageSchemaType
            },
            rowIndex: number
          ) => (
            <li
              key={`row-${rowIndex}`}
              className={'mb-6 list-none rounded-md bg-slate-200 p-5 lg:mb-8'}
            >
              <div
                className={`grid grid-cols-1 ${row.image ? 'lg:grid-cols-2 gap-x-6' : ''}`}
              >
                <div>
                  {row.title && (
                    <strong
                      key={`how-to-heading-${rowIndex}`}
                      className={'mb-1 flex items-start text-dark'}
                    >
                      {rowIndex + 1}.{' '}
                      <span
                        className={'ml-1'}
                        dangerouslySetInnerHTML={{
                          __html: row.title ?? '',
                        }}
                      />
                    </strong>
                  )}
                  {row.description && (
                    <div className={'not-prose'}>
                      <PortableText
                        key={`how-to-paragraph-${rowIndex}`}
                        value={row.description}
                      />
                    </div>
                  )}
                </div>
                {row.image && (
                  <div className={'mt-4 min-h-[176px] lg:mt-0'}>
                    <SanityImage
                      key={`how-to-image-${rowIndex}`}
                      image={row.image}
                      width={600}
                    />
                  </div>
                )}
              </div>
            </li>
          )
        )}
      </Tag>
    </section>
  )
}

export default HowToObject
