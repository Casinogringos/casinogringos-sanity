"use client";

import { FlamingoFaqBlock } from "@/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FaqItem = ({
  showDescription,
  ariaExpanded,
  fontWeightBold,
  item,
  index,
  onClick,
  isBlock,
}: {
  showDescription: string;
  ariaExpanded: string;
  fontWeightBold: string;
  item: FlamingoFaqBlock["attributes"]["items"][0];
  index: number;
  onClick: () => void;
  isBlock: boolean;
}) => (
  <div key={item.question} className={"rounded-md mb-3 overflow-hidden"}>
    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
      <button
        aria-expanded={ariaExpanded}
        aria-controls={`faq${index + 1}_desc`}
        data-qa="faq__question-button"
        className={`${isBlock ? "bg-slate100" : "bg-lightBlue2"} w-full p-5 ${fontWeightBold}`}
        onClick={onClick}
      >
        <h3
          className={`${isBlock ? "text-dark" : "text-white"} not-prose text-left text-base font-normal w-full flex justify-between items-center`}
          itemProp="name"
        >
          <span>
            {item.question
              .replaceAll("<strong>", "")
              .replaceAll("</strong>", "")}
          </span>
          <ChevronDown
            className={`w-5 h-5 ms-3 ${showDescription ? "rotate-180" : ""}`}
          />
        </h3>
      </button>
      <div
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
        id={`faq${index + 1}_desc`}
        data-qa="faq__desc"
        className={`${isBlock ? "bg-slate100" : "bg-lightBlue2"} p-5 mt-1 ${
          showDescription ? "block" : "hidden"
        }`}
      >
        <div
          itemProp="text"
          className={`${isBlock ? "text-dark" : "text-white"} text-base`}
          dangerouslySetInnerHTML={{ __html: item.answer }}
        />
      </div>
    </div>
  </div>
);

const FAQBlock = ({
  data,
  isBlock,
}: {
  data: FlamingoFaqBlock;
  isBlock?: boolean;
}) => {
  const [activeIndex, setActiveIndex] = useState<number>();
  const { items, description } = data.attributes;

  return (
    <>
      <div itemScope itemType="https://schema.org/FAQPage">
        <div className="mb-12 text-center">
          {!isBlock && (
            <h2
              className={`${isBlock ? "text-dark" : "text-white"} text-3xl mb-4 font-semibold not-prose`}
            >
              Frågor och svar
            </h2>
          )}
          {description && !isBlock && (
            <p
              className={`lg:text-lg text-slate300 ${isBlock ? "text-dark" : "text-white"}`}
            >
              {description}
            </p>
          )}
        </div>
        {items.map((item, index) => {
          const showDescription =
            index === activeIndex ? "show-description" : "";
          const fontWeightBold =
            index === activeIndex ? "font-weight-bold" : "";
          const ariaExpanded = index === activeIndex ? "true" : "false";
          return (
            <FaqItem
              isBlock={isBlock}
              showDescription={showDescription}
              fontWeightBold={fontWeightBold}
              ariaExpanded={ariaExpanded}
              item={item}
              key={`question-${item.question}`}
              index={index}
              onClick={() => {
                if (index !== activeIndex) {
                  setActiveIndex(index);
                } else {
                  setActiveIndex(undefined);
                }
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default FAQBlock;
