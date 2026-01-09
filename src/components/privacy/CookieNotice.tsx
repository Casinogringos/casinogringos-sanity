'use client'

import {
  getConsentValue,
  setConsentValue,
  type ConsentValue,
} from '@/src/lib/consent'
import { useCallback, useEffect, useState } from 'react'
import Button from '../content/Button'
import Heading from '../content/Heading'

const CookieNotice = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const current = getConsentValue()
    if (!current) setVisible(true)
  }, [])

  const handleChoice = (value: ConsentValue) => {
    setConsentValue(value)
    setVisible(false)
  }

  const handleReject = useCallback(() => handleChoice('rejected'), [])
  const handleAccept = useCallback(() => handleChoice('accepted'), [])

  if (!visible) return null

  const headingId = 'cookie-notice-title'

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed bottom-4 md:bottom-10 left-4 right-4 md:right-10 md:left-10 z-50 md:max-w-lg rounded-sm border border-slate-300 bg-white/95 p-6 shadow-2xl backdrop-blur"
    >
      <div className="flex flex-col items-start gap-3 text-left">
        <div className="text-sm text-slate-700">
          <Heading
            id={headingId}
            sizes={[3, 3, 4]}
            className="text-dark mb-3"
            text="Vi värdesätter din integritet"
            level={2}
          />
          Vi använder cookies för att förbättra funktionalitet, analysera trafik
          och förstå hur vår webbplats används. Du kan själv välja om du vill
          tillåta cookies för statistik och analys. Nödvändiga cookies används
          alltid för att webbplatsen ska fungera korrekt.
        </div>
        <div className="w-full mt-2 flex flex gap-2 justify-end">
          <Button
            variant="outline"
            size="medium"
            className="w-full"
            callback={handleReject}
          >
            Avvisa
          </Button>
          <Button
            variant="primary"
            size="medium"
            className="w-full border-transparent text-sm font-medium hover:bg-dark/90 hover:text-white"
            callback={handleAccept}
          >
            Acceptera
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CookieNotice
