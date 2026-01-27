'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
const Overlay = dynamic(() => import('@/src/components/layout/Overlay'))

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
        className={`fixed max-w-full right-0 top-14 lg:top-16 bottom-0 px-6 py-10 w-full md:w-96 bg-white z-[100] transition-transform duration-300 ease-out overflow-y-auto shadow-xl md:rounded-l-xl ${
          isOpen && !isClosing ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {children}
      </div>
    </>
  )
}

export default ModalSidebar
