import { isUrl } from "@/lib/helpers";
import { FlamingoCasinoBlockOld } from "@/types";
import dynamic from "next/dynamic";
import Image from "next/image";
const Paragraph = dynamic(() => import("@/components/Paragraph"));
const AffiliateButton = dynamic(() => import("../../sin-bin/AffiliateButton"));

const CasinoBlock = ({ block }: { block: FlamingoCasinoBlockOld }) => {
  const { attributes } = block;
  const {
    logoUrl: logoUrlRaw,
    buttonText,
    offer,
    description,
    brandName,
  } = attributes;
  let logoUrl: string;
  if (isUrl(logoUrlRaw)) {
    logoUrl = new URL(logoUrlRaw).pathname;
  } else {
    logoUrl = logoUrlRaw;
  }

  return (
    <div
      className={
        "grid grid-cols-1 md:grid-cols-[100px,1fr] bg-slate100 rounded-lg lg:px-6 px-5 py-6 mb-4 lg:mb-6 lg:py-9 gap-6"
      }
    >
      <div className={"flex md:block lg:justify-center"}>
        <Image
          src={`${process.env.WORDPRESS_BASE_URL}${logoUrl}`}
          alt={`${brandName} Logo`}
          width={100}
          height={100}
          quality={50}
          className={"rounded-full"}
        />
      </div>
      <div>
        <h3 className={"!mb-0 !mt-0 text-2xl"}>{brandName}</h3>
        <span className={"block pb-0 pt-2 font-bold leading-6 text-dark"}>
          {offer}
        </span>
        {description.split("\n").map((item, index) => (
          <Paragraph key={`casino-block-description-${index}`} content={item} />
        ))}

        <AffiliateButton
          affiliateLink={`${attributes.trackerUrl}`}
          place="CasinoRow block"
          title={buttonText}
        >
          {buttonText}
        </AffiliateButton>
      </div>
    </div>
  );
};

export default CasinoBlock;
