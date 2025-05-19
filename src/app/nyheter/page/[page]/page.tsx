import { getAllNews, getStaticParams } from "@/lib/api";
import NewsIndex from "@/src/app/NewsIndex";
import Pagination from "../../../../../../casinogringos-v3/src/components/Pagination";
import BreadCrumbs from "../../../../../../casinogringos-v3/src/components/BreadCrumbs";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const paramsResolved = await params;
  const pageNumber = parseInt(paramsResolved.page);
  const title = `Casinonyheter - Senaste nytt om spel och svenska casino - Sida ${pageNumber}`;
  const description =
    "Här hittar du senaste nytt om nätcasino. Nyhetsflödet uppdateras löpande så håll utkik på denna sidan för att inte missa nya kampanjer.";

  return {
    title,
    description,
  };
}

export default async function Page(props: {
  params: Promise<{ page: string }>;
}) {
  const params = await props.params;
  const pageNumber = parseInt(params.page);
  const offset = (pageNumber - 1) * 24;
  const news = await getAllNews({});
  const newsCount = news.edges.length;
  const paginatedNews = news.edges.slice(
    offset,
    offset + 24 < newsCount ? offset + 24 : newsCount,
  );

  const breadcrumbItems = [
    {
      text: "Nyheter",
      url: `${process.env.SITE_URL}/nyheter`,
    },
    {
      text: "Sida " + pageNumber,
    },
  ];

  return (
    <>
      <BreadCrumbs items={breadcrumbItems} />
      <NewsIndex news={paginatedNews} />
      <Pagination
        currentPage={pageNumber}
        numPages={Math.ceil(newsCount / 24)}
        pathPrefix={"nyheter"}
      />
    </>
  );
}

export async function generateStaticParams() {
  const news = await getStaticParams("news");
  const newsCount = news.length;
  const pagesCount = Math.ceil(newsCount / 24);

  return Array.from({ length: pagesCount }).map((_, i) => ({
    page: `${i + 1}`,
  }));
}
