import { getAllSlotPreviews, getNodeByUri } from "@/lib/api";
import SlotIndex from "@/src/app/SlotIndex";
import { extractSlugFromUrl } from "@/lib/helpers";
import { Page as PageType } from "@/types/index";
import { Metadata } from "next";

export async function generateMetadata() {
  const item = (await getNodeByUri({ uri: "/slots" })) as PageType;
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
  const slots = await getAllSlotPreviews({});
  const page = (await getNodeByUri({ uri: "/slots" })) as PageType;

  return <SlotIndex slots={slots} page={page} />;
}

export const dynamic = "force-static";
