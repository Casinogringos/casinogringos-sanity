import ModularContent from '@/src/components/content/ModularContent'
import { GroupObjectSchemaType as GroupObjectType } from '@/src/schemas/groupObject'

const GroupObject = ({
  object,
  className,
}: {
  object: GroupObjectType
  className?: string
}) => {
  const classes = () => {
    switch (object.backgroundColor) {
      case 'gray':
        return 'bg-slate-100'
      case 'green':
        return 'bg-green-50 border border-green-200 before:bg-green-400'
      case 'red':
        return 'bg-red-50 border border-red-200 before:bg-red-400'
      case 'yellow':
        return 'bg-yellow'
      case 'green':
        return 'bg-green-50'
      case 'transparent':
        return 'bg-transparent'
      default:
        return 'bg-slate-100 border border-slate-200 before:bg-slate-300'
    }
  }

  return (
    <div
      className={`${classes()} mb-4 p-6 rounded-lg !pt-14 before:text-base relative before:rounded-b-full dark:text-dark before:top-0 before:left-6 before:w-12 before:h-7 before:absolute before:text-center before:content-['↓'] [&>p]:mb-6 [&>h3]:mb-3 [&>h2]:mb-3 ${className}`}
    >
      <ModularContent objects={object.content} nested={true} />
    </div>
  )
}

export default GroupObject
