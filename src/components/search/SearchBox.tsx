'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import Fuse from 'fuse.js'
import Link from '@/src/components/content/Link'
import Heading from '@/src/components/content/Heading'
import Date from '@/src/components/content/Date'
import { SubPagePreviewSchemaType } from '@/src/schemas/subPagePreview'
import { SlotPagePreviewSchemaType } from '@/src/schemas/slotPagePreview'
import { GuidePagePreviewSchemaType } from '@/src/schemas/guidePagePreview'
import { NewsPagePreviewSchemaType } from '@/src/schemas/newsPagePreview'
import { CasinoPagePreviewSchemaType } from '@/src/schemas/casinoPagePreview'
import { SearchSchemaItemType, SearchSchemaType } from '@/src/schemas/search'
import _ from 'lodash'
import SubPageService from '@/src/services/SubPageService'
import SlotPageService from '@/src/services/SlotPageService'
import GuidePageService from '@/src/services/GuidePageService'
import NewsPageService from '@/src/services/NewsPageService'
import CasinoPageService from '@/src/services/CasinoPageService'
import Image from 'next/image'
import { closedSearch, closeSearch, closingSearch } from '@/src/store/menuSlice'
import { useAppSelector, useAppDispatch } from '@/src/store/hooks'

const pageService = new SubPageService()
const slotPageService = new SlotPageService()
const guidePageService = new GuidePageService()
const newsPageService = new NewsPageService()
const casinoPageService = new CasinoPageService()

