import { AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Heading from '@/src/components/atoms/Heading'
import CasinoCard from './CasinoCard'
import Container from '../atoms/Container'
import CheckBadgeIcon from '../icons/CheckBadgeIcon'
import ToggleObject from '../molecules/ToggleObject'
import { PortableTextBlock } from 'next-sanity'
import ToggleButton from '@/src/components/atoms/ToggleButton'
import ToggleItem from '@/src/components/atoms/ToggleItem'
import { SlotListObjectSchemaType } from '@/src/schemas/slotListObject'
import SlotCard from '@/src/components/molecules/SlotCard'

const SlotListObject = ({
  object
}: {
  object: SlotListObjectSchemaType
}) => {
  const { slots } = object

  return (
    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 not-prose'>
      {slots.map((slotPage, index) => (
        <li key={`slot-${slotPage._id}`}>
          <SlotCard slotPage={slotPage} />
        </li>
      ))}
    </ul>
  )
}

export default SlotListObject
