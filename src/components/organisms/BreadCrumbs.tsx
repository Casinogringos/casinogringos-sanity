import he from 'he'
import { ChevronRight } from 'lucide-react'
import { extractSlugFromUrl } from '../../lib/helpers'
import Container from '../atoms/Container'
import InternalLink from '../../sin-bin/InternalLink'
export default function BreadCrumbs({
  items,
  index,
}: {
  items: { text?: string | undefined; url?: string | undefined }[]
  index?: { text: string; url: string }
}) {
  const breadcrumbs = items
    .filter((item) => item.text && item.text !== 'Hem')
    .map((item) => {
      return {
        text: he.decode(item.text),
        url: item.url ?? null,
      }
    })
  if (index) breadcrumbs.unshift(index)
  return (
    <div className="overflow-x-auto border-b border-b-gray200 bg-white py-2">
      <Container>
        <nav id="breadcrumb" aria-label="Breadcrumb">
          <ol
            role="list"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            className="flex items-center space-x-2 whitespace-nowrap lg:space-x-3"
          >
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <InternalLink
                href="/public"
                itemProp="item"
                itemType="https://schema.org/WebPage"
                prefetch={false}
                className="mr-2 block text-xs font-medium leading-7 text-gray700 hover:text-primary"
              >
                <span itemProp="name">Hem</span>
              </InternalLink>
              <meta itemProp="position" content="1" />
            </li>
            {breadcrumbs.map((item, i) => (
              <li
                key={`breadcrumb-${item.text}`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="!ml-0 flex items-center"
              >
                <ChevronRight
                  className="ml-0 size-4 flex-shrink-0 pl-0 text-gray400"
                  aria-hidden="true"
                />
                {item.url ? (
                  <InternalLink
                    href={extractSlugFromUrl(item.url)}
                    itemProp="item"
                    itemType="https://schema.org/WebPage"
                    prefetch={false}
                    className="lg:m-l3 hover:text-slate-500 mx-2 text-xs text-gray500"
                  >
                    <span itemProp="name">{item.text}</span>
                  </InternalLink>
                ) : (
                  <div
                    itemProp="item"
                    itemType="https://schema.org/WebPage"
                    className="lg:m-l3 hover:text-slate-500 ml-2 text-xs text-gray500"
                  >
                    <span itemProp="name">{item.text}</span>
                  </div>
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
