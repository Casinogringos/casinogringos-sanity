'use client'

import { ReactNode } from 'react'
import Container from '@/components/Container'
import { X } from 'lucide-react'

type CustomModalProps = {
  children: ReactNode
  isClosing: boolean
  close: () => void
  isOpen: boolean
  background?: string
  position?: 'top' | 'center'
  fillModal?: boolean
}
const Notification = ({
  children,
  isClosing,
  isOpen,
  close,
}: CustomModalProps) => {
  return (
    <>
      <div
        className={`${
          isOpen && !isClosing
            ? 'translate-x-0 translate-y-0 opacity-100'
            : 'translate-x-full opacity-0'
        } fixed w-full top-16 transition-all duration-300 ease-in-out`}
      >
        <Container>
          <div className={'rounded-lg bg-white p-4 shadow-lg'}>
            <div className="flex items-center">
              <div className={'flex-1'}>{children}</div>
              <button
                type="button"
                className="inline-flex rounded-md bg-white focus:outline-none focus:bg-white"
                onClick={() => {
                  close()
                }}
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5 text-dark-blue" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Notification
