import { slugify } from '@/src/lib/utils'
import { ChevronDown } from 'lucide-react'
import { Book, BookOpen } from 'lucide-react'
import Link from 'next/link'
import ToggleButton from '@/src/components/interactivity/ToggleButton'
import ToggleSpin from '@/src/components/interactivity/ToggleSpin'
import ToggleItem from '@/src/components/interactivity/ToggleItem'
import Heading from '@/src/components/content/Heading'
import ToggleSwitch from '@/src/components/interactivity/ToggleSwitch'

const TableOfContents = ({
  headings,
}: {
  headings: { text: string; slug: string }[]
}) => {
  return (
    <section
      className={
        'bg-slate-100 mb-3 mx-auto rounded-md overflow-hidden relative'
      }
    >
      <ToggleButton
        id={'table-of-contents'}
        role={'button'}
        label={'Innehåll'}
        className={'w-full relative flex items-center px-4 py-2'}
        childClassName={'w-full'}
      >
        <div className={'flex items-center justify-between'}>
          <div className={'flex items-center'}>
            <ToggleSwitch
              id={'table-of-contents'}
              open={<BookOpen className="h-4 w-4 mr-2 mt-0.5 text-slate-500" />}
              close={<Book className="h-4 w-4 mr-2 text-slate-500" />}
            />
            <Heading
              className={
                'flex-grow flex items-center not-prose !mt-0 font-semibold text-left text-lg'
              }
              level={3}
              text={'Innehåll'}
            >
              <>Innehåll</>
            </Heading>
          </div>
          <ToggleSpin id={'table-of-contents'}>
            <ChevronDown className={'stroke-black'} />
          </ToggleSpin>
        </div>
      </ToggleButton>
      <ToggleItem id={'table-of-contents'}>
        <ol
          className={
            'border-solid border-t list-decimal not-prose ml-5 border-t-white p-4'
          }
        >
          {headings.map((heading, i) => (
            <li
              key={`heading-${slugify(heading.text)}-${i}`}
              className={
                'py-2 last-of-type:border-0 text-slate-600 last-of-type:pb-0 border-b border-b-slate-200'
              }
            >
              <Link className="hover:text-dark font-medium" href={heading.slug}>
                {heading.text}
              </Link>
            </li>
          ))}
        </ol>
      </ToggleItem>
    </section>
  )
}

export default TableOfContents
