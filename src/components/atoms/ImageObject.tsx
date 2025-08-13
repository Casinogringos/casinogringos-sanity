import { ImageObjectSchemaType } from '@/src/schemas/imageObject'
import SanityImage from '@/src/components/atoms/SanityImage'

const ImageObject = ({ object }: { object: ImageObjectSchemaType }) => {
  return <SanityImage image={object} />
}

export default ImageObject
