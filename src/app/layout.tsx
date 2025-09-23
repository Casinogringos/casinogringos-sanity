import Navigation from '@/src/components/organisms/Navigation'
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
import Footer from '@/src/components/organisms/Footer'
import { inter } from '@/src/styles/fonts'

const ScrollToTop = dynamicImport(
  () => import('@/src/components/molecules/ScrollToTop')
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
    id: '44b803d0-621c-4c3f-9c2c-69fb774489bb',
  })
  console.log('headerMenu', headerMenu)
  const sidebarMenu = await getMenuById({
    id: 'a88836bc-b13a-474e-a2f5-ff59513b526a',
  })
  const sidebarToplist = await getToplistById({
    id: 'fa9e75e6-eadc-499c-9019-dc3843a7e2ca',
  })
  const siteLinks = await getMenuById({
    id: 'ce4ec368-a2be-4bd2-b6b6-b10d48af6109',
  })
  const popularCasinos = await getMenuById({
    id: '8448085d-edd3-4c66-abd9-38ef394c71c2',
  })
  const latestReviews = await getMenuById({
    id: '249c442e-d010-406b-aae8-e08df2cd257a',
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
          {/* <Footer siteLinks={siteLinks} popularCasinos={popularCasinos} latestReviews={latestReviews} /> */}
        </Provider>
      </body>
    </html>
  )
}

export const dynamic = 'force-static'
