'use client'

import { useEffect, useState } from 'react'

const Time = ({ dateString }) => {
  const [time, setTime] = useState('')
  useEffect(() => {
    const getTime = () =>
      new Date(dateString).toLocaleTimeString('sv-SE', {
        hour: '2-digit',
        minute: '2-digit',
      })
    setTime(getTime())
  }, [dateString])
  if (!time) return null

  return <time dateTime={dateString}>{time}</time>
}

export default Time
