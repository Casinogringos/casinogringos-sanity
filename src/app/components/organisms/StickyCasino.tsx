'use client'

import { useState, useEffect } from 'react'
import ImageWrap from '../atoms/ImageWrap'
import dynamic from 'next/dynamic'
import { Casino } from '@/src/types/casino'
const Link = dynamic(() => import('@/src/app/components/atoms/Link'))

const StickyCasino = ({ casino }: { casino: Casino }) => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    })
  }, [])

  return (
    <div
      className={`${isVisible ? 'bottom-0 right-0 z-20' : 'translate-y-96'} bg-slate100 border-t border-t-slate200 p-3 lg:px-8 transition fixed w-full shadow-sm`}
    >
      <div className="max-w-4xl mx-auto lg:px-16 flex flex-col lg:flex-row gap-y-2 lg:gap-x-0 w-full items-center lg:justify-left justify-center">
        <div className="flex w-full items-center gap-x-4 lg:gap-x-6">
          <div className="flex h-12 w-20 items-center rounded-sm overflow-hidden">
            <ImageWrap
              image={casino?.featuredImage?.node}
              width={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="lg:w-3/3">
            <span className="text-slate500 font-semibold block -mt-1 my-0 text-lg">
              {casino?.title}
            </span>
            {casino?.postType && (
              <span className="text-dark text-sm lg:text-base -mt-0.5 lg:-mt-1 block font-semibold">
                {casino?.postType.title}
              </span>
            )}
          </div>
        </div>
        <div className="w-full lg:w-3/6 flex items-center lg:pb-0">
          <Link
            className="h-12 flex items-center lg:text-base w-full"
            text={`Till ${casino.title}`}
            place={casino.slug}
            affLink={casino.postType.affiliateLink.node}
          />
        </div>
      </div>
    </div>
  )
}

export default StickyCasino
