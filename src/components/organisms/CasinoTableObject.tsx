import CasinoTableRow from '@/src/components/organisms/CasinoTableRow'
import Placeholder from '@/src/components/atoms/Placeholder'
import { CasinoTableObjectSchemaType } from '@/src/schemas/casinoTableObject'

const CasinoTableObject = ({ object }: { object: CasinoTableObjectSchemaType }) => {
    const { toplist } = object
    if (!toplist || !toplist.casinos || toplist.casinos.length === 0) {
        return <Placeholder message="No toplist found" />
    }
    const { title, description, casinos } = toplist

    return (
        <section>
            <table>
                <thead>
                    <tr>
                        <th>RANK</th>
                        <th>CASINO</th>
                        <th>BONUS</th>
                        <th>SPELA</th>
                    </tr>
                </thead>
                <tbody>
                    {casinos.map((casino, index) => (
                        <CasinoTableRow key={casino._id} casinoPage={casino} index={index} />
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default CasinoTableObject
