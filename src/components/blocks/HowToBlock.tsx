import { FlamingoHowToBlock } from '@/src/types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
const Paragraph = dynamic(() => import('@/src/components/atoms/Paragraph'))

const HowToBlock = ({ block }: { block: FlamingoHowToBlock }) => {
  const {
    days,
    hours,
    minutes,
    seconds,
    description: descriptionRaw,
    unorderedList,
    steps,
  } = block.attributes
  const description = descriptionRaw
    .replaceAll('&lt;', '<')
    .replaceAll('&lt;', '<')
  const Tag = unorderedList ? 'ul' : 'ol'
  const data = JSON.parse(steps)

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
        <Paragraph content={description} />
      </div>
      <Tag className="-ml-7">
        {data.map(
          (
            row: {
              title: string
              description: string
              image: { src: string; alt: string }
            },
            rowIndex: number
          ) => (
            <li
              key={`row-${rowIndex}`}
              className={'mb-6 list-none rounded-md bg-slate100 p-5 lg:mb-8'}
            >
              <div
                className={`grid grid-cols-1 ${row.image.src ? 'lg:grid-cols-2 gap-x-6' : ''}`}
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
                    <div>
                      <Paragraph
                        key={`how-to-paragraph-${rowIndex}`}
                        content={row.description}
                        className={'not-prose mb-0'}
                      />
                    </div>
                  )}
                </div>
                {row.image.src && (
                  <div className={'mt-4 min-h-[176px] lg:mt-0'}>
                    <Image
                      src={`${process.env.WORDPRESS_BASE_URL}${row.image.src}`}
                      alt={row.image.alt}
                      width={200}
                      height={1000}
                      priority={true}
                      className={'w-full'}
                      itemProp="image"
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

export default HowToBlock
