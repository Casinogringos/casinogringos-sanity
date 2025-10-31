import { ToggleObjectSchemaType } from '@/src/schemas/toggleObject'
import ToggleBox from '@/src/components/layout/ToggleBox'

const ToggleObject = ({ object, className }: { object: ToggleObjectSchemaType, className?: string }) => {

  return (
    <ToggleBox
      buttonTextOpen={object.buttonTextOpen}
      buttonTextClose={object.buttonTextClose}
      innerBlocks={object.content}
      className={className}
    />
  )
}

export default ToggleObject
