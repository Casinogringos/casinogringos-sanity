"use client";

import { useState, useEffect } from "react";
import ImageComponent from "./ImageComponent";
import dynamic from "next/dynamic";
const AffiliateLink = dynamic(() => import("../sin-bin/AffiliateLink"));

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const StickyCasino = ({ item }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  return (
    <div
      className={classNames(
        isVisible ? "bottom-0 right-0 z-20" : "translate-y-96",
        "bg-slate100 border-t border-t-slate200 p-3 lg:px-8 transition fixed w-full shadow-sm",
      )}
    >
      <div className="max-w-4xl mx-auto lg:px-16 flex flex-col lg:flex-row gap-y-2 lg:gap-x-0 w-full items-center lg:justify-left justify-center">
        <div className="flex w-full items-center gap-x-4 lg:gap-x-6">
          <div className="flex h-12 w-20 items-center rounded-sm overflow-hidden">
            <ImageComponent
              image={item?.featuredImage?.node}
              width={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="lg:w-3/3">
            <span className="text-slate500 font-semibold block -mt-1 my-0 text-lg">
              {item.title}
            </span>
            {item?.postType && (
              <span className="text-dark text-sm lg:text-base -mt-0.5 lg:-mt-1 block font-semibold">
                {item?.postType.title}
              </span>
            )}
          </div>
        </div>
        <div className="w-full lg:w-3/6 flex items-center lg:pb-0">
          <AffiliateLink
            className="h-12 flex items-center lg:text-base w-full"
            text={`Till ${item.title}`}
            place={item.slug}
            affLink={item.postType.affiliateLink.node}
          />
        </div>
      </div>
    </div>
  );
};

export default StickyCasino;
