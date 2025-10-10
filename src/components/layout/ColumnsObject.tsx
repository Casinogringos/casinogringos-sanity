import { ColumnsObjectSchemaType as ColumnsObjectType } from '@/src/schemas/columnsObject'
import ModularContent from '@/src/components/content/ModularContent'

const ColumnsObject = ({ object }: { object: ColumnsObjectType }) => {
  const { columns } = object
  const colorClasses = {
    grey: 'bg-slate-100',
    blueLight: 'bg-blue-light',
    white: 'bg-white',
  }

  return (
    <div
      className={`gap-[30px] my-12 lg:flex-nowrap prose-img prose-h2:mt-0 prose-h3:mt-0 flex box-border flex-wrap`}
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
            className={`column-block rounded-md pb-4 min-w-0 break-words lg:flex-grow lg:basis-0 ${column.className ?? ''} ${colorClasses[column.backgroundColor as keyof typeof colorClasses]}`}
          >
            <ModularContent nested objects={column.column} nested={true} />
          </div>
        )
      })}
    </div>
  )
}

export default ColumnsObject
