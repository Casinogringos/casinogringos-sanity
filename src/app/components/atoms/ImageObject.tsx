import { ImageObject as ImageObjectType } from '@/src/types'
import SanityImage from '@/src/app/components/atoms/SanityImage'

const ImageObject = ({ object }: { object: ImageObjectType }) => {
  return <SanityImage image={object.image} altText={object.altText} />
}

export default ImageObject
