import CasinoTableRow from '@/src/components/casino/CasinoTableRow'
import Placeholder from '@/src/components/utils/Placeholder'
import { CasinoTableObjectSchemaType } from '@/src/schemas/casinoTableObject'

const CasinoTableObject = ({
  object,
  bonusCategories,
}: {
  object: CasinoTableObjectSchemaType
  bonusCategories?: { value: string }[]
}) => {
  const { toplist, count } = object
  if (!toplist || !toplist.casinos || toplist.casinos.length === 0) {
    return <Placeholder message="No toplist found" />
  }
  const { title, description, casinos } = toplist
  const casinosToShow = count ? casinos.slice(0, count) : casinos

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
          {casinosToShow.map((casino, index) => (
            <CasinoTableRow
              key={`${casino._id}-${index}`}
              casino={casino}
              index={index}
              bonusCategories={bonusCategories}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CasinoTableObject
