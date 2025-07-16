export const staticParamsQuery = ({
  type,
}: {
  type: 'pages' | 'casino-pages' | 'guide-pages'
}) => `
    *[_type == ${type}] {
      slug {
        current
      }
    }
`
