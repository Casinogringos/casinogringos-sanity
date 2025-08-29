import Avatar from '@/src/components/organisms/Avatar'
import Heading from '@/src/components/atoms/Heading'
import { NewsPageSchemaType } from '@/src/schemas/newsPage'
import { GuidePageSchemaType } from '@/src/schemas/guidePage'
import GuidePageService from '@/src/services/GuidePageService'

const pageService = new GuidePageService()

const ArticleHeader = ({
  article,
}: {
  article: NewsPageSchemaType | GuidePageSchemaType
}) => {
  console.log('article', article)
  return (
    <>
      <Heading text={article.title} level={1} size={8} className="font-bold" />
      {article.author ? (
        <Avatar
          shareTitle={article.seoTitle}
          reviewer={article.reviewer}
          author={article.author}
          modifiedAt={pageService.getPageModifiedAtTimestamp(article)}
          createdAt={pageService.getPagePublishedAtTimestamp(article)}
        />
      ) : null}
    </>
  )
}

export default ArticleHeader
