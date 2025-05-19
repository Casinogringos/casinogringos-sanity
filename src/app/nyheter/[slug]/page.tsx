import { getAllNews, getNodeByUri, getStaticParams } from "@/lib/api";
import { notFound } from "next/navigation";
import Article from "@/src/app/Article";
import BreadCrumbs from "../../../../../casinogringos-v3/src/components/BreadCrumbs";
import { extractSlugFromUrl } from "@/lib/helpers";
import { Metadata } from "next";
import { News as NewsType } from "@/types/index";

type Params = Promise<{ slug: string }>;

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const item = (await getNodeByUri({
    uri: `/nyheter/${params?.slug}`,
  })) as NewsType;

  if (!item) return null;

  const siteURL = (process.env.SITE_URL as string) + item?.uri;
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

export default async function News(props: { params: Params }) {
  const params = await props.params;
  const article = (await getNodeByUri({
    uri: `/nyheter/${params?.slug}`,
  })) as NewsType;
  const articles = await getAllNews({});
  const similarArticles = articles?.edges
    .filter(({ node }) => node.id !== article?.id)
    .splice(0, 4);

  if (!article) return notFound();

  return (
    <>
      {article.seo.breadcrumbs && (
        <BreadCrumbs
          items={article.seo.breadcrumbs}
          index={{ text: "Nyheter", url: `${process.env.SITE_URL}/nyheter` }}
        />
      )}
      <Article article={article} similarArticles={similarArticles} />
    </>
  );
}

export async function generateStaticParams() {
  const allNews = await getStaticParams("news");

  return allNews.map(({ node }) => ({ slug: node.slug }));
}
