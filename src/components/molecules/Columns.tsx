import Content from '../organisms/Content'
import type { CoreColumnsBlock } from '@/types'

const Columns = ({ columns }: { columns: CoreColumnsBlock }) => {
  return (
    <div
      className={`gap-[30px] my-12 lg:flex-nowrap prose-lg prose-h2:mt-0 prose-h3:mt-0 flex box-border flex-wrap ${
        columns.attributes?.className ?? ''
      }`}
    >
      {columns.innerBlocks.map((column, index) => {
        return (
          <div
            key={`column-${index}`}
            style={
              column.attributes.columnWidth
                ? // @ts-expect-error -- invalid css class
                  // @
                  { '--column-block-width': column.attributes.columnWidth }
                : {}
            }
            className={`column-block min-w-0 break-words lg:flex-grow lg:basis-0 ${
              column.attributes?.className ?? ''
            }`}
          >
            <Content blocks={column.innerBlocks} />
          </div>
        )
      })}
    </div>
  )
}

export default Columns
