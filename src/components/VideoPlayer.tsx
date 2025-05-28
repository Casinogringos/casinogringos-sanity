'use client'

import ReactPlayer from 'react-player/lazy'
import { useEffect, useState, memo } from 'react'

const VideoPlayer = ({ url, caption }) => {
  const [client, setClient] = useState(false)
  useEffect(() => {
    setClient(true)
  }, [])

  return (
    <>
      <div className={'relative pt-[56.25%]'}>
        {client && (
          <ReactPlayer
            url={url}
            controls={true}
            width={'100%'}
            height={'100%'}
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        )}
      </div>
      {caption && caption !== '' && (
        <div className={'text-center my-3 text-sm'}>
          <span>{caption}</span>
        </div>
      )}
    </>
  )
}

const MemoizedVideoPlayer = memo(VideoPlayer)

export default MemoizedVideoPlayer
