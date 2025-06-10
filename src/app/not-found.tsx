import Container from '@/src/app/components/atoms/Container'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Container>
      <div className="flex-col items-center justify-center py-24 text-center">
        <Image
          className="mx-auto md:max-w-[475px]"
          src="/gringo-image.webp"
          width={923}
          height={600}
          alt="Gringo"
        />
        <Link
          href="/"
          prefetch={false}
          className="mt-14 inline-block rounded-md bg-green600 px-8 py-3 font-medium text-white hover:bg-green500"
        >
          Gå till startsidan
        </Link>
      </div>
    </Container>
  )
}
