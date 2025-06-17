import { ImageObject as ImageObjectType } from '@/src/types'
import SanityImage from '@/src/components/atoms/SanityImage'

const ImageObject = ({ object }: { object: ImageObjectType }) => {
  return <SanityImage image={object.image} altText={object.altText} />
}

export default ImageObject
