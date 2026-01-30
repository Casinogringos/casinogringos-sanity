import Heading from '@/src/components/content/Heading'
import Link from '@/src/components/content/Link'
import { SlotPagePreviewSchemaType } from '@/src/schemas/slotPagePreview'
import Image from 'next/image'

const SlotCard = ({ slotPage }: { slotPage: SlotPagePreviewSchemaType }) => {
  if (!slotPage.slot) return null

  return (
    <Link
      className="not-prose block bg-white rounded-md overflow-hidden"
      prefetch={false}
      href={`${process.env.NEXT_PUBLIC_SITE_URL}/slots/${slotPage.slug.current}`}
    >
      <div className="relative flex h-28 w-full overflow-hidden lg:h-40">
        <Image
          width={600}
          height={500}
          src={slotPage.featuredImage.src}
          alt={slotPage.featuredImage.alt}
          sizes="(max-width: 768px) 100vw, 600px"
          className={'min-h-full min-w-full object-cover'}
        />
      </div>
      <div className="p-4 flex flex-col items-center text-center">
        <Heading
          className="!mt-0 !p-0 !mb-2"
          level={3}
          text={slotPage.title}
          sizes={[3, 3, 4]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col items-center">
            <span className="!text-slate-500 font-medium">Lanserades</span>
            <span className="!text-black font-bold text-base">
              {slotPage.slot.launchDate}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="!text-slate-500 font-medium">RTP</span>
            <span className="!text-black font-bold text-base">
              {slotPage.slot.rtpRange[1]
                ? slotPage.slot.rtpRange[1]
                : slotPage.slot.rtpRange[0]}
              %
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SlotCard
