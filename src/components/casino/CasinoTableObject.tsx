import CasinoTableRow from '@/src/components/casino/CasinoTableRow'
import Placeholder from '@/src/components/utils/Placeholder'
import { CasinoTableObjectSchemaType } from '@/src/schemas/casinoTableObject'

const CasinoTableObject = ({
  object,
  bonusCategory,
}: {
  object: CasinoTableObjectSchemaType
  bonusCategory: string
}) => {
  const { toplist } = object
  if (!toplist || !toplist.casinos || toplist.casinos.length === 0) {
    return <Placeholder message="No toplist found" />
  }
  const { title, description, casinos: casinoPages } = toplist

  return (
    <div>
      <table>
        <thead>
          <tr className="bg-dark not-prose">
            <th className="text-white p-3 rounded-tl-md">RANK</th>
            <th className="text-white p-3">CASINO</th>
            <th className="text-white p-3">BONUS</th>
            <th className="text-white p-3 rounded-tr-md">SPELA</th>
          </tr>
        </thead>
        <tbody>
          {casinoPages.map((casinoPage, index) => (
            <CasinoTableRow
              key={`${casinoPage._id}-${index}`}
              casinoPage={casinoPage}
              index={index}
              bonusCategory={bonusCategory}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CasinoTableObject
