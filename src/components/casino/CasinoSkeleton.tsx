// Placeholder or Skeleton components could be simple divs with styling
const SkeletonBox = ({ className }: { className: string }) => (
  <div className={`bg-gray200 animate-pulse ${className}`}></div>
)

export default function CasinoSkeleton() {
  return (
    <div className="rounded-t-md border-b border-b-gray100 bg-white p-3.5 shadow-2xl">
      <div className="flex flex-col gap-x-8 gap-y-2">
        <div>
          <div
            className="relative h-28 flex-col items-center overflow-hidden rounded-md p-4"
            style={{ background: '#e0e0e0' }} // Gray placeholder background
          >
            <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-br-md bg-slate200/20 text-sm font-medium text-slate100">
              <SkeletonBox className="h-full w-full" />
            </span>
            <div className="flex h-14 w-full items-center justify-center">
              <SkeletonBox className="h-16 w-32 rounded-md" />
            </div>
            <div className="my-2 flex w-full items-center justify-center text-xs text-slate300">
              <SkeletonBox className="absolute right-2 top-2 h-5 w-5 rounded-full" />
              <div className="mt-1 flex w-full items-center justify-between">
                <SkeletonBox className="mt-0.5 h-3 w-24" />
                <div className="flex gap-1 rounded-full">
                  {[...Array(5)].map((_, index) => (
                    <SkeletonBox key={index} className="h-4 w-4 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 block text-sm font-bold uppercase text-black">
            <div className="grid grid-cols-2 gap-2">
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className="flex min-h-[84px] flex-col items-center justify-center rounded-md bg-gray200 p-2 text-lg leading-6"
                >
                  <SkeletonBox className="mb-1 h-4 w-full" />
                  <SkeletonBox className="h-4 w-16" />
                  <SkeletonBox className="mt-0.5 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-md border border-slate100 bg-slate50 p-2.5">
          {[...Array(3)].map((_, index) => (
            <div className="mb-1 flex items-center gap-2" key={index}>
              <SkeletonBox className="h-4 w-4 rounded-full" />
              <SkeletonBox className="h-4 w-full" />
            </div>
          ))}
        </div>
        <div className="mt-2 flex flex-col-reverse items-center justify-center gap-2">
          <SkeletonBox className="h-12 w-full rounded-md bg-button text-white" />
        </div>
      </div>
      <div className="rounded-b-md bg-white px-2 py-3 text-center text-xs3 text-gray400 shadow-2xl">
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="mt-2 h-4 w-full" />
      </div>
    </div>
  )
}
