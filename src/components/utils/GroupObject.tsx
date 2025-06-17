import { GroupObject as GroupObjectType } from '@/src/types'
import ModularContent from '@/src/components/organisms/ModularContent'

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
