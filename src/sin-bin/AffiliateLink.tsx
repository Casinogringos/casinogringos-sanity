"use client";

import { AffiliateLink as AffiliateLinkType } from "@/types/index";
import { usePlausible } from "next-plausible";
import InternalLink from "../components/InternalLink";
const AffiliateLink = ({
  affLink,
  text,
  title,
  place,
  className,
}: {
  affLink: AffiliateLinkType;
  text: string;
  title?: string;
  place?: string;
  className?: string;
}) => {
  const plausible = usePlausible();

  return (
    <InternalLink
      href={`/go/${affLink.slug}`}
      target="_blank"
      rel="nofollow noreferrer noopener"
      prefetch={false}
      onClick={() =>
        plausible("AffiliateClick", {
          props: {
            buttonId: title,
            place: place,
          },
        })
      }
      className={`${className} bg-button hover:bg-buttonHover not-prose inline-block justify-center lg:text-lg text-white no-underline text-center font-semibold px-6 py-4 rounded-md`}
    >
      {text}
    </InternalLink>
  );
};

export default AffiliateLink;
