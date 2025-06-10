const Avatar = dynamic(() => import('@/src/app/components/organisms/Avatar'))
import PostTitle from './PostTitle'
import dynamic from 'next/dynamic'

export default function PostHeader({
  title,
  modified,
  author,
  shareTitle,
  reviewedBy = null,
}) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <Avatar
        shareTitle={shareTitle}
        reviewedBy={reviewedBy}
        author={author}
        modified={modified}
        date={null}
      />
    </>
  )
}
