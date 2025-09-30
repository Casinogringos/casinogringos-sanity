'use client'

import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const checkScroll = () => {
    if (window.scrollY >= 400) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }
  useEffect(() => {
    checkScroll()
    window.addEventListener('scroll', checkScroll)

    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [])

  return (
    <>
      <button
        aria-label={'Scrolla till toppen'}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className={`${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
        } transition-all ease-in-out duration-150 fixed bottom-7 lg:bottom-4 right-4 size-10 flex items-center justify-center bg-dark border border-white rounded-full`}
      >
        <ChevronUp className={'text-white'} />
      </button>
    </>
  )
}

export default ScrollToTop
