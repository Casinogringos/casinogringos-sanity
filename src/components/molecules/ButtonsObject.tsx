import { ButtonsObject as ButtonsObjectType } from '@/src/types'
import ButtonObject from '@/src/components/molecules/ButtonObject'

const ButtonsObject = ({ object }: { object: ButtonsObjectType }) => {
  return (
    <div className={'flex flex-wrap justify-center gap-4'}>
      {object.buttons.map((button) => (
        <ButtonObject key={button._key} object={button} />
      ))}
    </div>
  )
}

export default ButtonsObject
