'use client'

import { ReactElement, useEffect, useState } from 'react'

const ClientFallback = ({
  content,
  fallback,
}: {
  content: ReactElement | null
  fallback: ReactElement | null
}) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted ? content : fallback
}

export default ClientFallback
