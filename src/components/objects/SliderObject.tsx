import { SliderObjectSchemaType } from '@/src/schemas/sliderObject'
import Heading from '@/src/components/atoms/Heading'
import Image from 'next/image'
import Link from '@/src/components/atoms/Link'
import DateComponent from '@/src/components/atoms/Date'
import UtilityService from '@/src/services/UtilityService'

const utilityService = new UtilityService()

interface ItemSchemaType {
    _id: string
    _type: string
    featuredImage: { _type: string, src: string, alt: string }
    title: string
    originalModifiedAt: string
    originalPublishedAt: string
    _createdAt: string
    _updatedAt: string
    slug: { current: string }
}

const Item = ({ item }: { item: ItemSchemaType }) => {
    const getPublishedDate = () => {
        switch (item._type) {
            case 'casino-pages':
                return utilityService.getPublishedTimestamp({
                    originalPublishedAt: new Date(item.originalPublishedAt).getTime(),
                    newCreatedAt: new Date(item._createdAt).getTime()
                })
            case 'pages':
                return utilityService.getPublishedTimestamp({
                    originalPublishedAt: new Date(item.originalPublishedAt).getTime(),
                    newCreatedAt: new Date(item._createdAt).getTime()
                })
            case 'news-pages':
                return utilityService.getPublishedTimestamp({
                    originalPublishedAt: new Date(item.originalPublishedAt).getTime(),
                    newCreatedAt: new Date(item._createdAt).getTime()
                })
            case 'slot-pages':
                return utilityService.getPublishedTimestamp({
                    originalPublishedAt: new Date(item.originalPublishedAt).getTime(),
                    newCreatedAt: new Date(item._createdAt).getTime()
                })
            case 'guide-pages':
                return utilityService.getPublishedTimestamp({
                    originalPublishedAt: new Date(item.originalPublishedAt).getTime(),
                    newCreatedAt: new Date(item._createdAt).getTime()
                })
            default:
                return new Date(item.originalPublishedAt).getTime() ?? new Date(item._createdAt).getTime()
        }
    }
    const href = utilityService.getHref({ slug: item.slug.current, type: item._type })

    return (
        <Link href={href} className='w-[300px] p-3 block bg-blue-50 hover:bg-blue-50/50 transition-colors ease-in-out duration-200 h-full border border-blue-100 rounded-md'>
            {item.featuredImage.src && <div className='h-[120px] relative mb-2'><Image className='object-cover h-full w-full absolute' src={item.featuredImage.src} alt={item.featuredImage.alt} width={500} height={500} /></div>}
            <Heading text={item.title} level={2} size={4} className='font-bold not-prose' />
            <DateComponent className='text-xs text-slate-500' timestamp={getPublishedDate() ?? 0} />
        </Link>
    )
}

const SliderObject = ({ object }: { object: SliderObjectSchemaType }) => {
    console.log('slider object', object)
    const { category, items } = object
    const manualItems = items?.map((item, index): ItemSchemaType => {
        return {
            _id: item._id,
            _type: item._type,
            featuredImage: item.featuredImage ?? { _type: 'image-object', src: '', alt: '' },
            title: item.title,
            originalModifiedAt: item.originalModifiedAt ?? '',
            originalPublishedAt: item.originalPublishedAt ?? '',
            _createdAt: item._createdAt,
            _updatedAt: item._updatedAt,
            slug: item.slug
        }
    }) || []
    const categoryItems = category?.items?.map((item, index): ItemSchemaType => {
        return {
            _id: item._id,
            _type: item._type,
            featuredImage: item.featuredImage ?? { _type: 'image-object', src: '', alt: '' },
            title: item.title,
            originalModifiedAt: item.originalModifiedAt ?? '',
            originalPublishedAt: item.originalPublishedAt ?? '',
            _createdAt: item._createdAt,
            _updatedAt: item._updatedAt,
            slug: item.slug
        }
    }) || []
    const mergedItems = [...manualItems, ...categoryItems]

    return <div className='not-prose overflow-x-auto'>
        <div className='flex gap-2 items-stretch'>
            {mergedItems.map((item, index) => (
                <div key={`slider-item-${item._id}`}>
                    <Item item={item} />
                </div>
            ))}
        </div>
    </div>
}

export default SliderObject
