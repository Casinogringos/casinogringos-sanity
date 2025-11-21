import { PlayCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import ToggleItem from '../interactivity/ToggleItem'
import ToggleButton from '../interactivity/ToggleButton'
import Image from 'next/image'
import { SlotPageSchemaType } from '@/src/schemas/slotPage'
const IFrame = dynamic(() => import('@/src/components/content/IFrame'))

const SlotHero = ({ slotPage }: { slotPage: SlotPageSchemaType }) => {
  return (
    <div className="relative overflow-hidden bg-slate-900">
      <div className="absolute left-0 top-0 h-full w-full object-fill blur-2xl">
        <Image
          priority={true}
          src={slotPage.featuredImage.src}
          alt={slotPage.featuredImage.alt}
          className="h-full w-full object-cover"
          width={250}
          height={250}
        />
      </div>
      <div className="relative mx-auto mt-0 flex w-full flex-col items-start justify-center gap-2 bg-black bg-opacity-50 px-2 pb-4 pt-2 text-center lg:my-6 lg:max-w-5xl lg:flex-row lg:bg-opacity-90 lg:py-2">
        <section className="relative w-full">
          <ToggleItem reverse id={`slot-demo-${slotPage._id}`}>
            <div className="flex h-72 w-full flex-col items-center justify-center lg:h-100">
              <span className="mb-2 text-2xl font-bold tracking-tight text-white lg:text-3xl">
                {slotPage.title}
              </span>
              {slotPage.slot.provider && (
                <p className="text-sm text-slate-100">
                  {slotPage.slot.provider.name}
                </p>
              )}
              <div className="mt-5 flex flex-col justify-center px-6 lg:mt-8 lg:flex-row lg:gap-4">
                {slotPage.slot.demoUrl && (
                  <ToggleButton
                    id={`slot-demo-${slotPage._id}`}
                    role="button"
                    label="Spela demo"
                  >
                    <div className="mb-4 flex items-center justify-center gap-2 rounded-sm bg-blue-100 px-12 py-4 font-medium lg:mb-0">
                      <PlayCircle className="h-6 w-6" /> Spela demo
                    </div>
                  </ToggleButton>
                )}
                <Link
                  href="#spela"
                  className="hover:bg-gray-500 ml-auto flex items-center justify-center rounded-sm bg-button px-4 py-1.5 font-medium text-white"
                >
                  Spela för riktiga pengar
                </Link>
              </div>
            </div>
          </ToggleItem>
          <ToggleItem id={`slot-demo-${slotPage._id}`}>
            <div className="mb-2">
              <div className="flex items-center px-2 py-1">
                <span className="lg:text-md py-1 text-sm text-gray-200">
                  Demo: {slotPage.title}
                </span>
                <Link
                  href="#spela"
                  className="hover:bg-gray-500 ml-auto flex items-center justify-center rounded-sm bg-button px-2 py-1.5 text-xs font-medium text-white"
                >
                  Spela för riktiga pengar
                </Link>
              </div>
            </div>
            {slotPage.slot.demoUrl && <IFrame url={slotPage.slot.demoUrl} />}
          </ToggleItem>
        </section>
      </div>
    </div>
  )
}

export default SlotHero
