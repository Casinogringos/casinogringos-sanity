export const CONSENT_COOKIE_NAME = 'cg_cookie_consent'
export const CONSENT_EVENT_NAME = 'cg-consent-changed'
export const CONSENT_VERSION = 'v1'
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180

export type ConsentValue = 'accepted' | 'rejected'

const parseConsentValue = (
  rawValue: string | undefined
): ConsentValue | null => {
  if (!rawValue) return null
  const [version, value] = rawValue.split(':')
  if (version !== CONSENT_VERSION) return null
  if (value === 'accepted' || value === 'rejected') return value
  return null
}

export const getConsentValue = (): ConsentValue | null => {
  if (typeof document === 'undefined') return null
  const cookie = document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${CONSENT_COOKIE_NAME}=`))
  const rawValue = cookie?.split('=')[1]
  return parseConsentValue(rawValue)
}

export const setConsentValue = (value: ConsentValue) => {
  if (typeof document === 'undefined') return
  const secureFlag =
    typeof window !== 'undefined' && window.location.protocol === 'https:'
      ? '; Secure'
      : ''
  document.cookie = `${CONSENT_COOKIE_NAME}=${CONSENT_VERSION}:${value}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secureFlag}`
  window.dispatchEvent(new Event(CONSENT_EVENT_NAME))
}
