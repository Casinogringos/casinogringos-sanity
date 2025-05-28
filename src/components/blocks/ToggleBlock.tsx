'use client'

import { ChevronDown } from '@/components/Icons'
import { CircleHelp} from "lucide-react";
import { useState } from 'react'

const ToggleBlock = ({ children, className = '', title = '' }) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`${className} border border-slate200 mb-3 rounded-md relative`}
    >
      <button
        onClick={() => setOpen(!open)}
        className={'w-full relative flex items-center px-4 py-2'}
      >
        <h2
          className={
            'flex-grow flex items-center not-prose font-semibold text-left text-sm'
          }
        >
          <CircleHelp className="h-4 w-4 mr-2 mt-0.5 text-slate500" />
          {title ? title : 'Varför oss?'}
        </h2>
        <div className={`${open ? 'rotate-180' : ''} transition `}>
          <ChevronDown className={'stroke-black h-5 w-5'} />
        </div>
      </button>
      <div
        className={`${
          open ? 'max-h-[600px]' : 'max-h-0'
        } overflow-y-auto transition-mh origin-top`}
      >
        <p className="pt-2 pb-4 px-4 text-sm text-slate600">{children}</p>
      </div>
    </div>
  )
}

export default ToggleBlock
