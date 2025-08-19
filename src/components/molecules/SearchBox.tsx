'use client'

import { useEffect, useState } from 'react'
import { SearchSchemaType } from '@/src/schemas/search'
import { Search } from 'lucide-react'
import Fuse from 'fuse.js'
import Link from 'next/link'
import Heading from '@/src/components/atoms/Heading'

const SearchBox = () => {
    const [data, setData] = useState<SearchSchemaType | null>(null)
    console.log('data', data)
    const [filteredData, setFilteredData] = useState<SearchSchemaType | null>(null)
    const resultGroups = filteredData?.reduce((acc, item) => {
        acc[item._type].push(item)
        return acc
    }, {
        'casino-pages': [],
        'guide-pages': [],
        'news-pages': [],
        'slot-pages': [],
        'pages': [],
    } as Record<string, { _type: string; modifiedAt: string; title: string; slug: { current: string; }; featuredImage?: { url: string; alt: string; } | undefined; }[]>)
    console.log('filteredData', filteredData)
    const [query, setQuery] = useState('')
    const [didFetch, setDidFetch] = useState(false)
    useEffect(() => {
        if (didFetch) return
        setDidFetch(true)
        const fetchData = async () => {
            const res = await fetch('/api/search')
            const data = await res.json()
            setData(data)
        }
        fetchData()
    }, [])
    useEffect(() => {
        console.log('query', query)
        if (query === '') {
            setFilteredData(null)
            return
        }
        if (!data) return
        const fuse = new Fuse(data, {
            keys: ['title', 'slug', 'featuredImage.alt'],
            includeScore: true,
            threshold: 0.2,
        })
        const searchResults = fuse.search(query)
        const filteredData = searchResults.map((result) => {
            const record = data?.find((item) => item.slug === result.item.slug)
            const featuredImage = record?.featuredImage
            const modifiedAt = record?._updatedAt ?? record?.originalModifiedAt
            return {
                _type: result.item._type,
                title: result.item.title,
                slug: result.item.slug,
                featuredImage,
                modifiedAt,
            }
        })
        setFilteredData(filteredData)
    }, [query])

    return (
        <>
            <div className="bg-white rounded-md flex items-stretch mb-2">
                <div className='bg-slate-300 w-[70px] rounded-l-md flex items-center justify-center'>
                    <Search className='text-white' />
                </div>
                <input className='h-[70px] px-4 w-full text-slate-500 outline-none' type="text" placeholder="Sök" onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className='bg-white rounded-md max-h-[400px] p-4 overflow-y-scroll'>
                {resultGroups && resultGroups?.['casino-pages']?.length > 0 && (
                    <Heading text="Casinoer" level={3} size={6} className='mb-3' />
                )}
                {resultGroups?.['casino-pages'].map((item, index) => (
                    <div key={`${item.slug}-${index}`} className='border-b border-slate-200 p-4'>
                        <Link href={item.slug.current}>
                            <Heading text={item.title} level={4} size={2} className='!font-normal !text-md' />
                            <span className='text-xs text-slate-500'>{item.modifiedAt}</span>
                        </Link>
                    </div>
                ))}
                {resultGroups && resultGroups?.['guide-pages']?.length > 0 && (
                    <Heading text="Guidor" level={3} size={6} />
                )}
                {resultGroups?.['guide-pages'].map((item, index) => (
                    <div key={`${item.slug}-${index}`}>
                        <Link href={item.slug.current}>
                            <h2>{item.title}</h2>
                        </Link>
                    </div>
                ))}
                {resultGroups && resultGroups?.['news-pages']?.length > 0 && (
                    <Heading text="Nyheter" level={3} size={6} />
                )}
                {resultGroups?.['news-pages'].map((item, index) => (
                    <div key={`${item.slug}-${index}`}>
                        <Link href={item.slug.current}>
                            <h2>{item.title}</h2>
                        </Link>
                    </div>
                ))}
                {resultGroups && resultGroups?.['slot-pages']?.length > 0 && (
                    <Heading text="Sloter" level={3} size={6} />
                )}
                {resultGroups?.['slot-pages'].map((item, index) => (
                    <div key={`${item.slug}-${index}`}>
                        <Link href={item.slug.current}>
                            <h2>{item.title}</h2>
                        </Link>
                    </div>
                ))}
                {resultGroups && resultGroups?.['pages']?.length > 0 && (
                    <Heading text="Sidor" level={3} size={6} />
                )}
                {resultGroups?.['pages'].map((item, index) => (
                    <div key={`${item.slug}-${index}`}>
                        <Link href={item.slug.current}>
                            <h2>{item.title}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SearchBox
