import { ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '@/src/components/atoms/Container'
import Link from '@/src/components/atoms/Link'

const Pagination = ({
  currentPage,
  numPages,
  pathPrefix,
  className = '',
}: {
  currentPage: number
  numPages: number
  pathPrefix: string
  className?: string
}) => {
  return (
    <Container>
      <nav
        role="navigation"
        aria-label="pagination"
        className={`grid grid-cols-2 lg:grid-cols-3 my-8 ${className}`}
      >
        <h2 id="pagination" className="sr-only">
          Pagination
        </h2>
        <div className={'flex justify-start'}>
          {currentPage > 1 && (
            <Link
              className={
                'flex items-center bg-gray-200 rounded-md pl-2 pr-5 py-2 hover:bg-gray-400 hover:text-white'
              }
              label="Gå till föregående sida"
              replace
              prefetch={false}
              href={`/${pathPrefix}${currentPage !== 1 ? `/page/${currentPage - 1}` : ''}`}
            >
              <ChevronLeft />
              <span>Föregående</span>
            </Link>
          )}
        </div>
        <div className={'hidden items-center justify-center lg:flex'}>
          {Array.from({ length: numPages }, (_, i) => (
            <Link
              className={`bg-gray-200 mx-2 px-3 py-1 rounded-md hover:bg-gray-400 hover:text-white ${currentPage === i + 1 ? 'bg-gray-400 text-white' : ''
                }`}
              current={currentPage === i ? 'page' : undefined}
              label={`Sida ${i}`}
              replace
              disabled={currentPage === i}
              href={`/${pathPrefix}${i !== 0 ? `/page/${i + 1}` : ''}`}
              key={`pagination-number${i}`}
              prefetch={false}
            >
              {i + 1}
            </Link>
          ))}
        </div>
        <div className={'flex justify-end'}>
          {numPages > currentPage && (
            <Link
              className={
                'flex items-center bg-gray-200 rounded-md pr-2 pl-5 py-2 hover:bg-gray-400 hover:text-white'
              }
              label="Gå till nästa sida"
              replace
              disabled={currentPage === numPages}
              prefetch={false}
              href={`/${pathPrefix}/page/${currentPage + 1}`}
            >
              <span>Nästa</span>
              <ChevronRight />
            </Link>
          )}
        </div>
      </nav>
    </Container>
  )
}

export default Pagination
