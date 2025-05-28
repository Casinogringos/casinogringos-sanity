import BonusBlock from "@/components/BonusBlock";
import BonusBlockOld from "@/components/BonusBlockOld";
import CasinoBlockOld from "@/components/CasinoBlockOld";
import HowTo from "@/components/HowTo";
import ProsAndCons from "@/components/ProsAndCons";
import RatingBlock from "@/components/RatingBlock";
import Summary from "@/components/Summary";
import { Blocks as BlocksType } from "@/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Fragment } from "react";
import CasinoAffiliateButtonBlock from "./CasinoAffiliateButtonBlock";
import CasinoBlock from "./CasinoBlock";
import Columns from "../molecules/Columns";
import Group from "../Group";
import VideoWrapper from "../VideoWrapper";
const Heading = dynamic(() => import("../Heading"));
const RawHTML = dynamic(() => import("../RawHTML"));
const Paragraph = dynamic(() => import("../Paragraph"));
const YoastHowToBlock = dynamic(() => import("./YoastHowToBlock"));
const Toggle = dynamic(() => import("../Toggle"));
const Faq = dynamic(() => import("../Faq"));

const parseJson = (json) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    console.log(e);
    return json;
  }
};

const renderBlock = (block, outerIndex, nested) => {
  if (!block) return null;
  switch (block.__typename) {
    case "CoreButtons":
      if (!block.innerBlocks || block.innerBlocks.length === 0)
        return <RawHTML html={block.renderedHtml} className={"mb-4"} />;
      return (
        <div
          key={`buttons-wrapper-${block.clientId}`}
          className={"flex flex-wrap justify-center gap-4"}
        >
          {block.innerBlocks.map((button) => {
            return (
              <RawHTML
                key={`child-button-block-${button.clientId}`}
                html={button.renderedHtml}
                className={"mb-4"}
              />
            );
          })}
        </div>
      );
    case "CoreQuote":
      return <RawHTML html={block.renderedHtml} />;
    case "FlamingoHeading":
      return <Heading attributes={block.attributes} index={outerIndex} />;
    case "FlamingoAiSummary":
      return (
        <Summary
          attributes={block.attributes}
          content={block.innerBlocks[0]?.attributes.content ?? ""}
          className={"mb-4"}
        />
      );
    case "CoreParagraph":
      return <Paragraph content={block.attributes.content} />;
    case "FlamingoImage": {
      const rawWidth = block.attributes.width;
      const rawHeight = block.attributes.height;
      const aspectRatio = rawWidth / rawHeight;
      const width = nested ? 300 : 768;
      const height = width / aspectRatio;
      return (
        <>
          <Image
            key={`image-block-${block.clientId}`}
            src={`${process.env.WORDPRESS_BASE_URL}${
              block.attributes?.src?.startsWith("http")
                ? new URL(block.attributes.src).pathname
                : (block.attributes?.src ?? "")
            }`}
            alt={block.attributes.alt}
            width={width}
            overrideSrc={`${process.env.WORDPRESS_BASE_URL}${
              block.attributes?.src?.startsWith("http")
                ? new URL(block.attributes.src).pathname
                : (block.attributes?.src ?? "")
            }`}
            height={height > 0 ? height : 400}
            sizes={"(max-width: 1024px) 80vw, 768px"}
            quality={65}
            className={`!mb-3 !mt-6`}
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
          {block?.attributes?.caption && (
            <div className="text-center text-xs text-gray600">
              {block.attributes.caption}
            </div>
          )}
        </>
      );
    }
    case "CoreColumns":
      return <Columns columns={block} />;
    case "FlamingoHowTo":
      return <HowTo block={block} />;
    case "FlamingoFaq": {
      const data = { ...block };
      data.attributes.items = parseJson(block.attributes.items);
      return <Faq data={data} isBlock={true} />;
    }
    case "FlamingoCasino": {
      const data = parseJson(block.renderedHtml);
      return (
        <CasinoBlock key={`casino-block-${block.clientId}`} block={data} />
      );
    }
    case "FlamingoProsAndCons": {
      return <ProsAndCons className={"mb-3"} block={block} />;
    }
    case "FlamingoCasinoOld": {
      return <CasinoBlockOld block={block} />;
    }
    case "FlamingoBonus": {
      const data = parseJson(block.renderedHtml);
      return <BonusBlock className={"mb-4"} block={data} />;
    }
    case "FlamingoBonusOld": {
      return <BonusBlockOld block={block} />;
    }
    case "FlamingoRating": {
      const data = parseJson(block.renderedHtml);
      if (!data?.rating) return null;
      return <RatingBlock className={"mb-4"} block={data} />;
    }
    case "FlamingoToggle":
      return (
        <Toggle
          buttonTextOpen={block.attributes.buttonTextOpen}
          buttonTextClose={block.attributes.buttonTextClose}
          innerBlocks={block.innerBlocks}
        />
      );
    case "CoreGroup":
      return <Group group={block} />;
    case "BlockLabAffiliateButton":
      return <CasinoAffiliateButtonBlock item={block} />;
    case "FlamingoEmbed":
      return <VideoWrapper attributes={block.attributes} />;
    case "YoastHowToBlock":
      return <YoastHowToBlock attributes={block.attributes} />;
    case "CoreTable":
      return (
        <RawHTML
          html={block.renderedHtml}
          className={block.attributes?.cssClassName}
        />
      );
    case "CoreShortcode":
      return <RawHTML html={block.renderedHtml} />;
    case "CoreList": {
      return (
        <RawHTML
          key={`list-block-${block.clientId}`}
          html={block.renderedHtml}
          className={block.attributes?.cssClassName}
        />
      );
    }
    default:
      return null;
    // default:
    //   return block.renderedHtml ? (
    //     <RawHTML
    //       key={`default-block-${block.renderedHtml}`}
    //       html={block?.renderedHtml}
    //       className={block?.attributes?.cssClassName}
    //     />
    //   ) : null
  }
};

const BlocksMap = ({
  blocks,
  className = "",
  nested,
}: {
  blocks: BlocksType;
  className?: string;
  nested?: boolean;
}) => {
  // const conflictingClientIds = blocks?.reduce((acc, block) => {
  //   const allIds = blocks.map((block) => block.clientId)
  //   const count = allIds.filter((id) => id === block.clientId).length
  //   if (count > 1) {
  //     acc.push(block)
  //   }
  //   return acc
  // }, [])
  // console.log('conflictingClientIds', conflictingClientIds)
  if (!blocks) return null;
  return (
    <div key={"blocks-wrapper"} className={`${className}`}>
      {blocks.map((block, outerIndex) => {
        return (
          <Fragment key={`block-${block.clientId}`}>
            {renderBlock(block, outerIndex, nested)}
          </Fragment>
        );
      })}
    </div>
  );
};

export default BlocksMap;
