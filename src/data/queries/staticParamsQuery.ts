export const staticParamsQuery = ({
  type,
}: {
  type:
    | 'pages'
    | 'casino-pages'
    | 'guide-pages'
    | 'news-pages'
    | 'authors'
    | 'slot-pages'
    | 'aff-links'
}) => `
    *[_type == "${type}" && (!defined(publishedAt) || publishedAt <= now()) && !(_id match "drafts.*")] {
      slug {
        current
      }
    }
`
