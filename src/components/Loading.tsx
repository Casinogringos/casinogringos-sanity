export default function Loading({ color }) {
  const spinnerColor = color ? color : 'text-blue-400'

  return (
    <div className="py-16 lg:pb-96 flex justify-center">
      <div
        className={`inline-block lg:h-10 lg:w-10 h-8 w-8 animate-spin rounded-full border-4 border-solid ${spinnerColor} border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      ></div>
    </div>
  )
}
