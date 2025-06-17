import { ColumnsObject as ColumnsObjectType } from '@/src/types'
import ModularContent from '@/src/components/organisms/ModularContent'

const ColumnsObject = ({ object }: { object: ColumnsObjectType }) => {
  const { columns } = object

  return (
    <div
      className={
        'gap-[30px] my-12 lg:flex-nowrap prose-lg prose-h2:mt-0 prose-h3:mt-0 flex box-border flex-wrap'
      }
    >
      {columns.map((column) => {
        return (
          <div
            key={`column-${column._key}`}
            style={
              column.width
                ? // @ts-expect-error -- invalid css class
                  // @
                  { '--column-block-width': column.width }
                : {}
            }
            className={`column-block min-w-0 break-words lg:flex-grow lg:basis-0 ${
              column.className ?? ''
            }`}
          >
            <ModularContent objects={column.column} nested={true} />
          </div>
        )
      })}
    </div>
  )
}

export default ColumnsObject
