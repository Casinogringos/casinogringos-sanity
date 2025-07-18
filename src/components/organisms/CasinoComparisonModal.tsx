import { CheckCircle, X, XCircle, Star } from 'lucide-react'

import ImageWrap from '../../sin-bin/ImageWrap'
import dynamic from 'next/dynamic'
const AffiliateButton = dynamic(
  () => import('../../../sin-bin/AffiliateButton')
)

const CasinoComparisonModal = ({
  close,
  casinosToCompare,
  removeComparisonId,
  emptyComparisonSlots,
}) => {
  const rowClasses =
    'border-b border-b-gray500 border-opacity-25 py-3 grid grid-cols-4 gap-4 text-white text-sm'

  return (
    <div className={'flex h-full flex-col bg-dark p-4'}>
      <div className={'mb-3 w-full text-right text-sm text-white'}>
        <button onClick={() => close()}>
          <X aria-hidden="true" />
          <span className="sr-only">Stäng</span>
        </button>
      </div>
      <div className={'mb-4 grid grid-cols-4 gap-4'}>
        <div />
        {casinosToCompare.map(({ node }) => (
          <div
            className={'flex h-28 flex-col md:h-48'}
            key={`casino-${node.id}`}
          >
            <div className={'relative flex-grow'}>
              <ImageWrap
                image={node.featuredImage.node}
                className={
                  'rounded-md h-14 md:h-32 w-full max-w-full object-cover'
                }
                width={200}
              />
              <button
                aria-label={'Ta bort casino från jämförelselistan'}
                onClick={() => removeComparisonId(node.id)}
                className={
                  'absolute bg-white h-5 w-5 -top-1 -right-1 rounded-full'
                }
              >
                <X
                  aria-hidden="true"
                  className={'text-dark-blue h-full w-full p-1'}
                />
              </button>
            </div>
            {node?.postType.affiliateLink?.node.slug && (
              <AffiliateButton
                place="CasinoCard jämförelse"
                affiliateLink={node?.postType.affiliateLink?.node.slug}
                title={node?.title}
              >
                <div className={'text-sm'}>Spela</div>
              </AffiliateButton>
            )}
          </div>
        ))}
        {[...Array(emptyComparisonSlots)].map((_, index) => (
          <div
            onClick={() => close()}
            key={`empty-comparison-slot-${index}`}
            className={
              'bg-gray200 flex items-center justify-center rounded-md cursor-pointer h-28 md:h-48'
            }
          >
            +
          </div>
        ))}
      </div>
      <div className={'flex-grow overflow-y-auto'}>
        <div className={rowClasses}>
          <div>
            <span>Betyg</span>
          </div>
          {casinosToCompare.map(({ node }) => (
            <div
              className={'flex items-center justify-center'}
              key={`rating-${node.id}`}
            >
              <Star
                className="mr-1 h-3 w-3 flex-shrink-0 text-yellow400"
                aria-hidden="true"
              />
              <span className={'font-bold'}>{node.postType.rating}</span>
              <span className={'text-gray-400 font-normal'}>/5</span>
            </div>
          ))}
        </div>
        <div className={rowClasses}>
          <div className={'flex items-center'}>
            <span>Bonus</span>
          </div>
          {casinosToCompare.map(({ node }) => (
            <div
              className={'flex items-center justify-center'}
              key={`bonus_${node.id}`}
            >
              <span>{node.postType?.bonus ?? '-'} kr</span>
            </div>
          ))}
        </div>
        <div className={rowClasses}>
          <div className={'flex items-center'}>
            <span>Omsättningskrav</span>
          </div>
          {casinosToCompare.map(({ node }) => (
            <div
              className={'flex items-center justify-center'}
              key={`wagering-${node.id}`}
            >
              <span>{node.postType?.wagering ?? '-'}</span>
            </div>
          ))}
        </div>
        <div className={rowClasses}>
          <div className={'flex items-center'}>
            <span>Free Spins</span>
          </div>
          {casinosToCompare.map(({ node }) => (
            <div
              className={'flex items-center justify-center'}
              key={`freespins-${node.id}`}
            >
              <span>{node.postType?.freespins ?? '-'}</span>
            </div>
          ))}
        </div>
        <div className={rowClasses}>
          <div className={'flex items-center'}>
            <span>Min. Insättning</span>
          </div>
          {casinosToCompare.map(({ node }) => (
            <div
              className={'flex items-center justify-center'}
              key={`min-deposit-${node.id}`}
            >
              <span>{node.postType?.minInsattningValue ?? '-'}</span>
            </div>
          ))}
        </div>
        <div className={rowClasses}>
          <div className={'flex items-center'}>
            <span>Trustly</span>
          </div>
          {casinosToCompare.map(({ node }) => {
            const paymentProviders =
              node.postType.paymentprovidersNew.edges.map(
                ({ node }) => node.slug
              )
            return (
              <div
                className={'flex items-center justify-center'}
                key={`trustly-${node.id}`}
              >
                {paymentProviders.includes('trustly') ? (
                  <>
                    <CheckCircle
                      className={'text-green500'}
                      aria-hidden="true"
                    />
                    <span className="sr-only">Ja</span>
                  </>
                ) : (
                  <>
                    <XCircle className={'text-red500'} aria-hidden="true" />
                    <span className="sr-only">Nej</span>
                  </>
                )}
              </div>
            )
          })}
        </div>
        <div className={rowClasses}>
          <div className={'flex items-center'}>
            <span>Apple Pay</span>
          </div>
          {casinosToCompare.map(({ node }) => {
            const paymentProviders =
              node.postType.paymentprovidersNew.edges.map(
                ({ node }) => node.slug
              )
            return (
              <div
                className={'flex items-center justify-center'}
                key={`applepay-${node.id}`}
              >
                {paymentProviders.includes('applepay') ? (
                  <>
                    <CheckCircle
                      className={'text-green500'}
                      aria-hidden="true"
                    />
                    <span className="sr-only">Ja</span>
                  </>
                ) : (
                  <>
                    <XCircle className={'text-red600'} aria-hidden="true" />
                    <span className="sr-only">Nej</span>
                  </>
                )}
              </div>
            )
          })}
        </div>
        <div className={rowClasses}>
          <div className={'flex items-center'}>
            <span>Swish</span>
          </div>
          {casinosToCompare.map(({ node }) => {
            const paymentProviders =
              node.postType.paymentprovidersNew.edges.map(
                ({ node }) => node.slug
              )
            return (
              <div
                className={'flex items-center justify-center'}
                key={`swish-${node.id}`}
              >
                {paymentProviders.includes('swish') ? (
                  <>
                    <CheckCircle
                      className={'text-green500'}
                      aria-hidden="true"
                    />
                    <span className="sr-only">Ja</span>
                  </>
                ) : (
                  <>
                    <XCircle className={'text-red600'} aria-hidden="true" />
                    <span className="sr-only">Nej</span>
                  </>
                )}
              </div>
            )
          })}
        </div>
        <div className={rowClasses}>
          <div className={'flex items-center'}>
            <span>Visa</span>
          </div>
          {casinosToCompare.map(({ node }) => {
            const paymentProviders =
              node.postType.paymentprovidersNew.edges.map(
                ({ node }) => node.slug
              )
            return (
              <div
                className={'flex items-center justify-center'}
                key={`visa-${node.id}`}
              >
                {paymentProviders.includes('visa') ? (
                  <>
                    <CheckCircle
                      className={'text-green500'}
                      aria-hidden="true"
                    />
                    <span className="sr-only">Ja</span>
                  </>
                ) : (
                  <>
                    <XCircle className={'text-red600'} aria-hidden="true" />
                    <span className="sr-only">Nej</span>
                  </>
                )}
              </div>
            )
          })}
        </div>
        <div className={rowClasses}>
          <div className={'flex items-center'}>
            <span>Skrill</span>
          </div>
          {casinosToCompare.map(({ node }) => {
            const paymentProviders =
              node.postType.paymentprovidersNew.edges.map(
                ({ node }) => node.slug
              )
            return (
              <div
                className={'flex items-center justify-center'}
                key={`skrill-${node.id}`}
              >
                {paymentProviders.includes('skrill') ? (
                  <>
                    <CheckCircle
                      className={'text-green500'}
                      aria-hidden="true"
                    />
                    <span className="sr-only">Ja</span>
                  </>
                ) : (
                  <>
                    <XCircle className={'text-red600'} aria-hidden="true" />
                    <span className="sr-only">Nej</span>
                  </>
                )}
              </div>
            )
          })}
        </div>
        <div className={rowClasses}>
          <div className={'flex items-center'}>
            <span>Mastercard</span>
          </div>
          {casinosToCompare.map(({ node }) => {
            const paymentProviders =
              node.postType.paymentprovidersNew.edges.map(
                ({ node }) => node.slug
              )
            return (
              <div
                className={'flex items-center justify-center'}
                key={`mastercard-${node.id}`}
              >
                {paymentProviders.includes('mastercard') ? (
                  <>
                    <CheckCircle
                      className={'text-green500'}
                      aria-hidden="true"
                    />
                    <span className="sr-only">Ja</span>
                  </>
                ) : (
                  <>
                    <XCircle className={'text-red600'} aria-hidden="true" />
                    <span className="sr-only">Nej</span>
                  </>
                )}
              </div>
            )
          })}
        </div>
        <div className={rowClasses.replace('border-b', '')}>
          <div className={'flex items-center'}>
            <span>Zimpler</span>
          </div>
          {casinosToCompare.map(({ node }) => {
            const paymentProviders =
              node.postType.paymentprovidersNew.edges.map(
                ({ node }) => node.slug
              )
            return (
              <div
                className={'flex items-center justify-center'}
                key={`zimpler-${node.id}`}
              >
                {paymentProviders.includes('zimpler') ? (
                  <>
                    <CheckCircle className={'text-green500'} />
                    <span className="sr-only">Ja</span>
                  </>
                ) : (
                  <>
                    <XCircle className={'text-red600'} />
                    <span className="sr-only">Nej</span>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CasinoComparisonModal
