import Star from "@/components/icons/Star";
import StarHalf from "@/components/icons/StarHalf";
import CoverImage from "../../sin-bin/CoverImage";
import dynamic from "next/dynamic";
const AffiliateButton = dynamic(() => import("../../sin-bin/AffiliateButton"));

export default function CasinoHero({
  title,
  introduction,
  coverImage,
  rating,
  backgroundColor,
  affiliateLink,
  disclaimer,
  bonus,
}) {
  return (
    <div className="bg-darklight py-5 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="flex h-full w-full flex-col gap-x-10 lg:flex-row">
          <div
            className="mb-4 flex items-center justify-center overflow-hidden rounded-md lg:mb-0 lg:min-h-full lg:w-1/4"
            style={{ background: backgroundColor }}
          >
            <CoverImage
              title={title}
              coverImage={coverImage}
              width={150}
              height={150}
            />
          </div>
          <div className="lg:w-3/4">
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            {bonus && (
              <div className="pb-2 pt-1 text-xl font-bold text-primary">
                {bonus}
              </div>
            )}
            {rating && (
              <div className="mb-6 mt-1 flex">
                {Array.from({ length: Math.floor(rating) }).map((_, index) => (
                  <Star
                    key={`rating-star-${index}`}
                    className="h-5 w-5 text-yellow400"
                  />
                ))}
                {rating % 1 !== 0 && (
                  <StarHalf
                    key="rating-star-half"
                    className="h-5 w-5 text-yellow400"
                  />
                )}
              </div>
            )}
            {introduction && (
              <p className="mb-6 text-lg text-gray100">{introduction}</p>
            )}
            {affiliateLink && (
              <AffiliateButton
                affiliateLink={affiliateLink}
                title={title}
                place="CasinoRow recension"
              >
                Till {title}
              </AffiliateButton>
            )}
          </div>
        </div>
        {/* <div className="hidden md:mb-12 md:block">
        <Avatar author={author} date={date} />
      </div> */}
        {/* <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          <Avatar author={author} />
        </div>
      </div> */}
        {disclaimer ? (
          <div
            className="rounded-b-md pt-4 text-xs3 text-gray400 shadow-2xl"
            dangerouslySetInnerHTML={{
              __html: disclaimer,
            }}
          />
        ) : (
          <div className="rounded-b-md pt-4 text-xs3 text-gray400 shadow-2xl">
            18+ | Spela ansvarsfullt | Stödlinjen.se | Spelpaus.se | Regler och
            villkor gäller
          </div>
        )}
      </div>
    </div>
  );
}
