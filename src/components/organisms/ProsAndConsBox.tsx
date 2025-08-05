import { Check, MinusCircleIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
const Heading = dynamic(() => import('@/src/components/atoms/Heading'))

const ProsAndConsBox = ({
  pros,
  prosTitle = 'Saker vi gillar',
  cons,
  consTitle = 'Saker vi inte gillar',
  className,
}: {
  pros: string[]
  prosTitle?: string
  cons: string[]
  consTitle?: string
  className?: string
}) => {
  if (!pros?.length || !cons?.length) return null

  return (
    <>
      <section
        className={`grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 ${className}`}
      >
        <div>
          <Heading
            className={'!mt-0 mb-3'}
            level={4}
            text={prosTitle}
          />
          {pros.map((item, index) => (
            <div
              key={`pros-${index}`}
              className={
                'bg-green100 text-green700 rounded-md p-3 mb-3 flex items-center'
              }
            >
              <Check className={'mr-2 h-6 w-6 flex-shrink-0 text-green700'} />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div>
          <Heading
            className={'!mt-0 mb-3'}
            level={4}
            text={consTitle}
          />
          {cons.map((item, index) => (
            <div
              key={`cons-${index}`}
              className={
                'mb-3 flex rounded-md items-center bg-primary p-3 text-red700'
              }
            >
              <MinusCircleIcon
                className={'mr-2 h-6 w-6 flex-shrink-0 text-red700'}
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
