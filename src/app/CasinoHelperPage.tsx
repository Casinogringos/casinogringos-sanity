// "use client";
//
// import { useEffect, useState } from "react";
// import { Casino } from "@/src/types";
// import Container from "@/src/components/atoms/Container";
// import { ChevronLeft } from "lucide-react";
// import Paragraph from "@/src/components/atoms/Paragraph";
// import Button from "@/src/components/atoms/Button";
// import CasinoList from "@/src/components/organisms/CasinoList";
//
//
// const CasinoHelperPage = ({ initialCasinos }: { initialCasinos: Casino[] }) => {
//   const [casinos, setCasinos] = useState<Casino[] | null>(initialCasinos);
//   const [index, setIndex] = useState<number>(0);
//   const [category, setCategory] = useState<"casino" | "betting" | null>(null);
//   const [history, setHistory] = useState<{ index: number; state: string[] }[]>(
//     [],
//   );
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [index]);
//   const handleAnswer = ({
//     answer,
//     index,
//   }: {
//     answer: {
//       text: string;
//       nextIndex: number;
//       previousIndex: number;
//       callback: ((items: Casino[] | null) => Casino[] | null) | null;
//     };
//     index: number;
//   }) => {
//     const { nextIndex, callback } = answer;
//     setHistory((prev) => [
//       ...prev,
//       { index: index, state: casinos?.map((item) => item.id) ?? [] },
//     ]);
//     const newCasinos = callback ? callback(casinos) : casinos;
//     setCasinos(newCasinos);
//     setIndex(nextIndex);
//   };
//   const handleStartAgain = () => {
//     setCasinos(initialCasinos);
//     setIndex(0);
//   };
//   const questions = [
//     {
//       question: "Vad är du intresserad av?",
//       answers: [
//         {
//           text: "Betting",
//           nextIndex: 1,
//           callback: (items: Casino[]) => {
//             setCategory("betting");
//             return items.filter((item: Casino) =>
//               item.categories.edges.some(
//                 ({ node }) => node.slug === "bettingsidor",
//               ),
//             );
//           },
//         },
//         {
//           text: "Casino",
//           nextIndex: 1,
//           callback: (items) => {
//             setCategory("casino");
//             return items.filter((item) =>
//               item.categories.edges.some(({ node }) => node.slug === "casino"),
//             );
//           },
//         },
//         {
//           text: "Både och",
//           nextIndex: 1,
//           callback: (items) => {
//             setCategory(null);
//             return items.filter(
//               (item) =>
//                 !item.categories.edges.some(
//                   ({ node }) => node.slug === "exkludera",
//                 ),
//             );
//           },
//         },
//       ],
//     },
//     {
//       question: "Är en bonus viktig för dig?",
//       answers: [
//         {
//           text: "Ja",
//           nextIndex: 2,
//           callback: (items) => {
//             if (category) {
//               return items.filter((item) =>
//                 item.categories.edges.some(
//                   ({ node }) =>
//                     node.slug ===
//                     (category === "casino" ? "casino-bonus" : "betting-bonus"),
//                 ),
//               );
//             } else {
//               return items.filter((item) =>
//                 item.categories.edges.some(
//                   ({ node }) =>
//                     node.slug === "betting-bonus" ||
//                     node.slug === "casino-bonus",
//                 ),
//               );
//             }
//           },
//         },
//         {
//           text: "Nej",
//           nextIndex: 3,
//           callback: null,
//         },
//       ],
//     },
//     {
//       question: "Vill du ha free spins eller bonuspengar?",
//       answers: [
//         {
//           text: "Både och / Spelar ingen roll",
//           nextIndex: 3,
//           callback: null,
//         },
//         {
//           text: "Bonuspengar",
//           nextIndex: 3,
//           callback: (items) =>
//             items.filter((item) =>
//               item.categories?.edges.some(
//                 ({ node }) => node.slug === "casino-bonus",
//               ),
//             ),
//         },
//         {
//           text: "Free spins",
//           nextIndex: 3,
//           callback: (items) =>
//             items.filter((item) =>
//               item.categories?.edges.some(
//                 ({ node }) => node.slug === "freespins",
//               ),
//             ),
//         },
//       ],
//     },
//     {
//       question: "Vilken betalningsmetod vill du använda?",
//       answers: [
//         {
//           text: "Swish",
//           nextIndex: 4,
//           callback: (items) =>
//             items.filter((item) =>
//               item.postType.paymentprovidersNew?.edges.some(
//                 ({ node }) => node.slug === "swish",
//               ),
//             ),
//         },
//         {
//           text: "Trustly",
//           nextIndex: 4,
//           callback: (items) =>
//             items.filter((item) =>
//               item.postType.paymentprovidersNew?.edges.some(
//                 ({ node }) => node.slug === "trustly",
//               ),
//             ),
//         },
//         {
//           text: "Zimpler",
//           nextIndex: 4,
//           callback: (items) =>
//             items.filter((item) =>
//               item.postType.paymentprovidersNew?.edges.some(
//                 ({ node }) => node.slug === "zimpler",
//               ),
//             ),
//         },
//         {
//           text: "E-plånbok",
//           nextIndex: 4,
//           callback: (items) =>
//             items.filter((item) =>
//               item.postType.paymentprovidersNew?.edges.some(
//                 ({ node }) => node.slug === "apple-pay",
//               ),
//             ),
//         },
//         {
//           text: "Kort",
//           nextIndex: 4,
//           callback: (items) =>
//             items.filter((item) =>
//               item.postType.paymentprovidersNew?.edges.some(
//                 ({ node }) =>
//                   node.slug === "visa" || node.slug === "mastercard",
//               ),
//             ),
//         },
//         {
//           text: "Spelar ingen roll / Annan",
//           nextIndex: 4,
//           callback: null,
//         },
//       ],
//     },
//     {
//       question: "Hur mycket vill du sätta in?",
//       answers: [
//         {
//           text: "Under 100 kr",
//           nextIndex: 5,
//           callback: (items) =>
//             items.filter((item) => {
//               const sanitizedValue = item.postType.minInsattningValue?.replace(
//                 /[^0-9]/g,
//                 "",
//               );
//               return parseInt(sanitizedValue) < 100;
//             }),
//         },
//         {
//           text: "100 kr",
//           nextIndex: 5,
//           callback: (items) =>
//             items.filter((item) => {
//               const sanitizedValue = item.postType.minInsattningValue?.replace(
//                 /[^0-9]/g,
//                 "",
//               );
//               return parseInt(sanitizedValue) >= 100;
//             }),
//         },
//         {
//           text: "200 kr eller mer",
//           nextIndex: 5,
//           callback: null,
//         },
//       ],
//     },
//   ];
//
//   if (!casinos?.length)
//     return (
//       <div
//         className={"py-6 lg:py-12 flex flex-col items-center justify-center"}
//       >
//         <Container>
//           <div
//             className={"flex flex-col items-center justify-center lg:h-[400px]"}
//           >
//             <Paragraph
//               content={
//                 "Inga casinon matchar dina kriterier. Försök gärna igen."
//               }
//               className={"mb-10 text-sm text-gray500"}
//             />
//             <Button
//               size={"large"}
//               className="lg:text-[17px]"
//               callback={handleStartAgain}
//             >
//               Börja om
//             </Button>
//           </div>
//         </Container>
//       </div>
//     );
//
//   return (
//     <div className={"min-h-[96svh] py-6 lg:py-12"}>
//       <Container className="min-h-[80svh] lg:min-h-[65svh] flex flex-col justify-between">
//         <div>
//           {index === 0 && (
//             <span
//               className={
//                 "w-fit mx-auto text-center p-4 rounded-md text-gray800 mt-8 mb-6 block"
//               }
//             >
//               Hej och välkommen till casinohjälpen! För att kunna hjälpa dig
//               hitta rätt casino behöver vi ställa några frågor, det tar bara
//               någon minut.
//             </span>
//           )}
//           {index === questions.length ? (
//             <>
//               <span
//                 className={
//                   "w-fit bg-slate100 p-4 rounded-md text-gray700 mb-6 block"
//                 }
//               >
//                 Toppen! Vi hittade <strong>{casinos.length} casinon</strong> som
//                 matchar dina kriterier - Här är resultaten.
//               </span>
//               <CasinoList
//                 casinos={casinos.map((item) => ({ node: item }))}
//                 title={"Casinohjalpen Results"}
//                 casinoHelper={true}
//               />
//               <div className={"flex items-center justify-center"}>
//                 <Button size={"large"} callback={handleStartAgain}>
//                   Börja om
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <div
//               className={"flex flex-col items-center justify-between gap-y-10"}
//             >
//               {index !== 0 && (
//                 <span className={"text-sm text-gray700 mt-6"}>
//                   {casinos.length} casinon matchar dina kriterier
//                 </span>
//               )}
//               <Paragraph
//                 content={questions[index].question}
//                 className={"bg-slate100 p-4 rounded-md"}
//               />
//               {index !== 0 && (
//                 <div>
//                   <div
//                     onClick={() => {
//                       setCasinos(
//                         history[history.length - 1].state
//                           .map((id) =>
//                             initialCasinos.find((item) => item.id === id),
//                           )
//                           .filter((item) => item !== undefined) as Casino[],
//                       );
//                       setIndex(history[history.length - 1].index);
//                       setHistory((prev) => prev.slice(0, history.length - 1));
//                     }}
//                     className={"rounded-full bg-gray100 p-4 cursor-pointer"}
//                   >
//                     <ChevronLeft className={"h-4 w-4"} />
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//         {index !== questions.length && (
//           <div className="flex flex-wrap gap-3 justify-center items-center">
//             {questions[index].answers.map((answer, i) => (
//               <Button
//                 key={`answer-${i}`}
//                 callback={() =>
//                   handleAnswer({
//                     answer: { ...answer, previousIndex: i },
//                     index,
//                   })
//                 }
//                 className="lg:text-[17px]"
//                 size={"large"}
//               >
//                 {answer.text}
//               </Button>
//             ))}
//           </div>
//         )}
//       </Container>
//     </div>
//   );
// };
//
// export default CasinoHelperPage;
