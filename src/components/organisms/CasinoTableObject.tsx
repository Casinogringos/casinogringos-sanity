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
                    <tr className='bg-dark not-prose'>
                        <th className='text-white p-3 rounded-tl-md'>RANK</th>
                        <th className='text-white p-3'>CASINO</th>
                        <th className='text-white p-3'>BONUS</th>
                        <th className='text-white p-3 rounded-tr-md'>SPELA</th>
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
