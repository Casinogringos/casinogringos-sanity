import { ListObjectSchemaType } from '@/src/schemas/listObject'
import ModularContent from '@/src/components/organisms/ModularContent'
import Image from 'next/image'

const ListObject = ({ object, className }: { object: ListObjectSchemaType, className?: string }) => {

  if (object.numbered) {
    return (
      <div className={`not-prose ${className}`}>
        <ol className='p-0'>
          {object.items.map((item, index) => (
            <li key={item._key} className='flex items-center gap-2 my-2'>
              <span className='rounded-full w-6 h-6 flex items-center justify-center bg-green-500 text-white'>{index + 1}</span>
              <ModularContent objects={item.content} nested={true} />
            </li>
          ))}
        </ol>
      </div>
    )
  }
  console.log('object', object.icon)
  return (
    <div className={`not-prose ${className}`}>
      <ul className='p-0'>
        {object.items.map((item) => (
          <li key={item._key} className={`my-2 flex items-start gap-2 ${!object.showIcon ? 'bullets' : ''}`}>
            {object.showIcon && object.icon && <Image src={object.icon.src} alt={object.icon.alt} width={10} height={10} className='mt-3' />}
            <ModularContent objects={item.content} nested={true} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListObject
