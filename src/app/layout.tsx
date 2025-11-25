import { getMenuById, getToplistById } from '@/src/lib/api'
import Provider from '@/src/store/provider'
import '@/src/styles/index.css'
import '@/src/styles/styles.scss'
import PlausibleProvider from 'next-plausible'
import dynamicImport from 'next/dynamic'

import Footer from '@/src/components/navigation/Footer'
import Navigation from '@/src/components/navigation/Navigation'
import { inter } from '@/src/styles/fonts'
import { headers } from 'next/headers'
import { ReactNode } from 'react'

const ScrollToTop = dynamicImport(
  () => import('@/src/components/navigation/ScrollToTop')
)

// export const metadata = {
//   metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
// }

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const headerMenu = await getMenuById({
    id: '2311e77d-7195-4996-9ef5-cdc1fa9d223e',
  })
  const sidebarMenu = await getMenuById({
    id: '0cf352ee-76c4-4cb7-971e-8e9ce897b3f3',
  })
  const sidebarToplist = await getToplistById({
    id: '719ca05f-52df-4062-9855-36a75c76c245',
  })
  const siteLinks = await getMenuById({
    id: '09a5375d-b3de-46cd-b9ff-e8e1c20a1fea',
  })
  const popularCasinos = await getMenuById({
    id: '8b21bf53-d5ec-43d6-9190-796b0cbc71de',
  })
  const latestReviews = await getMenuById({
    id: 'c32a298f-41e8-4633-9202-f38e9f5f0826',
  })
  const headersList = await headers()
  const pathname =
    headersList.get('x-pathname') || headersList.get('x-url') || ''

  return (
    <html lang="sv-SE">
      <PlausibleProvider domain="casinogringos.se" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={`${inter.className}`}>
        <Provider>
          <Navigation
            headerMenu={headerMenu}
            sidebarMenu={sidebarMenu}
            sidebarToplist={sidebarToplist}
            pathname={pathname}
          />
          <main className={'relative'}>{children}</main>
          <ScrollToTop />
          <Footer
            siteLinks={siteLinks}
            popularCasinos={popularCasinos}
            latestReviews={latestReviews}
          />
        </Provider>
      </body>
    </html>
  )
}

export const dynamic = 'force-static'
