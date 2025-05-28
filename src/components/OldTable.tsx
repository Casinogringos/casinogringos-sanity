export default function OldTable({ item }) {
  return (
    <div className="pt-0">
      <div className="px-0">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            {/* <h1 className="text-base font-semibold leading-6 text-white">
              Fakta:{' '}
            </h1> */}
            {/* <p className="mt-2 text-sm text-gray-300">
              A list of all the users in your account including their name, title, email and role.
            </p> */}
          </div>
        </div>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full pt-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full">
                <tbody className="divide-y divide-slate700">
                  {item?.speltillverkare?.name && (
                    <tr>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        Speltillverkare:
                      </td>
                      <td className="whitespace-nowrap py-2 px-3 text-sm text-gray300">
                        {item?.speltillverkare?.name}
                      </td>
                    </tr>
                  )}
                  {item?.lanseringsar && (
                    <tr>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        Lanserades:
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray300">
                        {item?.lanseringsar}
                      </td>
                    </tr>
                  )}
                  {/* {item?.speltillverkare.name &&
                    <tr>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        Speltillverkare:
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray300">
                        {item?.speltillverkare.name}
                      </td>
                    </tr>
                  } */}
                  {item?.minstaInsats && (
                    <tr>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        Minsta insats:
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray300">
                        {item?.minstaInsats} kr
                      </td>
                    </tr>
                  )}
                  {item?.hogstaInsats && (
                    <tr>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                        Högsta insats:
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray300">
                        {item?.hogstaInsats} kr
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
