'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

export default function BottomNavigation({ menu }) {
  const [isVisible, setIsVisible] = useState(false)

  const checkScroll = useCallback(() => {
    if (window.scrollY >= 400) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [])

  useEffect(() => {
    checkScroll()
    window.addEventListener('scroll', checkScroll)

    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [checkScroll])

  return (
    <div
      className={`${isVisible ? '' : 'translate-y-[100%]'} transition sticky md:hidden bottom-0 bg-dark w-full z-20 px-2`}
    >
      <ul className="flex w-full items-center justify-between">
        {menu.menuItems.edges.map(({ node: item }) => (
          <li key={item.id}>
            <Link
              className="flex h-full w-full flex-col items-center justify-center gap-1 px-3.5 pb-3 pt-2 text-xs3 font-medium uppercase text-white focus:bg-darklight"
              href={item.uri}
            >
              <Image
                src={`/icon-${item.cssClasses}.svg`}
                width={18}
                height={18}
                className="invert"
                alt={item.label}
              />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
