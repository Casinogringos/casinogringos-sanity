import { ButtonObjectSchemaType } from '@/src/schemas/buttonObject'
import Link from '@/src/components/content/Link'
import { formatSlug } from '@/src/lib/utils'

const ButtonObject = ({ object }: { object: ButtonObjectSchemaType }) => {
  const getHref = (): string | null => {
    if (object.page?.slug?.current) {
      switch (object.page._type) {
        case 'casino-pages':
          return `/${object.page.slug.current}`
        case 'guide-pages':
          return `/guider/${object.page.slug.current}`
        case 'news-pages':
          return `/nyheter/${object.page.slug.current}`
        case 'slot-pages':
          return `/slots/${object.page.slug.current}`
        case 'pages':
          return `/${object.page.slug.current}`
        default:
          return null
      }
    }
    if (object.affLink?.slug?.current) {
      return `/go${formatSlug(object.affLink.slug.current)}`
    }
    if (object.uri) {
      return object.uri.current
    }
    return null
  }

  const href = getHref()

  return href ? (
    <Link variant="affiliate" href={href}>
      {object.title}
    </Link>
  ) : null
}

export default ButtonObject
