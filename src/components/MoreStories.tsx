// import PostPreview from './post-preview'

export default function MoreStories() {
  return (
    <section>
      <h2 className="mb-8 text-3xl font-bold tracking-tighter leading-tight">
        Fler casino recensioner
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-4 gap-y-4 lg:gap-10 md:gap-y-32">
        {/* {posts.map(({ node }) => (
          <PostPreview
            key={node.slug}
            title={node.title}
            coverImage={node.featuredImage}
            date={node.date}
            author={node.author}
            slug={node.slug}
            excerpt={node.excerpt}
          />
        ))} */}
      </div>
    </section>
  )
}
