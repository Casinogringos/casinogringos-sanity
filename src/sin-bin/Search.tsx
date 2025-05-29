'use client'

import Date from '@/components/Date'
import Heading from '@/components/Heading'
import InternalLink from '@/components/InternalLink'
import Fuse from 'fuse.js'
import { ArrowRight, SearchIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

type SearchHitType = {
  title: string
  slug: string
  featuredImage: { node: { sourceUrl: string } }
  date: string
}

type SearchResultsType = Record<string, SearchHitType[]>

const SearchHit = ({
  hit,
  baseSlug,
}: {
  hit: SearchHitType
  baseSlug: string
}) => {
  return (
    <div key={`search-hit-${hit.slug}`}>
      <InternalLink
        className="text-md flex items-start border-b border-b-gray200 p-4 font-medium leading-snug hover:bg-slate100"
        href={`${baseSlug}${hit.slug}`}
        prefetch={false}
      >
        {hit.featuredImage && (
          <div className="mr-3 mt-1.5 flex h-8 w-8 shrink-0 items-center overflow-hidden rounded-sm lg:mt-1">
            <Image
              src={hit.featuredImage.node.sourceUrl}
              className="h-full"
              quality={40}
              width={32}
              height={32}
              alt={hit.title}
            />
          </div>
        )}
        <div>
          {hit.title}
          <span className="block text-xs2 text-gray400">
            <Date dateString={hit.date} />
          </span>
        </div>
        <div className="ml-auto flex items-center justify-center rounded-full bg-slate300 p-1">
          <ArrowRight className="h-4 w-4" />
        </div>
      </InternalLink>
    </div>
  )
}

const Search = ({ data }) => {
  const [results, setResults] = useState<SearchResultsType | null>(null)
  const [searchInput, setSearchInput] = useState('')
  const searchData = useMemo(
    () =>
      ['posts', 'guider', 'nyheter', 'pages', 'slots'].flatMap((category) =>
        data[category].edges.map(({ node }) => node)
      ),
    [data]
  )
  useEffect(() => {
    const performSearch = () => {
      if (searchInput) {
        const fuse = new Fuse(searchData, {
          keys: ['title', 'slug'],
          includeScore: true,
          threshold: 0.2,
        })
        const searchResults = fuse.search(searchInput)
        const results = searchResults.reduce((acc, result) => {
          const { item } = result
          if (!acc[item.__typename]) {
            acc[item.__typename] = [item]
          }
          if (
            acc[item.__typename].findIndex(
              (existingItem: SearchHitType) => existingItem.slug === item.slug
            ) === -1
          ) {
            acc[item.__typename].push(item)
          }
          return acc
        }, {} as SearchResultsType)
        setResults(results)
      } else {
        setResults(null)
      }
    }
    performSearch()
  }, [searchInput, searchData])

  return (
    <>
      <div className={'relative mb-2 flex rounded-md'}>
        <div className="pointer-events-none absolute flex h-full w-12 items-center justify-center overflow-hidden rounded-bl-md rounded-tl-md bg-slate300">
          <SearchIcon className="h-4 w-4 text-white" aria-hidden="true" />
        </div>
        <input
          id="search"
          name="search"
          className="placeholder:text-slate-500 text-slate-800 block w-full rounded-md bg-white py-4 pl-16 pr-3 leading-6 focus:outline-0 focus:ring-0 focus:ring-offset-0"
          placeholder="Sök efter casinon, bonusar och slots.."
          type="search"
          onChange={(e) => setSearchInput(e.currentTarget.value)}
        />
      </div>
      <div
        className={
          'rounded-md overflow-hidden bg-white overflow-y-scroll max-h-[400px]'
        }
      >
        {results?.Post?.length && results.Post.length > 0 && (
          <div className={'mb-4 p-4'}>
            <Heading
              className={'text-xl'}
              attributes={{ level: 2, text: 'Casinon' }}
            />
            {results?.Post?.map((result: SearchHitType, i) => (
              <SearchHit
                key={`search-hit-${result.slug}-${i}`}
                hit={result}
                baseSlug={'/'}
              />
            ))}
          </div>
        )}
        {results?.Slot?.length && results.Slot.length > 0 && (
          <div className={'mb-4 p-4'}>
            <Heading
              className={'text-xl'}
              attributes={{ level: 2, text: 'Slots' }}
            />
            {results?.Slot?.map((result: SearchHitType, i) => (
              <SearchHit
                key={`search-hit-${result.slug}-${i}`}
                hit={result}
                baseSlug={'/slots/'}
              />
            ))}
          </div>
        )}
        {results?.Page?.length && results.Page.length > 0 && (
          <div className={'mb-4 p-4'}>
            <Heading
              className={'text-xl'}
              attributes={{ level: 2, text: 'Sidor' }}
            />
            {results?.Page?.map((result: SearchHitType, i) => (
              <SearchHit
                key={`search-hit-${result.slug}-${i}`}
                hit={result}
                baseSlug={'/'}
              />
            ))}
          </div>
        )}
        {results?.Nyhet?.length && results.Nyhet.length > 0 && (
          <div className={'mb-4 p-4'}>
            <Heading
              className={'text-xl'}
              attributes={{ level: 2, text: 'Nyheter' }}
            />
            {results?.Nyhet?.map((result: SearchHitType, i) => (
              <SearchHit
                key={`search-hit-${result.slug}-${i}`}
                hit={result}
                baseSlug={'/nyheter/'}
              />
            ))}
          </div>
        )}
        {results?.Guider?.length && results.Guider.length > 0 && (
          <div className={'mb-4 p-4'}>
            <Heading
              className={'text-xl'}
              attributes={{ level: 2, text: 'Guider' }}
            />
            {results?.Guider?.map((result: SearchHitType, i) => (
              <SearchHit
                key={`search-hit-${result.slug}-${i}`}
                hit={result}
                baseSlug={'/guider/'}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Search
