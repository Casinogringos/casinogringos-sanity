'use client'

import { useEffect, useState } from 'react'

const Overlay = ({
  closing,
  close,
}: {
  closing: boolean
  close: () => void
}) => {
  const [init, setInit] = useState(false)
  useEffect(() => {
    setInit(true)
    document.body.classList.add('overflow-hidden')
  }, [])

  return (
    <div
      onClick={() => {
        close()
      }}
      className={`fixed inset-0 bg-dark transition-opacity ease-in-out duration-300 z-[90] overflow-hidden ${
        init && !closing ? 'opacity-75' : 'opacity-0'
      }`}
    />
  )
}

export default Overlay
