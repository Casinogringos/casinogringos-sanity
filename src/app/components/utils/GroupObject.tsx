import ModularContent from '../organisms/ModularContent'
import { GroupObject as GroupObjectType } from '@/src/types'

const GroupObject = ({ object }: { object: GroupObjectType }) => {
  const className = () => {
    switch (object.variant) {
      case 'success':
        return 'bg-slate-100'
      default:
        return 'bg-slate-100'
    }
  }

  return (
    <div className={`${className()} mb-4`}>
      <ModularContent objects={object.content} nested={true} />
    </div>
  )
}

export default GroupObject
