import { useState } from 'react'

export default function TabComponent({ props }) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="w-full mt-8">
      <div className="flex">
        <button
          className={`flex-1 py-2 ${activeTab === 0 ? 'bg-slate200 font-semibold rounded-t-md' : ''}`}
          onClick={() => setActiveTab(0)}
        >
          Casinodetaljer
        </button>
        <button
          className={`flex-1 py-2 ${activeTab === 1 ? 'bg-slate200 font-semibold rounded-t-md' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Kundtjänst
        </button>
        <button
          className={`flex-1 py-2 ${activeTab === 2 ? 'bg-slate200 font-semibold rounded-t-md' : ''}`}
          onClick={() => setActiveTab(2)}
        >
          Bonuserbjudande
        </button>
      </div>
      <div className="p-6 bg-slate200 rounded-b-md">
        <div className={`${activeTab === 0 ? 'block' : 'hidden'}`}>
          <table className="min-w-full divide-y divide-gray300">
            <tbody className="divide-y divide-gray200">
              {' '}
              <tr className="even:bg-gray-50 odd:bg-white">
                <td>Lanserades: {props.postType?.lanseradesDatum}</td>
              </tr>
              <tr>
                <td>Lanserades: {props.postType?.lanseradesDatum}</td>
              </tr>
              <tr>
                <td>Lanserades: {props.postType?.lanseradesDatum}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="text-xl mb-3 mt-6 font-bold">Spelkategorier</h2>
          <div>
            {' '}
            {props.postType?.brandCategories?.length > 0 && (
              <>
                <div className={'mb-2 flex items-center flex-wrap'}>
                  {props.postType.brandCategories.map((brandCategory, i) => (
                    <div key={`brand-category-${i}`}>
                      <span
                        className={
                          'text-sm rounded-md bg-gray200 px-3 py-1 mr-1 mb-1'
                        }
                      >
                        {brandCategory}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className={`${activeTab === 1 ? 'block' : 'hidden'}`}>
          <h2 className="text-xl mb-3 mt-6  font-bold">Kundtjänst</h2>
          <p>
            {props.postType.brandEmail && (
              <>
                <ul className={'mb-3'}>
                  {props.postType.brandEmail && (
                    <li className={'flex items-center mb-1 justify-between'}>
                      <span className={'font-medium'}>Epost:</span>
                      <span className={'text-gray500'}>
                        {props.postType.brandEmail}
                      </span>
                    </li>
                  )}
                  {props.postType.kundtjanstTelefon && (
                    <li className={'flex items-center mb-1 justify-between'}>
                      <span className={'font-medium'}>Telefon:</span>
                      <span className={'text-gray500'}>
                        {props.postType.kundtjanstTelefon}
                      </span>
                    </li>
                  )}
                  {props.postType.brandSupportHours && (
                    <li className={'flex items-center mb-1 justify-between'}>
                      <span className={'font-medium'}>
                        Live chatt öppettider:
                      </span>
                      <span className={'text-gray500'}>
                        {props.postType.brandSupportHours}
                      </span>
                    </li>
                  )}
                </ul>
              </>
            )}
          </p>
        </div>
        <div className={`${activeTab === 2 ? 'block' : 'hidden'}`}>
          <h4 className="font-bold text-lg">Content for Tab 3</h4>
          <p>This is the content for Tab 3.</p>
        </div>
      </div>
    </div>
  )
}
