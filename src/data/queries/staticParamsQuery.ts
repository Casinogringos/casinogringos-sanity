export const staticParamsQuery = ({
  type,
}: {
  type: 'pages' | 'casino-pages'
}) => `
    *[_type == ${type}] {
      slug {
        current
      }
    }
`
