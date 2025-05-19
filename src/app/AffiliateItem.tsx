"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Container from "../../../casinogringos-v3/src/components/Container";

const AffiliateItem = ({ affiliate }) => {
  const router = useRouter();
  const url = affiliate.affiliateLinkType.affiliateUrl;
  const logo = affiliate.affiliateLinkType.logoForOperator?.node;
  const goToOperator = () => {
    router.push(url);
  };

  useEffect(() => {
    setTimeout(function () {
      goToOperator();
    }, 1000);
    document.body.classList.add("overflow-hidden");
  });

  return (
    <>
      <Image
        src={"/fade.png"}
        alt={"Background Image"}
        width={1920}
        height={1080}
        style={{ objectFit: "contain" }}
        className={"absolute bottom-0 top-auto rotate-180"}
      />
      <div
        className={
          "min-h-screen bg-darklight flex items-center flex-col justify-center"
        }
      >
        <Container>
          <p className={"mb-12 text-center text-3xl lg:text-4xl"}>
            <span className={"font-bold text-slate400"}>
              Tack för att du besökte
            </span>
            <span className={"block font-bold text-white md:inline-block"}>
              &nbsp;Casinogringos.se
            </span>
          </p>
          <div
            className={
              "flex items-center justify-center gap-x-2 md:gap-x-3 mb-12"
            }
          >
            <div
              className={
                "h-28 w-28 md:h-32 md:w-32 relative bg-white p-3 rounded-md overflow-hidden flex items-center"
              }
            >
              <Image
                src="/casinogringos.webp"
                priority={true}
                alt="Casinogringos"
                width={160}
                height={60}
              />
            </div>
            <div className={"mx-5 flex"}>
              <div
                className={
                  "h-3 w-3 animate-pulse delay-0 bg-gray200 rounded-full"
                }
              ></div>
              <div
                className={
                  "h-3 w-3 mx-1 animate-pulse delay-500 bg-gray200 rounded-full"
                }
              ></div>
              <div
                className={
                  "h-3 w-3 animate-pulse delay-1000 bg-gray200 rounded-full"
                }
              ></div>
            </div>
            <div
              className={
                "h-28 w-28 md:h-32 md:w-32 relative rounded-md overflow-hidden"
              }
            >
              <Image src={logo?.sourceUrl} alt={logo?.altText} fill={true} />
            </div>
          </div>
          <p className={"text-center text-lg text-slate400"}>
            Om du inte blir skickad vidare till{" "}
            <span className={"italic text-white"}>{affiliate.title}</span> kan
            du&nbsp;
            <span
              className={"cursor-pointer text-primary"}
              onClick={() => goToOperator()}
            >
              klicka här
            </span>
            .
          </p>
        </Container>
      </div>
    </>
  );
};

export default AffiliateItem;
