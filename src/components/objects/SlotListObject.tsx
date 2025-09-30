import { SlotListObjectSchemaType } from '@/src/schemas/slotListObject'
import SlotCard from '@/src/components/slot/SlotCard'
import Link from '@/src/components/content/Link'

const SlotListObject = ({ object }: { object: SlotListObjectSchemaType }) => {
  const { slots } = object

  return (
    <section className="not-prose">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {slots.map((slotPage, index) => (
          <li key={`slot-${slotPage._id}`}>
            <SlotCard slotPage={slotPage} />
          </li>
        ))}
      </ul>
      <div className="text-right">
        <Link underline={true} href="/slots">
          Visa fler slots
        </Link>
      </div>
    </section>
  )
}

export default SlotListObject
