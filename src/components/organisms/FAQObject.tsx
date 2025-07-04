import { FAQObject as FAQObjectType } from '@/src/types'
import { PortableText } from 'next-sanity'
import Heading from '@/src/components/atoms/Heading'
import ToggleButton from '@/src/components/atoms/ToggleButton'
import ToggleItem from '@/src/components/atoms/ToggleItem'
import { ChevronDown } from 'lucide-react'
import ToggleSpin from '@/src/components/atoms/ToggleSpin'

const FAQObject = ({ object }: { object: FAQObjectType }) => {
  // console.log('faq object', object)
  return (
    <section>
      <PortableText value={object.description} />
      <div>
        {object.items.map((item, index) => (
          <div key={`faq-item-${index}`}>
            <div>
              <ToggleButton
                id={item._key}
                role={'button'}
                label={item.question}
              >
                <div className={'flex items-center justify-between'}>
                  <Heading text={item.question} level={3} />
                  <ToggleSpin id={item._key}>
                    <ChevronDown className={'stroke-dark'} />
                  </ToggleSpin>
                </div>
              </ToggleButton>
            </div>
            <ToggleItem id={item._key}>
              <div>
                <PortableText value={item.answer} />
              </div>
            </ToggleItem>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQObject
