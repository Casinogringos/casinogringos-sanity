import Heading from '@/src/components/content/Heading'
import { ProsAndConsObjectSchemaType } from '@/src/schemas/prosAndConsObject'
import { PortableText } from 'next-sanity'
import { Check, X } from 'lucide-react'

const ProsAndConsObject = ({
  object,
}: {
  object: ProsAndConsObjectSchemaType
}) => {
  return (
    <section className="not-prose">
      <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <div>
          <Heading
            text={'Fördelar'}
            className="font-bold mb-2"
            level={2}
            sizes={[5, 5, 6]}
          />
          {object.pros.map((pro, index) => (
            <div
              className="bg-green-100 text-green-700 rounded-md p-3 mb-3 flex items-center"
              key={`pros-${index}`}
            >
              <Check className="mr-2 h-6 w-6 flex-shrink-0 text-green-700" />
              <p className='leading-paragraph text-base'>{pro}</p>
            </div>
          ))}
        </div>
        <div>
          <Heading
            text={'Nackdelar'}
            className="font-bold mb-2"
            level={2}
            sizes={[5, 5, 6]}
          />
          {object.cons.map((con, index) => (
            <div
              className="bg-red-100 text-red-700 rounded-md p-3 mb-3 flex items-center"
              key={`cons-${index}`}
            >
              <X className="mr-2 h-6 w-6 flex-shrink-0 text-red-700" />
              <p className='leading-paragraph text-base'>{con}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProsAndConsObject
