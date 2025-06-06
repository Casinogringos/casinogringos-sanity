'use client'

import { ParagraphObject, HeadingObject, ImageObject } from '@/src/types'
import { ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import ModularContent from '@/src/components/organisms/ModularContent'

const ToggleBox = ({
  buttonTextOpen,
  buttonTextClose,
  innerBlocks,
}: {
  buttonTextOpen: string
  buttonTextClose: string
  innerBlocks: Array<HeadingObject | ImageObject | ParagraphObject>
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isClosing, setIsClosing] = useState<boolean>(false)
  useEffect(() => {
    if (!isOpen) {
      setIsClosing(true)
      setTimeout(() => {
        setIsClosing(false)
      }, 300)
    }
  }, [isOpen])

  return (
    <section>
      <div
        className={`${isOpen ? 'max-h-[500000px]' : 'max-h-[100px]'} transform transition overflow-hidden relative`}
      >
        {!isOpen || isClosing ? (
          <div
            className={`bg-gradient-to-t from-white absolute inset-0 transition-opacity ease-in-out duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
          />
        ) : null}
        <ModularContent objects={innerBlocks} />
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={'flex items-center w-full relative'}
      >
        <div className={'h-[1px] bg-slate100 w-full'} />
        {buttonTextOpen === '' && buttonTextClose === '' ? (
          <div
            className={`${isOpen ? 'rotate-180' : ''} transition rounded-full bg-slate100 absolute left-1/2 -translate-x-1/2 -top-[18px] w-[36px] h-[36px] flex items-center justify-center`}
          >
            <ChevronDown className={'stroke-black'} />
          </div>
        ) : (
          <span
            className={
              'bg-slate100 rounded-md text-dark absolute left-1/2 -translate-x-1/2 -top-[18px] px-5 py-1 block'
            }
          >
            {isOpen ? buttonTextClose : buttonTextOpen}
          </span>
        )}
      </button>
    </section>
  )
}

export default ToggleBox
