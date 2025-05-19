import { getAllNews, getNodeByUri } from "@/lib/api";
import NewsIndex from "@/src/app/NewsIndex";
import Pagination from "../../../../casinogringos-v3/src/components/Pagination";
import BreadCrumbs from "../../../../casinogringos-v3/src/components/BreadCrumbs";
import { extractSlugFromUrl } from "@/lib/helpers";
import { Metadata } from "next";
import { Page as PageType } from "@/types/index";

export async function generateMetadata() {
  const item = (await getNodeByUri({
    uri: "/nyheter",
  })) as PageType;
  const siteURL = (process.env.SITE_URL as string) + item.uri;
  const metadata = {
    title: item.seo.title ?? item.title,
    description: item.seo.metaDesc,
    alternates: {
      canonical: process.env.SITE_URL + extractSlugFromUrl(item.seo.canonical),
    },
    openGraph: {
      title: item.title,
      description: item.seo.metaDesc,
      url: siteURL,
      locale: "sv_SE",
      siteName: item.seo.opengraphSiteName,
      type: item.seo.opengraphType,
      images: [
        {
          url: item.seo.opengraphImage?.sourceUrl ?? "",
          alt: item.seo.opengraphImage?.altText ?? "",
          width: item.seo.opengraphImage?.mediaDetails.width ?? 1200,
          height: item.seo.opengraphImage?.mediaDetails.height ?? 630,
        },
      ],
    },
  };

  return metadata as Metadata;
}

export default async function Page() {
  const news = await getAllNews({});
  const newsCount = news.edges.length;
  const pageCount = Math.ceil(newsCount / 24);
  const breadcrumbItems = [
    {},
    {
      text: "Nyheter",
      url: `${process.env.SITE_URL}/nyheter`,
    },
  ];

  return (
    <>
      <BreadCrumbs items={breadcrumbItems} />
      <NewsIndex news={news.edges.slice(0, 24)} />
      {pageCount > 1 && (
        <Pagination
          currentPage={1}
          numPages={pageCount}
          pathPrefix={"nyheter"}
        />
      )}
    </>
  );
}

export const dynamic = "force-static";
