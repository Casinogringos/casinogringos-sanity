import Container from '../layout/Container'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { BreadcrumbsSchemaType } from '@/src/schemas/breadcrumbs'

const BreadCrumbs = ({
  items,
  className,
  narrow = false,
}: {
  items: BreadcrumbsSchemaType
  className?: string
  narrow?: boolean
}) => {
  return (
    <div
      className={`overflow-x-auto border-b border-b-gray-200 bg-white py-2 ${className}`}
    >
      <Container narrow={narrow}>
        <nav id="breadcrumb" aria-label="Breadcrumb">
          <ol
            role="list"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            className="flex items-center gap-x-2 whitespace-nowrap lg:gap-x-3"
          >
            <li
              itemID='/'
              itemScope
              itemProp='itemListElement'
              itemType="https://schema.org/ListItem"
            >
              <Link
                href="/"
                itemProp="item"
                itemType="https://schema.org/WebPage"
                prefetch={false}
                className="block text-xs font-medium leading-7 text-gray-700 hover:text-primary"
              >
                <span itemProp="name">Hem</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            {items.map((item, i) => (
              <li
                key={`breadcrumb-${item.text}`}
                itemScope
                itemProp='itemListElement'
                itemID={item.url}
                itemType="https://schema.org/ListItem"
                className="flex items-center gap-x-2 lg:gap-x-2"
              >
                <ChevronRight
                  className="size-4 flex-shrink-0 pl-0 text-gray-400"
                  aria-hidden="true"
                />
                {i < items.length - 1 ? (
                  <Link
                    href={item.url}
                    itemProp="item"
                    itemType="https://schema.org/WebPage"
                    prefetch={false}
                    className="lg:m-l3 hover:text-primary text-xs text-gray-500"
                  >
                    <span itemProp="name">{item.text}</span>
                  </Link>
                ) : (
                  <Link
                    href={item.url}
                    itemProp="item"
                    itemType="https://schema.org/WebPage"
                    className="lg:m-l3 hover:text-slate-500 text-xs text-gray-500"
                  >
                    <span itemProp="name">{item.text}</span>
                  </Link>
                )}
                <meta itemProp="position" content={`${i + 2}`} />
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </div>
  )
}

export default BreadCrumbs
