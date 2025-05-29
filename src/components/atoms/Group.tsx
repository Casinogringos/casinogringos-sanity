import BlocksMap from '../blocks/BlocksMap'
import { CoreGroupBlock } from '@/src/types/coreGroupBlock'

const Group = ({ group }: { group: CoreGroupBlock }) => {
  return (
    <div className={`${group.attributes?.className} mb-4`}>
      <BlocksMap blocks={group.innerBlocks} />
    </div>
  )
}

export default Group
