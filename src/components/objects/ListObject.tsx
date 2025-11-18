import ModularContent from '@/src/components/content/ModularContent'
import { ListObjectSchemaType } from '@/src/schemas/listObject'
import Image from 'next/image'

const ListObject = ({
  object,
  className,
}: {
  object: ListObjectSchemaType
  className?: string
}) => {
  if (object.numbered) {
    return (
      <ol className={`not-prose p-0 !mb-0 numbered-list ${className}`}>
        {object.items.map((item) => (
          <li key={item._key} className="numbered-list__item">
            <ModularContent objects={item.content} nested={true} />
          </li>
        ))}
      </ol>
    )
  }
  return (
    <ul className={`not-prose p-0 ${className}`}>
      {object.items.map((item) => (
        <li
          key={item._key}
          className={`my-2 flex items-start ${
            !object.showIcon || !object.icon ? 'dot-list-item' : ''
          }`}
        >
          {object.showIcon && object.icon && (
            <Image
              src={object.icon.src}
              alt={object.icon.alt}
              width={10}
              height={10}
              className="mt-3"
            />
          )}
          <ModularContent objects={item.content} nested={true} />
        </li>
      ))}
    </ul>
  )
}

export default ListObject
