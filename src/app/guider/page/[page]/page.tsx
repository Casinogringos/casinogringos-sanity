// import { getAllGuidePreviews, getStaticParams } from "@/lib/api";
// import GuidesIndex from "@/src/app/GuidesIndex";
// import Pagination from "../../../../../../casinogringos-v3/src/components/Pagination";
// import BreadCrumbs from "../../../../../../casinogringos-v3/src/components/BreadCrumbs";
//
// export default async function Page(props: {
//   params: Promise<{ page: string }>;
// }) {
//   const params = await props.params;
//   const pageNumber = parseInt(params.page);
//   const offset = (pageNumber - 1) * 24;
//   const guides = await getAllGuidePreviews({});
//   const guidesCount = guides.edges.length;
//   const paginatedGuides = guides.edges.slice(
//     offset,
//     offset + 24 < guidesCount ? offset + 24 : guidesCount,
//   );
//   const breadcrumbItems = [
//     {},
//     {
//       text: "Guider",
//       url: `${process.env.SITE_URL}/guider/page/${pageNumber}`,
//     },
//   ];
//
//   return (
//     <>
//       <BreadCrumbs items={breadcrumbItems} />
//       <GuidesIndex guides={paginatedGuides} />
//       <Pagination
//         currentPage={pageNumber}
//         numPages={Math.ceil(guidesCount / 24)}
//         pathPrefix={"guider"}
//       />
//     </>
//   );
// }
//
// export async function generateStaticParams() {
//   const guides = await getStaticParams("guide");
//   const guidesCount = guides.length;
//   const pagesCount = Math.ceil(guidesCount / 24);
//
//   return Array.from({ length: pagesCount }).map((_, i) => ({
//     page: `${i + 1}`,
//   }));
// }
