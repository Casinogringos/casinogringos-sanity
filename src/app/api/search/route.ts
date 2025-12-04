import { getSearchPagePreviews } from '@/src/lib/api'
import { NextResponse } from 'next/server'

export async function GET() {
  const allSearchPagePreviews = await getSearchPagePreviews()
  const filteredSearchPagePreviews = allSearchPagePreviews.filter(
    (item) => item.slug?.current
  )
  return NextResponse.json(filteredSearchPagePreviews)
}
