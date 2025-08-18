'use client'

import { useEffect, useState } from 'react'
import { SearchSchemaType } from '@/src/schemas/search'
import { useRef } from 'react'

const SearchBox = () => {
    const [data, setData] = useState<SearchSchemaType | null>(null)
    const didFetch = useRef(false)
    useEffect(() => {
        if (didFetch.current) return
        didFetch.current = true
        const fetchData = async () => {
            const res = await fetch('/api/search')
            const data = await res.json()
            setData(data)
        }
        fetchData()
    }, [])

    return (
        <div className="bg-white">
            <h3>Sök</h3>
        </div>
    )
}

export default SearchBox
