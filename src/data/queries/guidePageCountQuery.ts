export const guidePageCountQuery = () => `
    count(*[_type == 'guide-pages' && (!defined(publishedAt) || publishedAt <= now()) && !(_id match "drafts.*")])
`
