import Container from '@/src/app/components/atoms/Container'
import BlocksMap from '@/components/blocks/BlocksMap'
import { Blocks } from '@/types/blocks'

export default function Content({
  blocks,
  className = '',
}: {
  blocks: Blocks
  className?: string
}) {
  return (
    <Container>
      <div
        className={`${className} pb-8 pt-4 mx-auto prose prose-h2:text-3xl prose-p:text-text prose-headings:tracking-normal max-w-3xl text-grey-darker`}
      >
        <BlocksMap blocks={blocks} />
      </div>
    </Container>
  )
}
