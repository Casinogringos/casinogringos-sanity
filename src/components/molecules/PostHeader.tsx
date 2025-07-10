import Avatar from '@/src/components/organisms/Avatar'
import Heading from '@/src/components/atoms/Heading'
import { GuidePageSchemaType, NewsPageSchemaType } from '@/src/schemas'

const PostHeader = ({
 post
}: {
  post: NewsPageSchemaType | GuidePageSchemaType
}) => {
  return (
    <>
      <Heading
        text={post.title}
        level={1}
        />
      {post.author && post.reviewer && <Avatar
        shareTitle={post.seoTitle}
        reviewer={post.reviewer}
        author={post.author}
        modified={post._updatedAt ?? post.originalModifiedAt}
        date={post.originalPublishedAt ?? post._createdAt}
      />}
    </>
  )
}

export default PostHeader