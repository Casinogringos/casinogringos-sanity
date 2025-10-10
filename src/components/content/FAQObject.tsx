import { FAQObject as FAQObjectType } from '@/src/types'
import { PortableText } from 'next-sanity'
import Heading from '@/src/components/content/Heading'
import ToggleButton from '@/src/components/interactivity/ToggleButton'
import ToggleItem from '@/src/components/interactivity/ToggleItem'
import { ChevronDown } from 'lucide-react'
import ToggleSpin from '@/src/components/interactivity/ToggleSpin'

const FAQObject = ({ object }: { object: FAQObjectType }) => {
  // console.log('faq object', object)
  return (
    <section>
      <PortableText value={object.description} />
      <div className="not-prose">
        {object.items.map((item, index) => (
          <div key={`faq-item-${index}`} className="mb-3">
            <div className="bg-slate-100 p-4 rounded-t-md mb-1">
              <ToggleButton
                id={item._key}
                role={'button'}
                label={item.question}
              >
                <div className={'flex items-center justify-between'}>
                  <Heading
                    text={item.question}
                    level={3}
                    sizes={[3, 3, 4]}
                    className="font-bold"
                  />
                  <ToggleSpin id={item._key}>
                    <ChevronDown className={'stroke-dark'} />
                  </ToggleSpin>
                </div>
              </ToggleButton>
            </div>
            <ToggleItem id={item._key}>
              <div className="bg-slate-100 p-4 text-base leading-paragraph rounded-b-md">
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