const SearchBox = () => {
  const [pages, setPages] = useState<Array<
    | SubPagePreviewSchemaType
    | SlotPagePreviewSchemaType
    | GuidePagePreviewSchemaType
    | NewsPagePreviewSchemaType
    | CasinoPagePreviewSchemaType
  > | null>(null)
  const [filteredResults, setFilteredResults] =
    useState<SearchSchemaType | null>(null)
  const dispatch = useAppDispatch()
  const resultGroups: Record<string, SearchSchemaItemType[]> = useMemo(
    () =>
      filteredResults?.reduce(
        (acc, item) => {
          if (!item) return acc
          const newItem = {
            _type: item._type,
            title: item.title,
            slug: { ...item.slug },
            featuredImage: { ...item.featuredImage },
            modifiedAt: item.modifiedAt,
          }
          if (
            item._type === 'casino-pages' ||
            item._type === 'guide-pages' ||
            item._type === 'news-pages' ||
            item._type === 'slot-pages' ||
            item._type === 'pages'
          ) {
            acc[item._type].push(newItem as SearchSchemaItemType)
          }
          return acc
        },
        {
          'casino-pages': [] as SearchSchemaItemType[],
          'guide-pages': [] as SearchSchemaItemType[],
          'news-pages': [] as SearchSchemaItemType[],
          'slot-pages': [] as SearchSchemaItemType[],
          pages: [] as SearchSchemaItemType[],
        }
      ) ?? {},
    [filteredResults]
  )
  const [query, setQuery] = useState('')
  const [didFetch, setDidFetch] = useState(false)
  useEffect(() => {
    if (didFetch) return
    setDidFetch(true)
    const fetchData = async () => {
      const res = await fetch('/api/search')
      const data = await res.json()
      setPages(data)
    }
    fetchData()
  }, [])
  useEffect(() => {
    if (query === '') {
      setFilteredResults(null)
      return
    }
    if (!pages) return
    const fuse = new Fuse(pages, {
      keys: ['title', 'slug', 'featuredImage.alt'],
      includeScore: true,
      threshold: 0.2,
    })
    const searchResults = fuse.search(query)
    const filteredResults = searchResults.map((result) => {
      const record:
        | SubPagePreviewSchemaType
        | SlotPagePreviewSchemaType
        | GuidePagePreviewSchemaType
        | NewsPagePreviewSchemaType
        | CasinoPagePreviewSchemaType
        | null
        | undefined = pages?.find(
        (item) => item.slug.current === result.item.slug.current
      )
      if (record?.slug.current === '') return null
      const clonedRecord = _.cloneDeep(record)
      const featuredImage = clonedRecord?.featuredImage
      let modifiedAt = null
      if (clonedRecord && clonedRecord?._type === 'pages') {
        modifiedAt = pageService.getPageModifiedAtTimestamp(clonedRecord)
      } else if (clonedRecord && clonedRecord?._type === 'casino-pages') {
        modifiedAt = casinoPageService.getPageModifiedAtTimestamp(clonedRecord)
      } else if (clonedRecord && clonedRecord?._type === 'guide-pages') {
        modifiedAt = guidePageService.getPageModifiedAtTimestamp(clonedRecord)
      } else if (clonedRecord && clonedRecord?._type === 'news-pages') {
        modifiedAt = newsPageService.getPageModifiedAtTimestamp(clonedRecord)
      } else if (clonedRecord && clonedRecord?._type === 'slot-pages') {
        modifiedAt = slotPageService.getPageModifiedAtTimestamp(clonedRecord)
      }
      return {
        _type: clonedRecord?._type,
        title: clonedRecord?.title,
        slug: { current: clonedRecord?.slug.current },
        featuredImage,
        modifiedAt,
      }
    })
    setFilteredResults(
      filteredResults.filter(
        (item): item is SearchSchemaItemType => item !== null
      )
    )
  }, [query])
  const handleCloseSearch = useCallback(() => {
    dispatch(closingSearch())
    setTimeout(() => {
      dispatch(closeSearch())
      dispatch(closedSearch())
    }, 300)
    document.body.classList.remove('overflow-hidden')
  }, [dispatch])

  return (
    <>
      <div className="bg-white rounded-md flex items-stretch mb-2">
        <div className="bg-slate-300 w-[70px] rounded-l-md flex items-center justify-center">
          <Search className="text-white" />
        </div>
        <input
          className="h-[70px] px-4 w-full text-slate-500 outline-none"
          type="text"
          placeholder="Sök"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {filteredResults && filteredResults.length > 0 && (
        <div className="bg-white rounded-md max-h-[400px] p-4 overflow-y-scroll">
          <div className="mb-4">
            {resultGroups && resultGroups?.['casino-pages']?.length > 0 && (
              <Heading
                text="Casinon"
                level={3}
                sizes={[4, 4, 5]}
                className="mb-3"
              />
            )}
            {resultGroups?.['casino-pages']?.map((item) => (
              <div
                key={`${item.slug.current}`}
                className="border-b border-slate-200 hover:bg-slate-100 pl-0"
              >
                <Link
                  className="flex items-center justify-start p-4"
                  href={item.slug.current}
                  onClick={handleCloseSearch}
                >
                  {item.featuredImage.src && (
                    <div className="h-[50px] w-[50px] relative mr-2">
                      <Image
                        src={item.featuredImage.src}
                        alt={item.featuredImage.alt}
                        width={50}
                        height={50}
                        className="rounded-md object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <Heading
                      text={item.title}
                      level={4}
                      sizes={[1, 1, 2]}
                      className="!font-normal !text-md"
                    />
                    <Date
                      className="text-slate-500 text-sm"
                      timestamp={item.modifiedAt}
                    />
                  </div>
                  <div className="flex-shrink-0 rounded-full bg-slate-200 p-2">
                    <ArrowRight size={15} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="mb-4">
            {resultGroups && resultGroups?.['guide-pages']?.length > 0 && (
              <Heading
                text="Guidor"
                level={3}
                sizes={[4, 4, 5]}
                className="mb-3"
              />
            )}
            {resultGroups?.['guide-pages']?.map((item, index) => (
              <div
                key={`${item.slug}-${index}`}
                className="border-b border-slate-200 hover:bg-slate-100 pl-0"
              >
                <Link
                  href={item.slug.current}
                  className="flex items-center justify-start p-4"
                  onClick={() => closeSearch()}
                >
                  {item.featuredImage.src && (
                    <div className="h-[50px] w-[50px] relative mr-2">
                      <Image
                        src={item.featuredImage.src}
                        alt={item.featuredImage.alt}
                        width={50}
                        height={50}
                        className="rounded-md object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <Heading
                      text={item.title}
                      level={4}
                      sizes={[1, 1, 2]}
                      className="!font-normal !text-md"
                    />
                    <Date
                      timestamp={item.modifiedAt}
                      className="text-slate-500 text-sm"
                    />
                  </div>
                  <div className="flex-shrink-0 rounded-full bg-slate-200 p-2">
                    <ArrowRight size={15} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="mb-4">
            {resultGroups && resultGroups?.['news-pages']?.length > 0 && (
              <Heading
                text="Nyheter"
                level={3}
                sizes={[4, 4, 5]}
                className="mb-3"
              />
            )}
            {resultGroups?.['news-pages']?.map((item, index) => (
              <div
                key={`${item.slug}-${index}`}
                className="border-b border-slate-200 hover:bg-slate-100 p-4 pl-0"
              >
                <Link
                  href={item.slug.current}
                  className="flex items-center justify-start"
                  onClick={() => closeSearch()}
                >
                  {item.featuredImage.src && (
                    <div className="h-[50px] w-[50px] relative mr-2">
                      <Image
                        src={item.featuredImage.src}
                        alt={item.featuredImage.alt}
                        width={50}
                        height={50}
                        className="rounded-md object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <Heading
                      text={item.title}
                      level={4}
                      sizes={[1, 1, 2]}
                      className="!font-normal !text-md"
                    />
                    <Date
                      timestamp={item.modifiedAt}
                      className="text-slate-500 text-sm"
                    />
                  </div>
                  <div className="flex-shrink-0 rounded-full bg-slate-200 p-2">
                    <ArrowRight size={15} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="mb-4">
            {resultGroups && resultGroups?.['slot-pages']?.length > 0 && (
              <Heading
                text="Sloter"
                level={3}
                sizes={[4, 4, 5]}
                className="mb-3"
              />
            )}
            {resultGroups?.['slot-pages']?.map((item, index) => (
              <div
                key={`${item.slug}-${index}`}
                className="border-b border-slate-200 hover:bg-slate-100 p-4 pl-0"
              >
                <Link
                  href={item.slug.current}
                  className="flex items-center justify-start"
                  onClick={() => closeSearch()}
                >
                  {item.featuredImage.src && (
                    <div className="h-[50px] w-[50px] relative mr-2">
                      <Image
                        src={item.featuredImage.src}
                        alt={item.featuredImage.alt}
                        width={50}
                        height={50}
                        className="rounded-md object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <Heading
                      text={item.title}
                      level={4}
                      sizes={[1, 1, 2]}
                      className="!font-normal !text-md"
                    />
                    <Date
                      timestamp={item.modifiedAt}
                      className="text-slate-500 text-sm"
                    />
                  </div>
                  <div className="flex-shrink-0 rounded-full bg-slate-200 p-2">
                    <ArrowRight size={15} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="mb-4">
            {resultGroups && resultGroups?.['pages']?.length > 0 && (
              <Heading
                text="Sidor"
                level={3}
                sizes={[4, 4, 5]}
                className="mb-3"
              />
            )}
            {resultGroups?.['pages']?.map((item, index) => (
              <div
                key={`${item.slug}-${index}`}
                className="border-b border-slate-200 hover:bg-slate-100 p-4 pl-0"
              >
                <Link
                  href={item.slug.current}
                  className="flex items-center justify-start"
                  onClick={() => closeSearch()}
                >
                  {item.featuredImage.src && (
                    <div className="h-[50px] w-[50px] relative mr-2">
                      <Image
                        src={item.featuredImage.src}
                        alt={item.featuredImage.alt}
                        width={50}
                        height={50}
                        className="rounded-md object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <Heading
                      text={item.title}
                      level={4}
                      sizes={[1, 1, 2]}
                      className="!font-normal !text-md"
                    />
                    <Date
                      timestamp={item.modifiedAt}
                      className="text-slate-500 text-sm"
                    />
                  </div>
                  <div className="flex-shrink-0 rounded-full bg-slate-200 p-2">
                    <ArrowRight size={15} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default SearchBox
