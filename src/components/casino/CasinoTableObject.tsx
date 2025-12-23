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
  const casinosWithIndexes = casinos
    .map((casino, originalIndex) => ({ casino, originalIndex }))
    .filter(({ casino }) => !casino.excludeFromToplists)
    .sort((a, b) => {
      const aRank = a.casino.roiRank ?? Number.MAX_SAFE_INTEGER
      const bRank = b.casino.roiRank ?? Number.MAX_SAFE_INTEGER
      if (aRank !== bRank) return aRank - bRank
      return a.originalIndex - b.originalIndex
    })
    .map(({ casino }) => casino)
  const casinosToShow = count
    ? casinosWithIndexes.slice(0, count)
    : casinosWithIndexes

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
