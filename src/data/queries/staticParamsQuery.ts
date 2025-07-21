export const staticParamsQuery = ({
  type,
}: {
  type: 'pages' | 'casino-pages' | 'guide-pages' | 'news-pages'
}) => `
    *[_type == ${type}] {
      slug {
        current
      }
    }
`
