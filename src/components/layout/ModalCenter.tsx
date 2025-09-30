'use client'

import { ReactNode } from 'react'
import dynamic from 'next/dynamic'

const Overlay = dynamic(() => import('@/src/components/layout/Overlay'))

interface CustomModalProps {
  removeFromDom?: boolean
  children: ReactNode
  direction: 'left' | 'right' | 'top' | 'bottom'
  isClosing: boolean
  close: () => void
  isOpen: boolean
  background?: string
  position?: 'top' | 'center'
  fillModal?: boolean
}

const ModalCenter = ({
  removeFromDom = false,
  children,
  direction,
  close,
  isClosing,
  isOpen,
  background,
  position,
  fillModal,
}: CustomModalProps) => {
  const hide = () => {
    switch (direction) {
      case 'left':
        return '-translate-x-full opacity-0'
      case 'right':
        return 'translate-x-full opacity-0'
      case 'top':
        return '-translate-y-full opacity-0'
      case 'bottom':
        return 'translate-y-full opacity-0'
    }
  }

  return (
    <>
      {isOpen && <Overlay closing={isClosing} close={close} />}
      {removeFromDom && !isOpen && !isClosing ? null : (
        <div
          className={`${
            isOpen && !isClosing
              ? 'translate-y-0 translate-x-0 opacity-100'
              : hide()
          } ${
            position === 'top' ? 'items-start mt-24' : 'items-center'
          } fixed inset-0 z-[100] flex transition duration-300 justify-center pb-20 lg:pb-3 top-16`}
          onClick={() => close()}
        >
          <div
            className={`${
              background ? `bg-${background}` : ''
            } max-w-[calc(100vw-25px)] md:max-w-3xl w-full rounded-lg overflow-hidden h-full sm:h-[calc(100vh-30%)] max-h-[750px]`}
          >
            <div
              className={`${fillModal ? 'h-full' : 'h-auto'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalCenter
