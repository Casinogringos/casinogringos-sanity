import ButtonObject from '@/src/components/molecules/ButtonObject'
import { ButtonsObjectSchemaType } from '@/src/schemas/buttonsObject'

const ButtonsObject = ({ object }: { object: ButtonsObjectSchemaType }) => {
  return (
    <div className={'flex flex-wrap justify-center gap-4'}>
      {object.buttons.map((button) => (
        <ButtonObject key={button._key} object={button} />
      ))}
    </div>
  )
}

export default ButtonsObject
