import Content from '../organisms/Content'
import { CoreGroupBlock } from '@/src/types/coreGroupBlock'

const Group = ({ group }: { group: CoreGroupBlock }) => {
  return (
    <div className={`${group.attributes?.className} mb-4`}>
      <Content blocks={group.innerBlocks} />
    </div>
  )
}

export default Group
