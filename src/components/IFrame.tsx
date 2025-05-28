'use client'

import { ChevronLeft, Maximize, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import InternalLink from './InternalLink'
const IFrame = ({ url }: { url: string }) => {
  const iFrameRef = useRef<null | HTMLIFrameElement>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }
  useEffect(() => {
    if (isFullScreen) {
      iFrameRef.current?.classList.add(
        'fixed',
        'top-0',
        'left-0',
        'w-screen',
        'z-[100]'
      )
      document.documentElement.classList.add('overflow-hidden')
    } else {
      iFrameRef.current?.classList.remove(
        'fixed',
        'top-0',
        'left-0',
        'w-screen',
        'z-[100]'
      )
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [isFullScreen])

  return (
    <>
      <div className={`aspect-w-16 aspect-h-9 relative h-64 lg:h-100`}>
        <iframe
          ref={iFrameRef}
          width="100%"
          className="w-full"
          src={url}
          loading="lazy"
          style={{ height: isFullScreen ? window.innerHeight - 50 : '100%' }}
        />
      </div>
      <div
        className={`bg-black px-2 lg:px-0 lg:mt-2 py-2 lg:py-1 z-[100] flex justify-start items-center ${
          isFullScreen ? 'fixed bottom-0 left-0 w-screen h-[50px]' : ''
        }`}
      >
        <InternalLink
          href="/slots"
          prefetch={false}
          className="flex items-center gap-1 text-sm text-white"
        >
          <ChevronLeft className="h-4 w-4 text-white" />
          Visa alla slots
        </InternalLink>
        <button
          onClick={() => toggleFullScreen()}
          className={`text-white flex ml-auto items-center lg:hover:text-gray200 gap-2 lg:text-md ${
            isFullScreen ? 'text-md pr-4' : 'text-sm pr-1'
          }`}
        >
          {isFullScreen ? (
            <>
              <X className="h-4 w-4" />
              Avsluta fullskärmsläge
            </>
          ) : (
            <>
              <Maximize className="h-4 w-4" /> Fullskärmsläge
            </>
          )}
        </button>
      </div>
    </>
  )
}

export default IFrame
