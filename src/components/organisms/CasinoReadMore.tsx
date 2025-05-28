import {
  Calendar,
  Check,
  CreditCard,
  FileText,
  MessageCircle,
  X,
} from "lucide-react";
import ImageComponent from "../ImageComponent";

import { usePlausible } from "next-plausible";
import Image from "next/image";

import InternalLink from "../InternalLink";
const CasinoReadMore = ({ item, close }) => {
  const plausible = usePlausible();

  return (
    <div className={"flex h-full flex-col p-5"}>
      <div className="relative flex items-center gap-6 border-b border-b-gray300 pb-5">
        <button
          onClick={() => close()}
          className="absolute -right-2 -top-2 p-2"
        >
          <span className="sr-only">Stäng</span>
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex w-12 items-center overflow-hidden rounded-md lg:w-16">
          <ImageComponent
            image={item.featuredImage?.node}
            width={80}
            className={undefined}
          />
        </div>
        <h3 className="text-gray-900 flex items-center text-lg font-semibold leading-6 lg:text-xl">
          {item.title}
        </h3>
      </div>
      <div className="flex-shrink flex-grow overflow-y-scroll">
        {item?.postType?.expertSummary && (
          <div className="mt-6 flex flex-col gap-4 rounded-md bg-blue50 p-4 lg:flex-row">
            <div className="min-w-10 lg:w-12">
              <Image
                className="mt-1 flex-shrink-0 rounded-full"
                src="/natalie-heljestrand.avif"
                width={60}
                height={60}
                alt="Natalie"
              />
            </div>
            <div className="border-l-gray200 lg:border-l lg:pl-3">
              <h4 className="mb-1 text-lg font-semibold">
                Vår expert Natalie sammanfattar
              </h4>
              <p className="text-base text-dark/70">
                {item?.postType?.expertSummary}
              </p>
            </div>
          </div>
        )}
        <section className="mt-2">
          <table className="min-w-full">
            <tbody>
              <tr className="border-b border-b-gray200">
                <td className="text-gray-900 flex items-center whitespace-nowrap py-3 text-sm font-medium">
                  <div className="mr-3 rounded-md bg-dark p-2">
                    <Calendar className="flex h-3.5 w-3.5 items-center justify-center text-blue50" />
                  </div>
                  Lanserades:
                </td>
                <td className="text-gray-500 whitespace-nowrap py-3 text-right text-sm font-medium">
                  {item?.postType.lanseradesDatum}
                </td>
              </tr>
              <tr className="border-b border-b-gray200">
                <td className="text-gray-900 flex items-center whitespace-nowrap py-3 text-sm font-medium">
                  <div className="mr-3 rounded-md bg-dark p-2">
                    <FileText className="flex h-3.5 w-3.5 items-center justify-center text-blue50" />
                  </div>
                  Svensk licens:
                </td>
                <td className="text-gray-500 whitespace-nowrap py-3 text-right text-sm font-medium">
                  Ja
                </td>
              </tr>
              <tr className="border-b border-b-gray200">
                <td className="text-gray-900 flex items-center whitespace-nowrap py-3 text-sm font-medium">
                  <div className="mr-3 rounded-md bg-dark p-2">
                    <MessageCircle className="flex h-3.5 w-3.5 items-center justify-center text-blue50" />
                  </div>
                  Livechatt:
                </td>
                <td className="text-gray-500 whitespace-nowrap py-3 text-right text-sm font-medium">
                  Ja
                </td>
              </tr>
              <tr>
                <td className="text-gray-900 flex items-center whitespace-nowrap py-3 text-sm font-medium">
                  <div className="mr-3 rounded-md bg-dark p-2">
                    <CreditCard className="flex h-3.5 w-3.5 items-center justify-center text-blue50" />
                  </div>
                  Minsta insättning:
                </td>
                <td className="text-gray-500 whitespace-nowrap py-3 text-right text-sm font-medium">
                  {item?.postType.minInsattningValue}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        {item?.postType.fordelar && item.postType.nackdelar && (
          <div className="mt-2">
            <section className="mb-6 mt-5 flex flex-col gap-x-8 gap-y-4 lg:flex-row">
              {item?.postType.fordelar && (
                <div className="w-full">
                  <h4 className="text-gray-900 font-semibold">Fördelar:</h4>
                  <ul className="text-gray-600 list-inside list-disc pt-2 font-medium">
                    {item.postType.fordelar?.map((item, i) => (
                      <li
                        className="mb-1 flex items-center gap-x-2 rounded-md bg-green200 px-2.5 py-2.5 pr-4 text-sm font-medium text-black/90"
                        key={`${i}-pros`}
                      >
                        <Check className="h-5 w-5 flex-shrink-0 text-green600" />
                        {item.fordel}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {item?.postType.nackdelar && (
                <div className="w-full">
                  <h4 className="text-gray-900 font-semibold">Nackdelar:</h4>
                  <ul className="text-gray-600 list-inside list-disc pt-2 font-medium">
                    {item.postType.nackdelar.map((item, i) => (
                      <li
                        className="mb-1 flex items-center gap-x-2 rounded-md bg-red200 px-2.5 py-2.5 pr-4 text-sm font-medium text-black/90"
                        key={`${i}-cons`}
                      >
                        <X className="h-5 w-5 flex-shrink-0 text-red600" />
                        {item.nackdel}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
            <section className="mb-6">
              {item?.postType?.paymentproviders?.length > 0 && (
                <>
                  <h4 className="text-gray-900 mb-3 font-semibold">
                    Betalningsmetoder
                  </h4>
                  <div className={"mb-2 flex flex-wrap items-center gap-x-1"}>
                    {item?.postType.paymentproviders.map(
                      (paymentProvider, i) => (
                        <Image
                          src={`/${paymentProvider}.png`}
                          alt={`${paymentProvider}-logo`}
                          width="54"
                          height="30"
                          key={`${i}-paymentprovider`}
                          className={
                            "rounded-md mr-1 border border-gray300 mb-1"
                          }
                        />
                      ),
                    )}
                  </div>
                </>
              )}
            </section>
            {(item?.postType?.bonus || item?.postType?.freespins) && (
              <section>
                <h4 className="text-gray-900 font-semibold">Casino bonus:</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item?.postType?.bonus && (
                    <div className="rounded-lg border border-gray300 p-3 text-center">
                      <span className="text-xs2 font-medium uppercase text-gray700">
                        Bonussumma
                      </span>
                      <p className="font-semibold">{item.postType.bonus} kr</p>
                    </div>
                  )}
                  {item?.postType?.freespins && (
                    <div className="rounded-lg border border-gray300 p-3 text-center">
                      <span className="text-xs2 font-medium uppercase text-gray700">
                        Freespins
                      </span>
                      <p className="font-semibold">
                        {item.postType.freespins} kr
                      </p>
                    </div>
                  )}
                  {item?.postType?.bonusprocent && (
                    <div className="rounded-lg border border-gray300 p-3 text-center">
                      <span className="text-xs2 font-medium uppercase text-gray700">
                        Bonusprocent
                      </span>
                      <p className="font-semibold">
                        {item.postType.bonusprocent}%
                      </p>
                    </div>
                  )}
                  {item?.postType?.wagering && (
                    <div className="rounded-lg border border-gray300 p-3 text-center">
                      <span className="text-xs2 font-medium uppercase text-gray700">
                        Omsättingskrav bonus
                      </span>
                      <p className="font-semibold">{item.postType.wagering}</p>
                    </div>
                  )}
                  {item?.postType?.freespins && (
                    <div className="rounded-lg border border-gray300 p-3 text-center">
                      <span className="text-xs2 font-medium uppercase text-gray700">
                        Omsättingskrav freespins
                      </span>
                      <p className="font-semibold">
                        {item?.postType?.wagerinFreespins
                          ? item.postType.wageringFreespins
                          : "0x"}
                      </p>
                    </div>
                  )}
                  {item?.postType?.minInsattningValue && (
                    <div className="rounded-lg border border-gray300 p-3 text-center">
                      <span className="text-xs2 font-medium uppercase text-gray700">
                        Minsta insättning
                      </span>
                      <p className="font-semibold">
                        {item.postType.minInsattningValue}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}
            {item?.postType?.bonusSport && (
              <section>
                <h4 className="text-gray-900 mt-4 font-semibold">
                  Sportbonus:
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item?.postType?.bonusSport && (
                    <div className="rounded-lg border border-gray300 p-3 text-center">
                      <span className="text-xs2 font-medium uppercase text-gray700">
                        Bonussumma
                      </span>
                      <p className="font-semibold">
                        {item.postType.bonusSport} kr
                      </p>
                    </div>
                  )}
                  {item?.postType?.wageringSportbonus && (
                    <div className="rounded-lg border border-gray300 p-3 text-center">
                      <span className="text-xs2 font-medium uppercase text-gray700">
                        Omsättingskrav
                      </span>
                      <p className="font-semibold">
                        {item.postType.wageringSportbonus}
                      </p>
                    </div>
                  )}
                  {item?.postType?.minInsattningValue && (
                    <div className="rounded-lg border border-gray300 p-3 text-center">
                      <span className="text-xs2 font-medium uppercase text-gray700">
                        Minsta insättning
                      </span>
                      <p className="font-semibold">
                        {item.postType.minInsattningValue}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        {item?.postType.affiliateLink && (
          <InternalLink
            href={`/go/${item?.postType.affiliateLink.node.slug}`}
            target="_blank"
            onClick={() =>
              plausible("AffiliateClick", {
                props: {
                  buttonId: item.slug,
                  place: "CasinoReadMore",
                },
              })
            }
            rel="noopener noreferrer nofollow"
            className="inline-flex w-full justify-center rounded-md bg-button px-3 py-4 text-sm font-semibold text-white shadow-sm hover:bg-green600 sm:col-start-2"
          >
            Besök {item.title}
          </InternalLink>
        )}
        <InternalLink
          href={item.slug}
          // title={'Läs vår recension om ' + item.title}
          className={
            "mt-3 inline-flex w-full justify-center rounded-md bg-white hover:bg-gray100 px-3 py-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          }
        >
          Läs recension
        </InternalLink>
      </div>
    </div>
  );
};

export default CasinoReadMore;
