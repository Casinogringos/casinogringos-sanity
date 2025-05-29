import { ChevronLeft, ChevronRight } from 'lucide-react'
import Container from '../atoms/Container'
import InternalLink from '../../sin-bin/InternalLink'

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
            <InternalLink
              className={
                'flex items-center bg-gray200 rounded-md pl-2 pr-5 py-2 hover:bg-gray400 hover:text-white'
              }
              label="Gå till föregående sida"
              replace
              prefetch={false}
              href={`/${pathPrefix}${
                currentPage !== 2 ? `/page/${currentPage - 1}` : ''
              }`}
            >
              <ChevronLeft />
              <span>Föregående</span>
            </InternalLink>
          )}
        </div>
        <div className={'hidden items-center justify-center lg:flex'}>
          {Array.from({ length: numPages }, (_, i) => (
            <InternalLink
              className={`bg-gray200 mx-2 px-3 py-1 rounded-md hover:bg-gray400 hover:text-white ${
                currentPage === i + 1 ? 'bg-gray400 text-white' : ''
              }`}
              current={currentPage === i + 1 ? 'page' : undefined}
              label={`Sida ${i + 1}`}
              replace
              href={`/${pathPrefix}${i !== 0 ? `/page/${i + 1}` : ''}`}
              key={`pagination-number${i + 1}`}
              prefetch={false}
            >
              {i + 1}
            </InternalLink>
          ))}
        </div>
        <div className={'flex justify-end'}>
          {numPages > currentPage && (
            <InternalLink
              className={
                'flex items-center bg-gray200 rounded-md pr-2 pl-5 py-2 hover:bg-gray400 hover:text-white'
              }
              label="Gå till nästa sida"
              replace
              prefetch={false}
              href={`/${pathPrefix}/page/${currentPage + 1}`}
            >
              <span>Nästa</span>
              <ChevronRight />
            </InternalLink>
          )}
        </div>
      </nav>
    </Container>
  )
}

export default Pagination
