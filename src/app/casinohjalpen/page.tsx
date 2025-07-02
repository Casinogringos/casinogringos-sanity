const Page = async () => {
  return <div>casinohjalpen</div>
}
export default Page
// import { fetchAPI } from "@/lib/api";
// import { allCasinoCardsQuery } from "@/data/queries";
// import { Post } from "@/types";
// import dynamicComponent from "next/dynamic";
//
// const CasinoHelperPage = dynamicComponent(
//   () => import("@/src/app/CasinoHelperPage"),
// );
//
// export const metadata = {
//   title: "Casinohjälpen - Ett verktyg för att hitta rätt casino",
//   description:
//     "Casinohjälpen är vårt egna verktyg som hjälper spelare att hitta rätt online casino. Svara på frågorna för att se ditt resultat.",
// };
//
// const getInitialCasinos = async () => {
//   const data = await fetchAPI({
//     query: allCasinoCardsQuery(),
//   });
//   const casinos = data.posts.edges;
//
//   return casinos.map(({ node }) => node) as Post[];
// };
//
// const Page = async () => {
//   const casinos = await getInitialCasinos();
//
//   return <CasinoHelperPage initialCasinos={casinos} />;
// };
//
// export default Page;
//
// export const dynamic = "force-static";
