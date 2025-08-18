import { GroupObjectSchemaType as GroupObjectType } from '@/src/schemas/groupObject'
import ModularContent from '@/src/components/organisms/ModularContent'

const GroupObject = ({ object, className }: { object: GroupObjectType, className?: string }) => {
  const classes = () => {
    switch (object.backgroundColor) {
      case 'gray':
        return 'bg-slate-200'
      case 'transparent':
        return 'bg-transparent'
      default:
        return 'bg-slate-200'
    }
  }

  return (
    <div className={`${classes()} mb-4 rounded-lg p-5 ${className}`}>
      <ModularContent objects={object.content} nested={true} />
    </div>
  )
}

export default GroupObject
