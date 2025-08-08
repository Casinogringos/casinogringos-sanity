import { CasinoListObjectSchemaType } from '@/src/schemas'
import Heading from '@/src/components/atoms/Heading'
import CasinoRow from '@/src/components/organisms/CasinoRow'
import Placeholder from '../atoms/Placeholder'

const CasinoListObject = ({ object }: { object: CasinoListObjectSchemaType }) => {
    const { toplist } = object
    console.log('toplist', toplist)
    if (!toplist || !toplist.casinos || toplist.casinos.length === 0) {
        return <Placeholder message="No toplist found" />
    }
    const { title, description, casinos } = toplist

    return (
        <section>
            <div>
                {casinos.map((casino) => (
                    <CasinoRow key={casino._id} casino={casino} pathname={casino.slug.current} />
                ))}
            </div>
        </section>
    )
}

export default CasinoListObject
