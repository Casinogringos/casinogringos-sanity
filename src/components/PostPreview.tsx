import InternalLink from './InternalLink'
export default function PostPreview({ slug }) {
  return (
    <div>
      <div className="mb-5">
        {/* {coverImage && (
          <CoverImage title={title} coverImage={coverImage} slug={slug} />
        )} */}
      </div>
      <h2 className="mb-3 text-xl leading-snug">
        <InternalLink
          href={`/${slug}`}
          prefetch={false}
          className="text-lg hover:underline"
          // dangerouslySetInnerHTML={{ __html: title }}
        ></InternalLink>
      </h2>
      {/* <div className="mb-4 text-lg">
        <Date dateString={date} />
      </div>
      <Avatar author={author} /> */}
    </div>
  )
}
