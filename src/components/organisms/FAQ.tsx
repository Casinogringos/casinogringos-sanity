import { PortableText } from 'next-sanity'
import ToggleButton from '@/src/components/atoms/ToggleButton'
import Heading from '@/src/components/atoms/Heading'
import ToggleSpin from '@/src/components/atoms/ToggleSpin'
import { ChevronDown } from 'lucide-react'
import ToggleItem from '@/src/components/atoms/ToggleItem'
import { FaqItemObjectSchemaType } from '@/src/schemas/faqItemObject'
import { PortableTextBlockSchemaType } from '@/src/schemas/portableTextBlock'
import Container from '@/src/components/atoms/Container'

const FAQ = ({ items, title, description }: { items: FaqItemObjectSchemaType[]; title?: string; description?: PortableTextBlockSchemaType }) => {
  return (
    <section className="bg-dark py-12">
      <Container>
        {title && description && (
          <div className="mb-6 text-white text-center">
            <Heading text={title} level={2} size={6} />
            <PortableText value={description} />
          </div>
        )}
        {items.map((item, index) => (
          <div key={`faq-item-${index}`}>
            <div className={'bg-white/20 flex items-stretch justify-between no-prose rounded-md mb-2'}>
              <ToggleButton id={item._key} role={'button'} label={item.question}>
                <div className={'flex items-center justify-between p-5'}>
                  <Heading
                    text={item.question}
                    level={3}
                    className="text-white"
                  />
                  <ToggleSpin id={item._key}>
                    <ChevronDown className={'stroke-white'} />
                  </ToggleSpin>
                </div>
              </ToggleButton>
            </div>
            <ToggleItem id={item._key}>
              <div className="bg-white/20 no-prose p-5 text-white rounded-md mb-2">
                <PortableText value={item.answer} />
              </div>
            </ToggleItem>
          </div>
        ))}
      </Container>
    </section>
  )
}

export default FAQ
