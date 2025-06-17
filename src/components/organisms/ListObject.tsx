import { ListObject as ListObjectType } from '@/src/types'
import ModularContent from '@/src/components/organisms/ModularContent'

const ListObject = ({ object }: { object: ListObjectType }) => {
  return (
    <div>
      <ul>
        {object.items.map((item) => (
          <li key={item._key}>
            <ModularContent objects={item.content} nested={true} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListObject
