'use client'

import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'next-share'

const ShareButtons = ({ url, title }: { url: string; title: string }) => {
  return (
    <>
      <FacebookShareButton url={url} quote={title} title={title}>
        <FacebookIcon size={24} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={24} round />
      </TwitterShareButton>
      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={24} round />
      </WhatsappShareButton>
    </>
  )
}

export default ShareButtons
