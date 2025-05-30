'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
const Overlay = dynamic(() => import('@/src/components/atoms/Overlay'))

const ModalSidebar = ({
  isOpen,
  isClosing,
  close,
  children,
}: {
  isOpen: boolean
  isClosing: boolean
  close: () => void
  children: ReactNode
}) => {
  return (
    <>
      {isOpen && <Overlay closing={isClosing} close={close} />}
      <div
        className={`fixed max-w-full right-0 top-14 lg:top-16 bottom-0 p-5 w-full md:w-96 bg-white z-[100] ease-in-out duration-300 overflow-y-auto ${
          isOpen && !isClosing ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {children}
      </div>
    </>
  )
}

export default ModalSidebar
