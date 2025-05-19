'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center py-40">
      <h1 className="text-4xl font-bold text-heading">
        Något gick tyvärr fel..
      </h1>
      <Link prefetch={false} className="mt-12 block font-medium" href="/">
        Tillbaka till startsidan
      </Link>
    </div>
  )
}
