import { JSX } from 'react'

const Table = ({
  headingCells,
  bodyCells,
}: {
  headingCells: string[]
  bodyCells: JSX.Element[][]
}) => {
  return (
    <div className={'overflow-x-auto'}>
      <table className={'w-full'}>
        <thead>
          <tr>
            {headingCells.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyCells.map((bodyRow, index) => (
            <tr key={index}>
              {bodyRow.map((bodyCell, index) => (
                <td key={index}>{bodyCell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
