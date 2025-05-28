import Date from '@/components/Date'
import ImageComponent from './ImageComponent'
import InternalLink from './InternalLink'

export default function News({ posts }) {
  return (
    <div className={`bg-blue100 py-10 sm:py-16`}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h2 className="text-gray-900 text-3xl font-bold tracking-tight">
          Våra casinoguider
        </h2>
        <p className="mt-4 text-slate600">
          Vi på Casinogringos har skrivit utförliga guider för att du enkelt ska
          få all information om bonusar, regler, olika spelstrategier och mycket
          mer. Med hjälp av dessa kommer du att bli en mer komplett
          casinospelare.
        </p>
        <div className="mx-auto mt-8 grid max-w-2xl auto-rows-fr grid-cols-1 items-start gap-x-8 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-y-20">
          {posts.map((post) => (
            <InternalLink
              href={post.node.uri}
              key={`post-${post.node.id}`}
              prefetch={false}
              className={
                'flex h-full bg-white pb-4 rounded-md flex-col items-start'
              }
            >
              <div className="relative flex h-36 w-full items-center overflow-hidden rounded-t-md">
                <ImageComponent
                  image={post?.node?.featuredImage?.node}
                  width={400}
                  className={'min-h-full min-w-full object-cover'}
                />
              </div>
              <div className="px-4">
                <div className="mt-4 flex items-center gap-x-4 text-xs text-slate500">
                  <Date dateString={post.node.date} />
                </div>
                <h3 className="text-gray900 group-hover:text-gray-600 mt-2 text-lg font-medium leading-6">
                  <span />
                  {post.node.title}
                </h3>
                {post?.node?.excerpt && (
                  <div
                    className="mt-2 line-clamp-3 text-sm leading-6 text-gray500"
                    dangerouslySetInnerHTML={{
                      __html: post?.node?.excerpt,
                    }}
                  />
                )}
              </div>
            </InternalLink>
          ))}
        </div>
        <InternalLink
          href="/guider"
          prefetch={false}
          className="ml-auto mt-10 flex w-fit rounded-md bg-dark px-4 py-2 font-medium text-white hover:text-primary"
        >
          Läs fler guider
        </InternalLink>
      </div>
    </div>
  )
}
