import { ProsAndConsObject as ProsAndConsObjectType } from '@/src/types'
import Heading from '@/src/app/components/atoms/Heading'
import { PortableText } from 'next-sanity'

const ProsAndConsObject = ({ object }: { object: ProsAndConsObjectType }) => {
  return (
    <section>
      <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <div>
          <Heading text={'Fördelar'} level={2} />
          {object.pros.map((pro, index) => (
            <div key={`pros-${index}`}>
              <PortableText value={pro} />
            </div>
          ))}
        </div>
        <div>
          <Heading text={'Nackdelar'} level={2} />
          {object.cons.map((con, index) => (
            <div key={`cons-${index}`}>
              <PortableText value={con} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProsAndConsObject
