'use client'

import { usePlausible } from 'next-plausible'
import Image from 'next/image'
import Link from '@/src/components/atoms/Link'

const HeroAlert = () => {
  const plausible = usePlausible()
  return (
    <Link
      className="my-4 inline-flex w-full items-center justify-between gap-6 rounded-md bg-[#37027e] px-2 py-1 pl-4 leading-none text-white shadow-2xl"
      onClick={() =>
        plausible('Hero Alert', {
          props: {
            alert: 'Casino Epic',
          },
        })
      }
      target="_blank"
      aria-label="Besök CasinoRow Epic"
      href="/go/casino-epic"
      rel="noopener noreferrer nofollow"
      prefetch={false}
    >
      {/* <span className="mr-3 flex rounded-full bg-slate300 px-3 py-2 text-xs font-bold uppercase text-black">
        Nytt casino
      </span> */}
      <Image
        width="35"
        height="35"
        className="rounded-full"
        alt="CasinoRow Epic"
        src="https://content.casinogringos.se/wp-content/uploads/2025/03/Casinoepic-logga.webp"
      />
      <span className="mr-2 flex-auto text-left text-sm font-medium leading-5 md:font-semibold">
        Få 200 free spins hos nylanserade CasinoRow Epic
      </span>
      <svg
        className="h-5 w-5 flex-shrink-0 fill-white opacity-75"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
      </svg>
    </Link>
  )
}

export default HeroAlert
