'use client'

import { useEffect, useRef } from 'react'
import { CONSENT_EVENT_NAME, getConsentValue } from '@/src/lib/consent'

type ClarityModule = {
  default?: { init?: (id: string) => void }
  init?: (id: string) => void
}

const ClarityClient = () => {
  const initializedRef = useRef(false)

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_ID
    if (!projectId) return

    const initClarity = async () => {
      if (initializedRef.current) return
      try {
        const module = await import('@microsoft/clarity')
        const clarityModule = module as unknown as ClarityModule
        const clarity = clarityModule.default ?? clarityModule
        if (typeof clarity.init === 'function') {
          clarity.init(projectId)
          initializedRef.current = true
        }
      } catch (error) {
        console.warn('Failed to initialize Clarity', error)
      }
    }

    const scheduleInit = () => {
      const idleCallback = (
        window as Window & {
          requestIdleCallback?: (cb: () => void) => number
        }
      ).requestIdleCallback
      if (idleCallback) {
        idleCallback(() => {
          void initClarity()
        })
      } else {
        setTimeout(() => {
          void initClarity()
        }, 150)
      }
    }

    const maybeInit = () => {
      if (initializedRef.current) return
      if (getConsentValue() === 'accepted') {
        scheduleInit()
      }
    }

    maybeInit()

    const handleConsentChange = () => {
      maybeInit()
    }

    window.addEventListener(CONSENT_EVENT_NAME, handleConsentChange)
    return () => {
      window.removeEventListener(CONSENT_EVENT_NAME, handleConsentChange)
    }
  }, [])

  return null
}

export default ClarityClient
