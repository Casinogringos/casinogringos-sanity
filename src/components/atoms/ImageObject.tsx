import { ImageObjectSchemaType } from '@/src/schemas'
import SanityImage from '@/src/components/atoms/SanityImage'

const ImageObject = ({ object }: { object: ImageObjectSchemaType }) => {
  console.log('object', object)
  return <SanityImage image={object} />
}

export default ImageObject
