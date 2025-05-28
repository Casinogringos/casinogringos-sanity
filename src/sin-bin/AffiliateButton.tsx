"use client";

import { isUrl } from "@/lib/helpers";
import { usePlausible } from "next-plausible";
import { ReactNode } from "react";
import InternalLink from "../components/InternalLink";
export default function AffiliateButton({
  title,
  children,
  affiliateLink,
  place,
  flex = true,
  className = "",
  pathname,
}: {
  title: string;
  children: ReactNode;
  affiliateLink: string;
  place?: string;
  flex?: boolean;
  className?: string;
  pathname?: string;
}) {
  // temporary solution until we standardise the aff link values
  let slug: string;
  if (isUrl(affiliateLink)) {
    slug = new URL(affiliateLink).pathname
      .split("/")
      .filter((x) => x !== "" && x !== "go")[0];
  } else {
    slug = affiliateLink?.split("/").filter((x) => x !== "" && x !== "go")[0];
  }

  const plausible = usePlausible();

  return (
    <InternalLink
      href={`/go/${slug}`}
      target="_blank"
      rel="nofollow noreferrer noopener"
      prefetch={false}
      onClick={() =>
        plausible("AffiliateClick", {
          props: {
            buttonId: title,
            place: place,
            pathname: pathname,
          },
        })
      }
      className={`${className} bg-button hover:bg-buttonHover ${
        flex ? "flex" : ""
      } not-prose inline-block justify-center lg:text-lg text-white no-underline text-center font-semibold px-6 py-4 rounded-md`}
    >
      {children}
    </InternalLink>
  );
}
