import Footer from "@/components/navigation/Footer";
import Navigation from "@/components/navigation/Navigation";
import { getMenuById, getCasinoPreviews } from "@/lib/api";
import Provider from "@/store/provider";
import "@/styles/index.css";
import "@/styles/styles.scss";
import PlausibleProvider from "next-plausible";
import dynamic from "next/dynamic";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ReactNode } from "react";

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"));
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["700"],
});

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL as string),
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headerNav = await getMenuById({ id: "dGVybToxMDE4Mg==" });
  const sidebarNav = await getMenuById({ id: "dGVybTo3NA==" });
  const footerNav = await getMenuById({ id: "dGVybToxNA==" });
  const footerSites = await getMenuById({
    id: "dGVybToxNzMx",
  });
  const footerCasinos = await getCasinoPreviews({
    count: 8,
    category: "10223",
  });
  const sidebarPosts = await getCasinoPreviews({ count: 6, category: "10223" });
  const searchData = await getSearchData(); // im not sure about having this here as it might be slowing the site down or adding bloat

  return (
    <html lang="sv-SE">
      <PlausibleProvider domain="casinogringos.se" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={`${jakarta.variable} ${inter.variable}`}>
        <Provider>
          <Navigation
            headerNav={headerNav}
            sidebarPosts={sidebarPosts}
            sidebarNav={sidebarNav}
            searchData={searchData}
          />
          <main className={"relative"}>{children}</main>
          <Footer menu={footerNav} sites={footerSites} posts={footerCasinos} />
          <ScrollToTop />
        </Provider>
      </body>
    </html>
  );
}
