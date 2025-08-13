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
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { headers } from 'next/headers'
import { ReactNode } from 'react'

const ScrollToTop = dynamicImport(
  () => import('@/src/components/molecules/ScrollToTop')
)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600'],
})
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['700'],
})

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
  const sidebarMenu = await getMenuById({
    id: 'a88836bc-b13a-474e-a2f5-ff59513b526a',
  })
  const sidebarToplist = await getToplistById({
    id: 'fa9e75e6-eadc-499c-9019-dc3843a7e2ca',
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
      <body className={`${jakarta.variable} ${inter.variable}`}>
        <Provider>
          <Navigation
            headerMenu={headerMenu}
            sidebarMenu={sidebarMenu}
            sidebarToplist={sidebarToplist}
            pathname={pathname}
          />
          <main className={'relative bg-slate-100'}>{children}</main>
          <ScrollToTop />
        </Provider>
      </body>
    </html>
  )
}

export const dynamic = 'force-static'
