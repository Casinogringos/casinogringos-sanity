const Page = async () => {
  return <div>go</div>
}
export default Page
// import { notFound } from "next/navigation";
// import { getNodeByUri, getStaticParams } from "@/lib/api";
// import dynamicComponent from "next/dynamic";
// import { AffiliateLink } from "@/types/index";
// const AffiliateItem = dynamicComponent(() => import("@/src/app/AffiliateItem"));
//
// const AffiliatePage = async (props: { params: Promise<{ slug: string }> }) => {
//   const params = await props.params;
//   const affiliate = (await getNodeByUri({
//     uri: `/go/${params?.slug}`,
//   })) as AffiliateLink;
//   if (!affiliate) {
//     return notFound();
//   }
//
//   return <AffiliateItem affiliate={affiliate} />;
// };
//
// export const metadata = {
//   robots: {
//     index: false,
//     nocache: true,
//   },
// };
//
// export async function generateStaticParams() {
//   const affiliates = await getStaticParams("affiliate");
//
//   return affiliates.map(({ node }) => ({ slug: node.slug })) || [];
// }
//
// export default AffiliatePage;
