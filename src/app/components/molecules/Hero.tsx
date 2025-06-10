import Container from '@/src/app/components/atoms/Container'
import dynamic from 'next/dynamic'
import { User } from '@/src/types'
const HeroAvatar = dynamic(() => import('../organisms/HeroAvatar'))

export default function Hero({
  title,
  description,
  author,
  date,
  modified,
  shareTitle,
}: {
  title: string
  description: string
  author?: User
  date?: string
  modified?: string
  shareTitle?: string
}) {
  return (
    <div className="relative bg-darklight">
      <Container>
        <div className="py-6 lg:pt-12 lg:pb-14">
          <h1 className="text-3xl lg:text-4xl max-w-xl text-white font-bold leading-none">
            {title}
          </h1>
          <div
            className="mt-4 max-w-4xl lg:text-lg leading-6 text-slate200"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {author && (
            <div className="mt-6">
              <HeroAvatar
                author={author}
                date={date}
                modified={modified}
                shareTitle={shareTitle}
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
