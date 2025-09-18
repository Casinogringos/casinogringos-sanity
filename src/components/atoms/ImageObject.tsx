import { ImageObjectSchemaType } from '@/src/schemas/imageObject'
import SanityImage from '@/src/components/atoms/SanityImage'

const ImageObject = ({ object, className, prose, rounded }: { object: ImageObjectSchemaType, className?: string, prose?: boolean, rounded?: string }) => {
  return <SanityImage image={object} className={className} prose={prose} rounded={rounded} />
}

export default ImageObject
