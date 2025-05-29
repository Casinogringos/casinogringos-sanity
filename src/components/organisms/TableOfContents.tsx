'use client'

import { slugify } from '../../lib/helpers'
import { ChevronDown } from '../../sin-bin/Icons'
import { Book, BookOpen } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FlamingoHeadingBlock } from '@/src/types/flamingoHeadingBlock'

const TableOfContents = ({
  headings,
}: {
  headings: FlamingoHeadingBlock[]
}) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={
        'bg-slate100 max-w-3xl mb-3 mx-auto rounded-md overflow-hidden relative'
      }
    >
      <button
        onClick={() => setOpen(!open)}
        className={'w-full relative flex items-center px-4 py-2'}
      >
        <h2
          className={
            'flex-grow flex items-center not-prose font-semibold text-left text-lg'
          }
        >
          {!open ? (
            <Book className="h-4 w-4 mr-2 text-slate500" />
          ) : (
            <BookOpen className="h-4 w-4 mr-2 mt-0.5 text-slate500" />
          )}
          Innehåll
        </h2>
        <div className={`${open ? 'rotate-180' : ''} transition `}>
          <ChevronDown className={'stroke-black'} />
        </div>
      </button>
      <div
        className={`${
          open ? 'max-h-[600px]' : 'max-h-0'
        } overflow-y-auto transition-mh origin-top`}
      >
        <ol
          className={
            'border-solid border-t list-decimal not-prose ml-5 border-t-white p-4'
          }
        >
          {headings.map((heading) => (
            <li
              key={`heading-${heading.attributes.text}`}
              className={
                'py-2 last-of-type:border-0 text-slate600 last-of-type:pb-0 border-b border-b-slate200'
              }
            >
              <Link
                className="hover:text-dark font-medium"
                href={`${pathname}/#${slugify(heading.attributes.text)}`}
              >
                {heading.attributes.text}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default TableOfContents
