import ModularContent from '../organisms/ModularContent'
import { CoreGroupBlock } from '@/src/types/coreGroupBlock'

const Group = ({ group }: { group: CoreGroupBlock }) => {
  return (
    <div className={`${group.attributes?.className} mb-4`}>
      <ModularContent objects={group.innerBlocks} />
    </div>
  )
}

export default Group
