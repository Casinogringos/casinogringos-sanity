'use client'

import Image from 'next/image'

const decodeString = (str) => {
  return str
    ? str.replace(/u003c/g, '<').replace(/u003e/g, '>').replace(/u0026/g, '&')
    : ''
}

const YoastHowToBlock = ({ attributes }) => {
  const { days, hours, minutes, jsonDescription, unorderedList } = attributes
  const steps = JSON.parse(attributes.steps)
  const Tag = unorderedList ? 'ul' : 'ol'

  return (
    <section>
      <p>
        <span className={'font-bold'}>Tid som behövs: </span>
        <span>
          {days && days !== '0' ? `${days} days` : ''}{' '}
          {hours && hours !== '0' ? `${hours} hours` : ''}{' '}
          {minutes && minutes !== '0' ? `${minutes} minuter` : ''}
        </span>
      </p>
      <p
        dangerouslySetInnerHTML={{
          __html: decodeString(jsonDescription) ?? '',
        }}
      />
      <Tag className="-ml-7">
        {steps.map((step, index) => (
          <li
            key={`step-${index}`}
            className={'mb-6 list-none rounded-md bg-slate100 p-5 lg:mb-8'}
          >
            <div
              className={`grid grid-cols-1 ${step?.jsonImageSrc ? 'lg:grid-cols-2 gap-x-6' : ''}`}
            >
              <div>
                <strong className={'mb-1 flex items-center text-dark'}>
                  {index + 1}.{' '}
                  <span
                    className={'ml-1'}
                    dangerouslySetInnerHTML={{
                      __html: decodeString(step.jsonName) ?? '',
                    }}
                  />
                </strong>
                {step?.text && step?.text[0]?.type !== 'img' && (
                  <p className={'not-prose mb-0'}>{step.text[0]}</p>
                )}
              </div>
              {step.jsonImageSrc && (
                <div className={'mt-4 lg:mt-0'}>
                  <Image
                    src={`${process.env.WORDPRESS_BASE_URL}${step.jsonImageSrc}`}
                    alt={step.jsonName}
                    width={200}
                    height={200}
                    className={'w-full'}
                  />
                </div>
              )}
            </div>
          </li>
        ))}
      </Tag>
    </section>
  )
}

export default YoastHowToBlock
