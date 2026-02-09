'use client'

import dynamic from 'next/dynamic'

const SearchModal = dynamic(
  () => import('@/src/components/search/SearchModal'),
  { ssr: false }
)

const SearchBox = dynamic(
  () => import('@/src/components/search/SearchBox'),
  { ssr: false }
)

export function LazySearchModal() {
  return (
    <SearchModal>
      <SearchBox />
    </SearchModal>
  )
}
