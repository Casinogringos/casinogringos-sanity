import { PortableText } from 'next-sanity'
import ToggleButton from '@/src/components/atoms/ToggleButton'
import Heading from '@/src/components/atoms/Heading'
import ToggleSpin from '@/src/components/atoms/ToggleSpin'
import { ChevronDown } from 'lucide-react'
import ToggleItem from '@/src/components/atoms/ToggleItem'

const FAQ = ({ items, subtitle }: { items: FAQItem[]; subtitle?: string }) => {
  return (
    <section>
      {items.map((item, index) => (
        <div key={`faq-item-${index}`}>
          <div>
            <ToggleButton
              id={item._key}
              role={'button'}
              label={item.question}
            >
              <div className={'flex items-center justify-between'}>
                <Heading text={item.question} level={3} className='text-white' />
                <ToggleSpin id={item._key}>
                  <ChevronDown className={'stroke-white'} />
                </ToggleSpin>
              </div>
            </ToggleButton>
          </div>
          <ToggleItem id={item._key}>
            <div className='text-white'>
              <PortableText value={item.answer} />
            </div>
          </ToggleItem>
        </div>
      ))}
    </section>
  )
}

export default FAQ
