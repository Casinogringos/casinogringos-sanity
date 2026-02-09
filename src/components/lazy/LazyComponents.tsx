'use client'

import { CasinoSchemaType } from '@/src/schemas/casino'
import dynamic from 'next/dynamic'

const SearchModal = dynamic(
  () => import('@/src/components/search/SearchModal'),
  { ssr: false }
)

const SearchBox = dynamic(
  () => import('@/src/components/search/SearchBox'),
  { ssr: false }
)

const CookieNotice = dynamic(
  () => import('@/src/components/privacy/CookieNotice'),
  { ssr: false }
)

const ScrollToTop = dynamic(
  () => import('@/src/components/navigation/ScrollToTop'),
  { ssr: false }
)

const CasinoSticky = dynamic(
  () => import('@/src/components/casino/CasinoSticky'),
  { ssr: false }
)

export function LazySearchModal() {
  return (
    <SearchModal>
      <SearchBox />
    </SearchModal>
  )
}

export function LazyCookieNotice() {
  return <CookieNotice />
}

export function LazyScrollToTop() {
  return <ScrollToTop />
}

export function LazyCasinoSticky({ casino }: { casino: CasinoSchemaType }) {
  return <CasinoSticky casino={casino} />
}
