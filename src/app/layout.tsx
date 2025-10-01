import Navigation from '@/src/components/navigation/Navigation'
import {
  getCasinoPagePreviews,
  getMenuById,
  getToplistById,
} from '@/src/lib/api'
import Provider from '@/src/store/provider'
import '@/src/styles/index.css'
import '@/src/styles/styles.scss'
import PlausibleProvider from 'next-plausible'
import dynamicImport from 'next/dynamic'

import { headers } from 'next/headers'
import { ReactNode } from 'react'
import Footer from '@/src/components/navigation/Footer'
import { inter } from '@/src/styles/fonts'

const ScrollToTop = dynamicImport(
  () => import('@/src/components/navigation/ScrollToTop')
)
// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-inter',
//   weight: ['400', '500', '600'],
// })
// const jakarta = Plus_Jakarta_Sans({
//   subsets: ['latin'],
//   variable: '--font-jakarta',
//   display: 'swap',
//   weight: ['700'],
// })

// export const metadata = {
//   metadataBase: new URL(process.env.SITE_URL as string),
// }

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  const headerMenu = await getMenuById({
    id: '895b7eb3-dcfe-4321-b0cb-dc88f48d3664',
  })
  console.log('headerMenu', headerMenu)
  const sidebarMenu = await getMenuById({
    id: 'be7218f7-6ab0-4e18-97d1-343a82b8556d',
  })
  const sidebarToplist = await getToplistById({
    id: 'fa9e75e6-eadc-499c-9019-dc3843a7e2ca',
  })
  const siteLinks = await getMenuById({
    id: 'd4fcd6b4-d5b4-40b9-97cc-db901ff1f261',
  })
  const popularCasinos = await getMenuById({
    id: 'eb25c93d-f885-413a-b5c2-97a82fd10d66',
  })
  const latestReviews = await getMenuById({
    id: 'baeabb93-7c82-4503-8c1b-8d8be1060e19',
  })
  const headersList = await headers()
  const pathname =
    headersList.get('x-pathname') || headersList.get('x-url') || ''
  // console.log('pathname', pathname)
  // const footerNav = await getMenuById({ id: 'dGVybToxNA==' })
  // const footerSites = await getMenuById({
  //   id: 'dGVybToxNzMx',
  // })
  // const footerCasinos = await getCasinoPreviews({
  //   count: 8,
  //   category: '10223',
  // })
  // const sidebarPosts = await getCasinoPreviews({ count: 6, category: '10223' })
  // const searchData = await getSearchData() // im not sure about having this here as it might be slowing the site down or adding bloat

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
