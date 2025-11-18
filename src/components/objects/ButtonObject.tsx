import { ButtonObjectSchemaType } from '@/src/schemas/buttonObject'
import Link from '@/src/components/content/Link'

const ButtonObject = ({ object }: { object: ButtonObjectSchemaType }) => {
  const getHref = () => {
    if (!object.page?.slug) {
      return `${object.uri.current}`
    }
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
  const href = getHref()

  return href ? (
    <Link variant="affiliate" target='_blank' href={href}>
      {object.title}
    </Link>
  ) : null
}

export default ButtonObject
