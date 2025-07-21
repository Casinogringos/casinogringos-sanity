export const staticParamsQuery = ({
  type,
}: {
  type: 'pages' | 'casino-pages' | 'guide-pages' | 'news-pages' | 'authors'
}) => `
    *[_type == ${type}] {
      slug {
        current
      }
    }
`
