'use client'

import { PlayCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { SlotPage } from '@/src/types/slotPage'
const IFrame = dynamic(() => import('@/src/components/organisms/IFrame'))

const SlotHero = ({ slot }: { slot: SlotPage }) => {
  const [show, setShow] = useState(false)
  const toggleGame = () => {
    setShow(!show)
  }

  return (
    <div className="relative overflow-hidden bg-slate900">
      <div className="absolute left-0 top-0 h-full w-full object-fill blur-2xl">
        <Image
          priority={true}
          quality={1}
          src={slot.featuredImage?.node.sourceUrl}
          className="h-full w-full object-cover"
          alt={slot.featuredImage?.node.altText}
          width={250}
          height={250}
        />
      </div>
      <div className="relative mx-auto mt-0 flex w-full flex-col items-start justify-center gap-2 bg-black bg-opacity-50 px-2 pb-4 pt-2 text-center lg:my-6 lg:max-w-5xl lg:flex-row lg:bg-opacity-90 lg:py-2">
        <section className="relative w-full">
          {!show && (
            <div className="flex h-72 w-full flex-col items-center justify-center lg:h-100">
              <span className="mb-2 text-2xl font-bold tracking-tight text-white lg:text-3xl">
                {slot.title}
              </span>
              {props?.slotType?.speltillverkare && (
                <p className="text-sm text-slate100">
                  {slot.slotType.speltillverkare.name}
                </p>
              )}
              <div className="mt-5 flex flex-col justify-center px-6 lg:mt-8 lg:flex-row lg:gap-4">
                {slot.slotType.demoUrl && (
                  <button
                    onClick={() => toggleGame()}
                    className="mb-4 flex items-center justify-center gap-2 rounded-sm bg-blue100 px-12 py-4 font-medium lg:mb-0"
                  >
                    <PlayCircle className="h-6 w-6" /> Spela demo
                  </button>
                )}
                {slot.slotType.casinos && (
                  <Link
                    href="#spela"
                    className="mb-4 flex items-center justify-center gap-2 rounded-sm bg-button px-8 py-4 font-medium text-white hover:bg-buttonHover lg:mb-0"
                  >
                    Spela för riktiga pengar
                  </Link>
                )}
              </div>
            </div>
          )}
          {show && slot.slotType.demoUrl && (
            <>
              <div className="mb-2">
                <div className="flex items-center px-2 py-1">
                  <span className="lg:text-md py-1 text-sm text-gray200">
                    Demo: {slot.title}
                  </span>
                  {slot.slotType.casinos.length > 1 && (
                    <Link
                      href="#spela"
                      className="hover:bg-gray-500 ml-auto flex items-center justify-center rounded-sm bg-button px-2 py-1.5 text-xs font-medium text-white"
                    >
                      Spela för riktiga pengar
                    </Link>
                  )}
                </div>
              </div>
              <IFrame url={slot.slotType.demoUrl} />
            </>
          )}
        </section>
      </div>
    </div>
  )
}

export default SlotHero
