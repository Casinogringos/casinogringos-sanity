import { ImageObjectSchemaType } from '@/src/schemas/imageObject'
import SanityImage from '@/src/components/atoms/SanityImage'

const ImageObject = ({ object, className }: { object: ImageObjectSchemaType, className?: string }) => {
  return <SanityImage image={object} className={className} />
}

export default ImageObject
