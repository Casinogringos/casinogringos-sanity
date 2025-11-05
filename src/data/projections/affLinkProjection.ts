import { imageProjection } from '@/src/data/projections/imageProjection'

export const affLinkProjection = `
  _type,
  _id,
  title,
  slug {
    current
  },
  link,
  "referencedBy": [
    ...*[_type == "casinos" && affLink._ref == ^._id]{
      _id,
      _type,
      title,
      slug {
        current
      },
      logo {
        ${imageProjection}
      }
    },
    ...*[_type == "casino-bonuses" && affLink._ref == ^._id]{
        _id,
        _type,
        title,
        slug {
          current
        },
        logo {
          ${imageProjection}
        }
      },
      _id,
      _type,
      name,
      slug {
        current
      }
    }
  ]
`
