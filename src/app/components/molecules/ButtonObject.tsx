import { ButtonObject as ButtonObjectType } from '@/src/types'
import Link from '@/src/app/components/atoms/Link'

const ButtonObject = ({ object }: { object: ButtonObjectType }) => {
  console.log('button object', object)
  const getHref = () => {
    if (!object.page) {
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
    }
  }

  return <Link href={getHref()}>{object.title}</Link>
}

export default ButtonObject
